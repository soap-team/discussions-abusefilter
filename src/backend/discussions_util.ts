import type { ContentNode } from 'fandom-api/dist/controllers/discussion_types/json_model';

export class DiscussionUtil {
  static convertLinkToAbsolute(link: string, wiki: string): string {
    if (link.startsWith('/')) {
      link = `https://${wiki}${link}`;
    }
    return link;
  }

  // Recursively retrieves a list of links from any node with content.
  //  Links only appear in text and opengraph nodes
  static getLinks(doc: ContentNode, wiki: string): string[] {
    let links: string[] = [];

    if (doc && doc.content && doc.content.length > 0) {
      doc.content.forEach(node => {
        switch (node.type) {
          case 'openGraph':
            links.push(node.attrs.url);
            break;
          case 'text':
            if (node.marks) {
              node.marks.forEach(mark => {
                if (mark.type !== 'link') {
                  return;
                }
                if (mark.attrs && mark.attrs.href) {
                  links.push(mark.attrs.href);
                }
              });
            }
            break;
          case 'paragraph':
          case 'bulletList':
          case 'orderedList':
          case 'listItem':
          case 'code_block':
            if (node.content) {
              links = links.concat(this.getLinks(node, wiki));
            }
        }
      });
    }
    return links.map(link => this.convertLinkToAbsolute(link, wiki));
  }

  static getTextContent(node: ContentNode): string {
    const text = node.content?.map((subNode) => {
      switch (subNode.type) {
        case 'paragraph':
          if (subNode.content) {
            return `${this.getTextContent(subNode)}\n`;
          }
          return '';
        case 'bulletList':
        case 'orderedList':
        case 'listItem':
        case 'code_block':
          return `${this.getTextContent(subNode)}\n`;
        case 'text':
          return `${subNode.text}`;
      }
    });
    return text?.join('').replace(/\n$/g, '') || '';
  }
}

