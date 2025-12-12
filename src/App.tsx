import { useState } from 'react';
import { HTMLInput } from './components/HTMLInput';
import { JSONDisplay } from './components/JSONDisplay';
import { LexicalEditor } from './components/LexicalEditor';
import { htmlExamples } from './utils/htmlExamples';

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [jsonContent, setJsonContent] = useState('');

  const handleLoadExample = (html: string) => {
    setHtmlContent(html);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Lexical HTML 转换测试工具
        </h1>
        <p className="text-center text-gray-600 mb-8">
          输入 HTML 代码，查看 Lexical 的解析结果和渲染效果
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - HTML Input */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <HTMLInput
              value={htmlContent}
              onChange={setHtmlContent}
              onLoadExample={handleLoadExample}
              examples={htmlExamples}
            />
          </div>

          {/* Middle Panel - JSON Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <JSONDisplay json={jsonContent} />
          </div>

          {/* Right Panel - Lexical Render */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                渲染结果
              </label>
            </div>
            <div className="border border-gray-300 rounded-lg min-h-[400px] bg-white">
              <LexicalEditor
                htmlContent={htmlContent}
                onEditorStateChange={setJsonContent}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">使用说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">📝 HTML 输入面板（左侧）</h3>
              <p className="text-sm">
                在文本框中输入或粘贴 HTML 代码，或点击示例按钮快速加载预设的 HTML 测试用例。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔄 JSON 中间态（中间）</h3>
              <p className="text-sm">
                显示 Lexical 编辑器的内部状态（EditorState）的 JSON 表示，展示了 HTML 是如何被解析成 Lexical 节点树的。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎨 渲染结果（右侧）</h3>
              <p className="text-sm">
                展示 Lexical 编辑器最终渲染的视觉效果，验证 HTML 转换的正确性和支持程度。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✨ 功能特性</h3>
              <p className="text-sm">
                支持标题、列表、链接、表格、代码块、引用等多种 HTML 元素，可以测试 Lexical 对不同 HTML 结构的支持能力。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
