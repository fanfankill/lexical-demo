interface HTMLInputProps {
  value: string;
  onChange: (value: string) => void;
  onLoadExample: (html: string) => void;
  examples: Array<{ label: string; html: string }>;
}

export function HTMLInput({ value, onChange, onLoadExample, examples }: HTMLInputProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label
          className="block text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--cyber-cyan)', fontFamily: "'Share Tech Mono', monospace" }}
        >
          {'> HTML 输入_'}
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onLoadExample(example.html)}
              className="px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 border hover:scale-105"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--cyber-cyan)',
                borderColor: 'var(--cyber-cyan)',
                fontFamily: "'Share Tech Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--cyber-cyan)';
                e.currentTarget.style.color = 'var(--cyber-bg)';
                e.currentTarget.style.boxShadow = '0 0 10px var(--cyber-cyan), 0 0 20px rgba(0, 240, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--cyber-cyan)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {example.label}
            </button>
          ))}
          <button
            onClick={() => onChange('')}
            className="px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 border hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--cyber-magenta)',
              borderColor: 'var(--cyber-magenta)',
              fontFamily: "'Share Tech Mono', monospace",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--cyber-magenta)';
              e.currentTarget.style.color = 'var(--cyber-bg)';
              e.currentTarget.style.boxShadow = '0 0 10px var(--cyber-magenta), 0 0 20px rgba(255, 45, 111, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--cyber-magenta)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {'[ 清空 ]'}
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-4 rounded-lg text-sm resize-none transition-all duration-300 outline-none"
        style={{
          backgroundColor: 'var(--cyber-bg)',
          color: 'var(--cyber-success)',
          border: '1px solid var(--cyber-border)',
          fontFamily: "'Share Tech Mono', monospace",
          caretColor: 'var(--cyber-cyan)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--cyber-cyan)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.05)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--cyber-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        placeholder="// 在此输入 HTML 代码..."
      />
    </div>
  );
}

