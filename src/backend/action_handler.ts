import type { MessengerEvent } from '../shared/messenger';
import type { Action } from '../shared/actions';
import type { Context, Controllers } from './context_handler';
import type { DocNode } from 'fandom-api/dist/controllers/discussion_types/json_model';
import { DiscussionUtil } from './discussions_util';
import type { EmbeddedPost } from 'fandom-api/dist/controllers/discussion_types/post';
import { fetch } from 'cross-fetch';

const getStringJsonModel = (message: string): DocNode => ({
  'type': 'doc',
  'content': [{
    'type': 'paragraph',
    'content': [{
      'type': 'text',
      'text': message,
    }],
  }],
});

export class ActionHandler {
  constructor(readonly controllers: Controllers) {
  }

  private warnUnsupportedType(action: string, event: MessengerEvent) {
    console.warn(`Action '${action}' performed on unknown event ${event.platform}, ${event.postType}, ${event.url}`);
  }

  async delete(event: MessengerEvent, id?: string): Promise<unknown> {
    if (!id) {
      return;
    }
    switch (event.platform) {
      case 'discussion': {
        switch (event.postType) {
          case 'reply': return this.controllers.post.delete({
            wiki: event.wiki,
            postId: id,
          });
          case 'thread': return this.controllers.thread.delete({
            wiki: event.wiki,
            threadId: id,
          });
        }
      }
    }
    this.warnUnsupportedType('delete', event);
  }

  async lock(event: MessengerEvent, id?: string): Promise<unknown> {
    if (!id) {
      return;
    }
    switch (event.platform) {
      case 'discussion': {
        switch (event.postType) {
          case 'thread': return this.controllers.thread.lock({
            wiki: event.wiki,
            threadId: id,
          });
        }
      }
    }
    this.warnUnsupportedType('lock', event);
  }

  async reply(event: MessengerEvent, context: Context | null, message: string): Promise<unknown> {
    if (!context) {
      return;
    }
    const jsonModel = getStringJsonModel(message);
    const body = DiscussionUtil.getTextContent(jsonModel);
    const defaultParams = {
      wiki: event.wiki,
      jsonModel,
      body,
      attachments: {
        contentImages: [],
        openGraphs: [],
        atMentions: [],
      },
    };
    switch (event.platform) {
      case 'discussion': {
        switch (event.postType) {
          case 'thread': return this.controllers.post.create({
            ...defaultParams,
            threadId: context.post.id,
            siteId: context.post.siteId,
            source: 'DISCUSSIONS',
          });
          case 'reply': return this.controllers.post.create({
            ...defaultParams,
            threadId: (context.post as EmbeddedPost).threadId,
            siteId: context.post.siteId,
            source: 'DISCUSSIONS',
          });
        }
      }
    }
    this.warnUnsupportedType('reply', event);
  }

  async logDiscord(event: MessengerEvent, webhook: string, content: string): Promise<unknown> {
    const DISCORD_REGEX = /discord(app)?.com\/api\/webhooks\/([^/]+)\/([^/]+)$/i;
    const res = webhook.match(DISCORD_REGEX);

    let modifiedContent = content;
    if (!res || res.length !== 4) return;

    for (const [key, value] of Object.entries(event)) {
      if (key === 'userName') {
        modifiedContent = modifiedContent.replace(new RegExp(`\\$${key}`, 'g'), value.replace(/ /g, '_'));
      } else {
        modifiedContent = modifiedContent.replace(new RegExp(`\\$${key}`, 'g'), value);
      }
    }

    return await fetch(webhook, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        content: modifiedContent,
        allowed_mentions: {
          parse: ['users', 'roles'],
        },
      }),
    });
  }

  async performAction(action: Action, context: Context | null, event: MessengerEvent): Promise<unknown> {
    switch (action.type) {
      case 'delete': return this.delete(event, context?.post.id);
      case 'lock': return this.lock(event, context?.post.id);
      case 'reply': return this.reply(event, context, action.message);
      case 'log': return this.logDiscord(event, action.webhook, action.content);
      default: this.warnUnsupportedType(action.type, event);
    }
  }
}
