import { $applyNodeReplacement, TextNode } from 'lexical';
import type { SerializedTextNode, Spread } from 'lexical';

export type SerializedStyledTextNode = Spread<
  {
    inlineStyle?: string;
  },
  SerializedTextNode
>;

export class StyledTextNode extends TextNode {
  __inlineStyle?: string;

  constructor(text: string, inlineStyle?: string, key?: string) {
    super(text, key);
    this.__inlineStyle = inlineStyle;
  }

  static getType(): string {
    return 'styled-text';
  }

  static clone(node: StyledTextNode): StyledTextNode {
    return new StyledTextNode(node.__text, node.__inlineStyle, node.__key);
  }

  createDOM(config: any): HTMLElement {
    const element = super.createDOM(config);
    if (this.__inlineStyle) {
      element.setAttribute('style', this.__inlineStyle);
    }
    return element;
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: any): boolean {
    const prevStyledNode = prevNode as StyledTextNode;
    const hasStyleChanged = prevStyledNode.__inlineStyle !== this.__inlineStyle;
    
    if (hasStyleChanged) {
      if (this.__inlineStyle) {
        dom.setAttribute('style', this.__inlineStyle);
      } else {
        dom.removeAttribute('style');
      }
    }
    
    // Return true if anything changed (let base class handle text updates via createDOM)
    return super.updateDOM(prevNode as this, dom, config) || hasStyleChanged;
  }

  static importJSON(serializedNode: SerializedStyledTextNode): StyledTextNode {
    const node = $createStyledTextNode(serializedNode.text, serializedNode.inlineStyle);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    if (serializedNode.inlineStyle) {
      node.setInlineStyle(serializedNode.inlineStyle);
    }
    return node;
  }

  exportJSON(): SerializedStyledTextNode {
    return {
      ...super.exportJSON(),
      inlineStyle: this.__inlineStyle,
      type: 'styled-text',
      version: 1,
    };
  }

  setInlineStyle(inlineStyle?: string): this {
    const writable = this.getWritable();
    (writable as StyledTextNode).__inlineStyle = inlineStyle;
    return writable;
  }

  getInlineStyle(): string | undefined {
    const self = this.getLatest();
    return (self as StyledTextNode).__inlineStyle;
  }
}

export function $createStyledTextNode(text: string, style?: string): StyledTextNode {
  return $applyNodeReplacement(new StyledTextNode(text, style));
}

export function $isStyledTextNode(node: any): node is StyledTextNode {
  return node instanceof StyledTextNode;
}

