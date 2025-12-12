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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML 输入
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onLoadExample(example.html)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {example.label}
            </button>
          ))}
          <button
            onClick={() => onChange('')}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="在此输入 HTML 代码..."
      />
    </div>
  );
}

