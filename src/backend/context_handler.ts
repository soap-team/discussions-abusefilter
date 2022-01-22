import type { MessengerPlatform, MessengerPostType } from '../shared/messenger';
import type { DiscussionThreadController, DiscussionPostController, ArticleCommentsController, MessageWallController, ApiInterface } from 'fandom-api';
import type { ForumThreadResponse } from 'fandom-api/dist/controllers/discussion_types/thread';
import type { EmbeddedPost } from 'fandom-api/dist/controllers/discussion_types/post';

export type Controllers = {
  thread: DiscussionThreadController,
  post: DiscussionPostController,
  article: ArticleCommentsController,
  wall: MessageWallController,
};

export type QueryUserResponse = {
  query: {
    users: UserContext[],
  }
};

// Context can be undefined if URL is really dodgy
export type Context = {
  post: ForumThreadResponse | EmbeddedPost,
  user: UserContext | undefined,
} | undefined;

export type UserContext = {
  userid: number,
  name: string,
  editcount: number,
  registration: string | null,
  groups: string[],
  groupmemberships: { group: string, expiry: string }[],
  implicitgroups: string[],
  emailable: string,
} | {
  name: string,
  missing: string,
};

export class ContextHandler {
  constructor(private readonly apiInterface: ApiInterface, private readonly controllers: Controllers) {
  }

  async getDiscussionsContext({ wiki, postType, url }: {
    wiki: string,
    postType: MessengerPostType,
    url: string,
  }): Promise<ForumThreadResponse | EmbeddedPost> {
    const components = url.split(/[/=#]/g);
    const id = components[components.length - 1];

    switch (postType) {
      case 'thread': {
        return this.controllers.thread.getThread({
          wiki,
          threadId: id,
          viewableOnly: false,
        });
      }
      case 'reply': {
        return this.controllers.post.getPost({
          wiki,
          postId: id,
          viewableOnly: false,
        });
      }
      case 'report': {
        if (url.includes('/r/')) {
          return this.controllers.post.getPost({
            wiki,
            postId: id,
            viewableOnly: false,
          });
        } else {
          return this.controllers.thread.getThread({
            wiki,
            threadId: id,
            viewableOnly: false,
          });
        }
      }
    }
  }

  async getUserContext(wiki: string, username: string | null): Promise<UserContext | undefined> {
    if (!username) {
      return;
    }
    const params = {
      action: 'query',
      list: 'users',
      ususers: username,
      usprop: [
        'blockinfo',
        'groups',
        'groupmemberships',
        'implicitgroups',
        'editcount',
        'registration',
        'emailable',
      ].join('|'),
      format: 'json',
    };

    const data = await this.apiInterface.mwGet<QueryUserResponse>(wiki, params);
    const userData = data.query.users[0];
    if ('missing' in userData) {
      return;
    }
    return {
      ...userData,
      registration: userData.registration === null && userData.userid < 30000 ? '2006-06-01T00:00:00Z' : userData.registration,
    };
  }

  async getPostContext({ wiki, platform, postType, url }: {
    wiki: string,
    platform: MessengerPlatform,
    postType: MessengerPostType,
    url: string,
  }): Promise<ForumThreadResponse | EmbeddedPost | undefined> {
    switch (platform) {
      case 'discussion': return this.getDiscussionsContext({ wiki, postType, url });
    }
    console.warn(`Unsupported platform ${platform}`);
  }

  async getContext({ wiki, platform, postType, url }: {
    wiki: string,
    platform: MessengerPlatform,
    postType: MessengerPostType,
    url: string,
  }): Promise<Context> {
    const post = await this.getPostContext({ wiki, platform, postType, url });
    if (!post) {
      console.log('Could not find post', url);
      return undefined;
    }
    // User is lastEditedBy if edited by a non-user
    const user = post.lastEditedBy ?
      await this.getUserContext(wiki, post.lastEditedBy.name) :
      await this.getUserContext(wiki, post.createdBy.name);

    return {
      post,
      user,
    };
  }
}
