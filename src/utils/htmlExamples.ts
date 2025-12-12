export const htmlExamples = [
  {
    label: '基础格式',
    html: `<p>这是一段<strong>粗体</strong>文本，还有<em>斜体</em>和<u>下划线</u>。</p>
<p>这是<code>行内代码</code>的示例。</p>`
  },
  {
    label: '标题',
    html: `<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
<p>这是一个普通段落。</p>`
  },
  {
    label: '无序列表',
    html: `<ul>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项
    <ul>
      <li>嵌套项 1</li>
      <li>嵌套项 2</li>
    </ul>
  </li>
  <li>第四项</li>
</ul>`
  },
  {
    label: '有序列表',
    html: `<ol>
  <li>步骤一</li>
  <li>步骤二</li>
  <li>步骤三
    <ol>
      <li>子步骤 3.1</li>
      <li>子步骤 3.2</li>
    </ol>
  </li>
  <li>步骤四</li>
</ol>`
  },
  {
    label: '链接',
    html: `<p>访问 <a href="https://www.google.com">Google</a> 了解更多信息。</p>
<p>这是一个 <a href="https://github.com" target="_blank">GitHub 链接</a>。</p>`
  },
  {
    label: '引用块',
    html: `<blockquote>
  <p>这是一段引用文字。</p>
  <p>引用可以包含多个段落。</p>
</blockquote>
<p>引用结束后的正常文字。</p>`
  },
  {
    label: '代码块',
    html: `<pre><code>function hello() {
  console.log("Hello, World!");
  return true;
}</code></pre>
<p>代码块后的普通文本。</p>`
  },
  {
    label: '表格',
    html: `<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>城市</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>25</td>
      <td>北京</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>30</td>
      <td>上海</td>
    </tr>
    <tr>
      <td>王五</td>
      <td>28</td>
      <td>深圳</td>
    </tr>
  </tbody>
</table>`
  },
  {
    label: '混合内容',
    html: `<h2>产品介绍</h2>
<p>这是一个<strong>全新的产品</strong>，具有以下特点：</p>
<ul>
  <li>高性能处理</li>
  <li>用户友好界面</li>
  <li>云端同步功能</li>
</ul>
<h3>技术规格</h3>
<table>
  <tr>
    <td>处理器</td>
    <td>8核 CPU</td>
  </tr>
  <tr>
    <td>内存</td>
    <td>16GB RAM</td>
  </tr>
</table>
<p>了解更多请访问 <a href="https://example.com">官方网站</a>。</p>
<blockquote>
  <p>"这是市场上最好的产品之一。" - 技术评测</p>
</blockquote>`
  },
  {
    label: '复杂嵌套',
    html: `<div>
  <h1>文档标题</h1>
  <p>段落包含<strong>粗体<em>和斜体</em>组合</strong>的文字。</p>
  <ol>
    <li>
      <strong>重要项目</strong>
      <ul>
        <li>子项带有 <a href="#">链接</a></li>
        <li>另一个子项</li>
      </ul>
    </li>
    <li>
      普通项目
      <blockquote>
        <p>嵌套的引用块</p>
      </blockquote>
    </li>
  </ol>
  <pre><code>const x = 10;
console.log(x);</code></pre>
</div>`
  },
  {
    label: '图片',
    html: `<p>这是一张图片：</p>
<img src="https://via.placeholder.com/300x200" alt="示例图片" />
<p>图片后的文字。</p>`
  },
  {
    label: 'Div和Span',
    html: `<div>
  <p>这是一个 <span style="color: red;">带颜色</span> 的文本。</p>
  <div>
    <p>嵌套的 div 中的段落。</p>
  </div>
</div>`
  }
];

