/**
 * The event data retrieved from fandom-irc-messenger.
 * @see https://github.com/kcnotes/fandom-irc-messenger/blob/main/src/discussion.ts
 */

export type MessengerEvent = {
  wiki: string,
  platform: MessengerPlatform,
  postType: MessengerPostType,
  action: MessengerAction,
  url: string,
  title: string,
  userName: string,
  snippet: string,
  category: string,
  size: string,
};

export type MessengerPlatform =
  | 'article-comment'
  | 'message-wall'
  | 'discussion'
  | 'report';

export type MessengerPostType = 'thread' | 'reply' | 'report';
export type MessengerAction = 'created' | 'modified' | 'moved' | 'deleted' | 'un-deleted';
