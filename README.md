# Lexical HTML 转换测试工具

这是一个基于 React + TypeScript + Lexical 的项目，用于测试和展示 Lexical 富文本编辑器对 HTML 的解析和转换能力。

## 功能特性

- 📝 **HTML 输入**: 支持手动输入或粘贴 HTML 代码
- 🔄 **JSON 中间态展示**: 查看 Lexical EditorState 的 JSON 结构
- 🎨 **实时渲染**: 展示 Lexical 编辑器的最终渲染效果
- ✨ **预设示例**: 提供多种常见 HTML 结构的测试用例
- 📱 **响应式设计**: 支持桌面和移动设备

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Lexical** - 富文本编辑器
- **Tailwind CSS** - 样式框架

## Lexical 支持的 HTML 元素

- ✅ 标题 (h1-h6)
- ✅ 段落 (p)
- ✅ 文本格式 (粗体、斜体、下划线、删除线)
- ✅ 列表 (有序列表、无序列表、嵌套列表)
- ✅ 链接 (a)
- ✅ 代码块 (pre, code)
- ✅ 引用块 (blockquote)
- ✅ 表格 (table, thead, tbody, tr, th, td)
- ✅ 图片 (img)
- ✅ 内联代码 (code)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 使用方法

1. 在左侧的 "HTML 输入" 面板中输入 HTML 代码
2. 或点击预设示例按钮快速加载测试用例
3. 查看中间的 "JSON 中间态" 面板了解 Lexical 的内部结构
4. 查看右侧的 "渲染结果" 面板验证最终效果

## 项目结构

```
lexical-demo/
├── src/
│   ├── components/
│   │   ├── LexicalEditor.tsx    # Lexical 编辑器组件
│   │   ├── HTMLInput.tsx        # HTML 输入组件
│   │   └── JSONDisplay.tsx      # JSON 展示组件
│   ├── utils/
│   │   └── htmlExamples.ts      # HTML 测试用例
│   ├── App.tsx                  # 主应用组件
│   ├── main.tsx                 # 应用入口
│   └── index.css                # 全局样式
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 核心实现

### HTML 到 Lexical 转换

使用 `@lexical/html` 包的 `$generateNodesFromDOM()` API 将 HTML DOM 转换为 Lexical 节点：

```typescript
const parser = new DOMParser();
const dom = parser.parseFromString(htmlContent, 'text/html');
const nodes = $generateNodesFromDOM(editor, dom);
$insertNodes(nodes);
```

### EditorState JSON 导出

使用 `editorState.toJSON()` 获取编辑器状态的 JSON 表示：

```typescript
const json = JSON.stringify(editor.getEditorState().toJSON(), null, 2);
```

## License

MIT
