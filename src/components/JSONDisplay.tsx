interface JSONDisplayProps {
  json: string;
}

export function JSONDisplay({ json }: JSONDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          JSON 中间态
        </label>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          复制 JSON
        </button>
      </div>
      <pre className="flex-1 w-full p-4 border border-gray-300 rounded-lg font-mono text-sm overflow-auto bg-gray-50">
        {json || '等待 HTML 输入...'}
      </pre>
    </div>
  );
}

