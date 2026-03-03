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
    <div className="min-h-screen py-8 cyber-grid-bg" style={{ backgroundColor: 'var(--cyber-bg)' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-10 text-center relative">
          <div className="inline-block relative">
            <h1
              className="text-4xl md:text-5xl font-bold tracking-wider uppercase text-neon"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {'Lexical HTML '}
              <span className="text-neon-magenta">{'转换工具'}</span>
            </h1>
            <div
              className="mt-1 h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, var(--cyber-cyan), var(--cyber-magenta), transparent)' }}
            />
          </div>
          <p className="mt-3 text-sm tracking-widest uppercase" style={{ color: 'var(--cyber-text-dim)', fontFamily: "'Share Tech Mono', monospace" }}>
            {'// 输入 HTML 代码 >> 查看 Lexical 解析结果与渲染效果'}
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - HTML Input */}
          <div className="cyber-panel rounded-lg p-6 cyber-corner">
            <HTMLInput
              value={htmlContent}
              onChange={setHtmlContent}
              onLoadExample={handleLoadExample}
              examples={htmlExamples}
            />
          </div>

          {/* Middle Panel - JSON Display */}
          <div className="cyber-panel rounded-lg p-6 cyber-corner">
            <JSONDisplay json={jsonContent} />
          </div>

          {/* Right Panel - Lexical Render */}
          <div className="cyber-panel rounded-lg p-6 cyber-corner">
            <div className="mb-4">
              <label
                className="block text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--cyber-yellow)', fontFamily: "'Share Tech Mono', monospace" }}
              >
                {'> 渲染结果_'}
              </label>
            </div>
            <div
              className="rounded-lg min-h-[400px]"
              style={{
                border: '1px solid var(--cyber-border)',
                backgroundColor: 'var(--cyber-bg-secondary)',
              }}
            >
              <LexicalEditor
                htmlContent={htmlContent}
                onEditorStateChange={setJsonContent}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 cyber-panel rounded-lg p-6 cyber-corner">
          <h2
            className="text-2xl font-bold mb-6 tracking-wider uppercase"
            style={{ color: 'var(--cyber-cyan)', fontFamily: "'Orbitron', sans-serif" }}
          >
            {'[ 使用说明 ]'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ color: 'var(--cyber-text)' }}>
            <InfoCard
              icon="01"
              title="HTML 输入面板"
              color="var(--cyber-cyan)"
              description="在文本框中输入或粘贴 HTML 代码，或点击示例按钮快速加载预设的 HTML 测试用例。"
            />
            <InfoCard
              icon="02"
              title="JSON 中间态"
              color="var(--cyber-magenta)"
              description="显示 Lexical 编辑器的内部状态（EditorState）的 JSON 表示，展示 HTML 如何被解析成 Lexical 节点树。"
            />
            <InfoCard
              icon="03"
              title="渲染结果"
              color="var(--cyber-yellow)"
              description="展示 Lexical 编辑器最终渲染的视觉效果，验证 HTML 转换的正确性和支持程度。"
            />
            <InfoCard
              icon="04"
              title="功能特性"
              color="var(--cyber-success)"
              description="支持标题、列表、链接、表格、代码块、引用等多种 HTML 元素，可以测试 Lexical 对不同 HTML 结构的支持能力。"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center pb-4">
          <p className="text-xs tracking-widest" style={{ color: 'var(--cyber-text-dim)', fontFamily: "'Share Tech Mono', monospace" }}>
            {'/// SYSTEM.ONLINE /// LEXICAL_DEMO_v2.0 /// STATUS: OPERATIONAL ///'}
          </p>
        </footer>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, color, description }: { icon: string; title: string; color: string; description: string }) {
  return (
    <div
      className="p-4 rounded-md transition-all duration-300 hover:translate-x-1"
      style={{
        backgroundColor: 'var(--cyber-bg)',
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded"
          style={{
            backgroundColor: color,
            color: 'var(--cyber-bg)',
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          {icon}
        </span>
        <h3
          className="font-semibold text-sm tracking-wider uppercase"
          style={{ color, fontFamily: "'Orbitron', sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cyber-text-dim)' }}>
        {description}
      </p>
    </div>
  );
}

export default App;
