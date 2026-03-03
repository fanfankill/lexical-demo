import { useState } from 'react';

interface JSONDisplayProps {
  json: string;
}

export function JSONDisplay({ json }: JSONDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <label
          className="block text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'var(--cyber-magenta)', fontFamily: "'Share Tech Mono', monospace" }}
        >
          {'> JSON 中间态_'}
        </label>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 border"
          style={{
            backgroundColor: copied ? 'var(--cyber-success)' : 'transparent',
            color: copied ? 'var(--cyber-bg)' : 'var(--cyber-success)',
            borderColor: 'var(--cyber-success)',
            fontFamily: "'Share Tech Mono', monospace",
            boxShadow: copied ? '0 0 10px var(--cyber-success)' : 'none',
          }}
        >
          {copied ? '[ COPIED ]' : '[ 复制 ]'}
        </button>
      </div>
      <pre
        className="flex-1 w-full p-4 rounded-lg text-xs overflow-auto"
        style={{
          backgroundColor: 'var(--cyber-bg)',
          color: 'var(--cyber-yellow)',
          border: '1px solid var(--cyber-border)',
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        {json || '// 等待 HTML 输入...'}
      </pre>
    </div>
  );
}

