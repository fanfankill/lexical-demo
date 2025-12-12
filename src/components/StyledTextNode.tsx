import { $applyNodeReplacement, TextNode, SerializedTextNode, Spread } from 'lexical';

export type SerializedStyledTextNode = Spread<
  {
    style?: string;
  },
  SerializedTextNode
>;

export class StyledTextNode extends TextNode {
  __style?: string;

  constructor(text: string, style?: string, key?: string) {
    super(text, key);
    this.__style = style;
  }

  static getType(): string {
    return 'styled-text';
  }

  static clone(node: StyledTextNode): StyledTextNode {
    return new StyledTextNode(node.__text, node.__style, node.__key);
  }

  createDOM(config: any): HTMLElement {
    const element = super.createDOM(config);
    if (this.__style) {
      const span = document.createElement('span');
      span.setAttribute('style', this.__style);
      span.textContent = this.__text;
      return span;
    }
    return element;
  }

  updateDOM(prevNode: StyledTextNode, dom: HTMLElement, config: any): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__style !== this.__style) {
      if (this.__style) {
        dom.setAttribute('style', this.__style);
      } else {
        dom.removeAttribute('style');
      }
    }
    return isUpdated;
  }

  static importJSON(serializedNode: SerializedStyledTextNode): StyledTextNode {
    const node = $createStyledTextNode(serializedNode.text, serializedNode.style);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedStyledTextNode {
    return {
      ...super.exportJSON(),
      style: this.__style,
      type: 'styled-text',
      version: 1,
    };
  }

  setStyle(style?: string): void {
    const writable = this.getWritable();
    writable.__style = style;
  }

  getStyle(): string | undefined {
    return this.__style;
  }
}

export function $createStyledTextNode(text: string, style?: string): StyledTextNode {
  return $applyNodeReplacement(new StyledTextNode(text, style));
}

export function $isStyledTextNode(node: any): node is StyledTextNode {
  return node instanceof StyledTextNode;
}

