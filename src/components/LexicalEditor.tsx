import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';

interface LexicalEditorProps {
  htmlContent: string;
  onEditorStateChange: (json: string) => void;
}

// Plugin to update editor content when HTML changes
function HtmlImportPlugin({ htmlContent, onEditorStateChange }: LexicalEditorProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!htmlContent) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        onEditorStateChange(JSON.stringify(editor.getEditorState().toJSON(), null, 2));
      });
      return;
    }

    editor.update(() => {
      try {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlContent, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        
        const root = $getRoot();
        root.clear();
        $insertNodes(nodes);
        
        onEditorStateChange(JSON.stringify(editor.getEditorState().toJSON(), null, 2));
      } catch (error) {
        console.error('Error parsing HTML:', error);
        onEditorStateChange(JSON.stringify({ error: String(error) }, null, 2));
      }
    });
  }, [htmlContent, editor, onEditorStateChange]);

  // Listen to editor state changes
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onEditorStateChange(JSON.stringify(editorState.toJSON(), null, 2));
    });
  }, [editor, onEditorStateChange]);

  return null;
}

export function LexicalEditor({ htmlContent, onEditorStateChange }: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'HTMLToLexicalDemo',
    theme: {
      paragraph: 'mb-2',
      heading: {
        h1: 'text-4xl font-bold mb-4',
        h2: 'text-3xl font-bold mb-3',
        h3: 'text-2xl font-bold mb-2',
        h4: 'text-xl font-bold mb-2',
        h5: 'text-lg font-bold mb-2',
        h6: 'text-base font-bold mb-2',
      },
      list: {
        ul: 'list-disc list-inside mb-2',
        ol: 'list-decimal list-inside mb-2',
        nested: {
          listitem: 'ml-4'
        }
      },
      link: 'text-blue-600 underline hover:text-blue-800',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-gray-200 px-1 rounded font-mono text-sm',
      },
      code: 'bg-gray-800 text-white p-4 rounded font-mono text-sm block my-2',
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      AutoLinkNode,
      TableNode,
      TableCellNode,
      TableRowNode,
    ],
    onError: (error: Error) => {
      console.error(error);
    },
    editable: false,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[400px] p-4 focus:outline-none" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              输入 HTML 后将在此处显示渲染结果...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <HtmlImportPlugin htmlContent={htmlContent} onEditorStateChange={onEditorStateChange} />
      </div>
    </LexicalComposer>
  );
}

