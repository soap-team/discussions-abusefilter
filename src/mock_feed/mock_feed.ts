import { ActivityApiController } from 'fandom-api';
import type { ApiInterface } from 'fandom-api';
import type { Speaker } from 'messenger';
import { createSpeaker } from 'messenger';
import type { MessengerAction, MessengerEvent, MessengerPlatform, MessengerPostType } from '../shared/messenger';
import type { SocialActivityAction } from 'fandom-api/dist/controllers/activity_api/activity_api_controller';

const FEED_TIMEOUT_MS = 5 * 1000;

const ContentTypeToPlatform: Record<SocialActivityAction['contentType'], MessengerPlatform> = {
  'comment': 'article-comment',
  'comment-reply': 'article-comment',
  'message': 'message-wall',
  'message-reply': 'message-wall',
  'post': 'discussion',
  'post-reply': 'discussion',
};

const ContentTypeToPostType: Record<SocialActivityAction['contentType'], MessengerPostType> = {
  'comment': 'thread',
  'comment-reply': 'reply',
  'message': 'thread',
  'message-reply': 'reply',
  'post': 'thread',
  'post-reply': 'reply',
};

const ActionToMessengerAction: Record<SocialActivityAction['actionType'], MessengerAction> = {
  'create': 'created',
  'delete': 'deleted',
  'undelete': 'un-deleted',
  'update': 'modified',
  'lock': 'modified',
};

// Generates events using the ActivityApi (Special:SocialActivity).
export class MockFeed {
  readonly lastUpdateTime: Record<string, Date> = {}; // map of wiki to last updated
  readonly activityApi: ActivityApiController;
  readonly speaker: Speaker;
  readonly usernamePattern = /<a href.*?title="Special:Contributions\/(.*?)">.*?<\/a>/;
  readonly snippetPattern = /<em>(.*?)<\/em>/;
  readonly titlePattern = /(action-post__post|parent__message-reply)">(.*?)<\/a>/;
  readonly linkPattern = /\(<a href="([^"]+?)"[^>]+?>view<\/a>/;

  constructor(readonly wikis: string[], readonly api: ApiInterface, port: number) {
    wikis.forEach(wiki => {
      this.lastUpdateTime[wiki] = new Date();
    });
    this.activityApi = new ActivityApiController(api);
    this.speaker = createSpeaker(port);
    return this;
  }

  start(): void {
    setInterval(() => {
      this.wikis.forEach(async (wiki) => {
        const activity = await this.activityApi.getSocialActivity({
          wiki,
          lastUpdateTime: this.lastUpdateTime[wiki],
        });
        if (Array.isArray(activity)) {
          const newActions = activity.flatMap(activity => activity.actions);
          newActions.forEach(action => {
            // unsupported actions
            if (action.actionType === 'lock') return;
            const usernameMatch = action.label.match(this.usernamePattern);
            const snippetMatch = action.label.match(this.snippetPattern);
            const titleMatch = action.label.match(this.titlePattern);
            const linkMatch = action.label.match(this.linkPattern);

            this.speaker.shout<MessengerEvent>('find:raw', {
              wiki,
              platform: ContentTypeToPlatform[action.contentType],
              postType: ContentTypeToPostType[action.contentType],
              action: ActionToMessengerAction[action.actionType],
              url: linkMatch ? `https://${wiki}${linkMatch[1].replace('&amp;', '&')}` : '',
              title: action.actionType.startsWith('article') || action.actionType.endsWith('reply') ? '' : (titleMatch ? titleMatch[2] : ''),
              userName: usernameMatch ? usernameMatch[1] : '',
              snippet: snippetMatch ? snippetMatch[1] : '',
              category: '',
              size: snippetMatch ? snippetMatch[1].length.toString() : '0',
            });
          });
          this.lastUpdateTime[wiki] = new Date();
        }
      });
    }, FEED_TIMEOUT_MS);
  }
}
