import { DiscussionUtil } from '../discussions_util';
import type { JsonModel } from 'fandom-api/dist/controllers/discussion_types/json_model';
import { ApiInterface } from 'fandom-api';

describe('DiscussionsUtil', () => {
  let util: DiscussionUtil;

  beforeEach(() => {
    const api = new ApiInterface({});
    util = new DiscussionUtil(api);
  });

  it('gets links from a JSON model - openGraph and marks', () => {
    const model: JsonModel = {
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{
          type: 'text',
          text: 'Hello',
          marks: [{
            type: 'link',
            attrs: {
              href: 'https://google.com',
              title: 'Google',
            },
          }],
        }],
      }, {
        type: 'openGraph',
        attrs: {
          id: 0,
          url: 'https://fandom.com',
          wasAddedWithInlineLink: false,
        },
      }],
    };

    expect(util.getLinks(model, 'community.fandom.com')).toEqual(['https://google.com', 'https://fandom.com']);
  });
});
