# 内联样式支持说明

## 问题描述

Lexical 编辑器默认在转换 HTML 时**不会保留内联样式**（如 `style="color: red;"`），因为它是一个结构化的富文本编辑器，而不是完整的 HTML 渲染器。

例如，以下 HTML：
```html
<div>
  <p>这是一个 <span style="color: red;">带颜色</span> 的文本。</p>
</div>
```

在默认情况下，`color: red` 样式会被丢弃。

## 解决方案

我们实现了一个自定义的文本节点类型 `StyledTextNode` 来支持内联样式的保留和渲染。

### 实现细节

#### 1. 创建 StyledTextNode (src/components/StyledTextNode.tsx)

这是一个扩展 Lexical 的 `TextNode` 的自定义节点：

- **存储样式**：使用 `__style` 属性存储原始的 style 字符串
- **渲染样式**：在 `createDOM()` 和 `updateDOM()` 方法中将样式应用到 DOM 元素
- **序列化支持**：支持 JSON 导入导出，保留样式信息

```typescript
export class StyledTextNode extends TextNode {
  __style?: string;

  createDOM(config: any): HTMLElement {
    const element = super.createDOM(config);
    if (this.__style) {
      const span = document.createElement('span');
      span.setAttribute('style', this.__style);
      span.textContent = this.__text;
      return span;
    }
    return element;
  }
}
```

#### 2. 自定义 HTML 解析器 (parseHTMLWithStyles)

在 `LexicalEditor.tsx` 中，我们实现了一个自定义的 HTML 解析函数：

1. **首先使用标准解析器**：调用 `$generateNodesFromDOM()` 生成基础的 Lexical 节点树
2. **遍历 DOM 树**：同时遍历原始 DOM 和生成的 Lexical 节点树
3. **提取样式**：从 DOM 元素中提取 `style` 属性
4. **替换节点**：将普通的 `TextNode` 替换为带样式的 `StyledTextNode`

```typescript
function parseHTMLWithStyles(htmlString: string, editor: LexicalEditorType): LexicalNode[] {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlString, 'text/html');
  const nodes = $generateNodesFromDOM(editor, dom);
  
  function walkDOM(domNode: Node, lexicalNode: LexicalNode): void {
    if (domNode.nodeType === Node.ELEMENT_NODE) {
      const element = domNode as HTMLElement;
      const style = element.getAttribute('style');
      
      if (style && $isTextNode(lexicalNode)) {
        const styledNode = $createStyledTextNode(lexicalNode.getTextContent(), style);
        styledNode.setFormat(lexicalNode.getFormat());
        lexicalNode.replace(styledNode);
      }
      // ... 递归处理子节点
    }
  }
  
  // 并行遍历 DOM 树和 Lexical 树
  bodyChildren.forEach((domChild, index) => {
    if (nodes[index]) {
      walkDOM(domChild, nodes[index]);
    }
  });
  
  return nodes;
}
```

#### 3. 注册自定义节点

在 Lexical 配置中注册 `StyledTextNode`：

```typescript
nodes: [
  // ... 其他节点
  StyledTextNode,
  {
    replace: TextNode,
    with: (node: TextNode) => {
      return new StyledTextNode(node.__text);
    }
  }
]
```

## 支持的样式

现在可以正确识别和渲染所有 CSS 内联样式，包括但不限于：

- ✅ `color` - 文本颜色
- ✅ `background-color` - 背景颜色
- ✅ `font-size` - 字体大小
- ✅ `font-weight` - 字体粗细
- ✅ `font-family` - 字体系列
- ✅ `text-decoration` - 文本装饰
- ✅ 任何其他有效的 CSS 属性

## 测试示例

试试这些 HTML 示例：

### 示例 1：颜色文本
```html
<p>这是一个 <span style="color: red;">红色</span> 的文本。</p>
```

### 示例 2：多种样式组合
```html
<p>
  <span style="color: blue; font-size: 20px; font-weight: bold;">
    蓝色粗体大号文字
  </span>
</p>
```

### 示例 3：背景色
```html
<p>
  这段文本有
  <span style="background-color: yellow; padding: 2px 4px;">黄色高亮</span>
  效果。
</p>
```

### 示例 4：复杂嵌套
```html
<div>
  <p>
    外层文本
    <span style="color: red;">
      红色部分
      <strong style="font-size: 18px;">粗体大号</strong>
    </span>
    正常文本
  </p>
</div>
```

## 使用方法

1. 打开浏览器访问 http://localhost:5174/
2. 在左侧 HTML 输入框中粘贴包含内联样式的 HTML
3. 查看右侧渲染结果 - 样式现在应该正确显示
4. 查看中间的 JSON 面板 - 可以看到样式信息被保存在节点中

## 注意事项

1. **样式作用域**：内联样式会应用到带有 `style` 属性的元素的文本内容上
2. **嵌套处理**：支持多层嵌套的 HTML 结构
3. **性能**：对于大量样式的文档，可能会有轻微的性能影响
4. **兼容性**：所有标准的 CSS 属性都应该能正常工作

## 技术限制

虽然现在可以保留和渲染内联样式，但需要注意：

1. Lexical 仍然是一个结构化编辑器，不是完整的 HTML/CSS 渲染引擎
2. 复杂的 CSS 选择器和伪类不被支持
3. JavaScript 相关的样式操作不会被执行
4. 某些特殊的 CSS 属性可能在不同浏览器中表现不一致

## 下一步改进

可以考虑的增强功能：

- [ ] 支持 CSS 类名（class 属性）
- [ ] 支持数据属性（data-* 属性）
- [ ] 提供样式预设和快捷方式
- [ ] 添加样式编辑界面
- [ ] 支持样式的继承和覆盖规则

