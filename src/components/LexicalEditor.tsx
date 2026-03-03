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
      paragraph: 'editor-paragraph',
      heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        h6: 'editor-heading-h6',
      },
      list: {
        ul: 'editor-list-ul',
        ol: 'editor-list-ol',
        nested: {
          listitem: 'editor-nested-listitem'
        }
      },
      link: 'editor-link',
      text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        code: 'editor-text-code',
      },
      code: 'editor-code',
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
            <ContentEditable
              className="outline-none min-h-[400px] p-4 focus:outline-none"
              style={{ color: 'var(--cyber-text)' }}
            />
          }
          placeholder={
            <div
              className="absolute top-4 left-4 pointer-events-none text-sm"
              style={{ color: 'var(--cyber-text-dim)', fontFamily: "'Share Tech Mono', monospace" }}
            >
              {'// 输入 HTML 后将在此处显示渲染结果...'}
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

