import { DiscussionUtil } from '../discussions_util';
import type { JsonModel } from 'fandom-api/dist/controllers/discussion_types/json_model';
import { ApiInterface } from 'fandom-api';

describe('DiscussionsUtil', () => {
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

    expect(DiscussionUtil.getLinks(model, 'community.fandom.com')).toEqual(['https://google.com', 'https://fandom.com']);
  });

  it('parses local links', () => {
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
              href: '/wiki/Test',
              title: 'Test',
            },
          }],
        }],
      }],
    };

    expect(DiscussionUtil.getLinks(model, 'community.fandom.com')).toEqual(['https://community.fandom.com/wiki/Test']);
  });

  it('looks for links in lists', () => {
    const model: JsonModel = {
      type: 'doc',
      content: [{
        type: 'bulletList',
        content: [{
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'Hello',
              marks: [{
                type: 'link',
                attrs: {
                  href: '/wiki/Test',
                  title: 'Test',
                },
              }],
            }],
          }],
        }],
        attrs: {
          createdWith: null,
        },
      }],
    };

    expect(DiscussionUtil.getLinks(model, 'community.fandom.com')).toEqual(['https://community.fandom.com/wiki/Test']);
  });

  it('gets the text content from a JSON model', () => {
    const model: JsonModel = {
      'type': 'doc',
      'content': [
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'This is sample text.',
            },
          ],
        },
        {
          'type': 'paragraph',
        },
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'This contains ',
            },
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'strong',
                },
              ],
              'text': 'bolded ',
            },
            {
              'type': 'text',
              'text': 'and ',
            },
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'strong',
                },
              ],
              'text': 'bolded and ',
            },
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'em',
                },
                {
                  'type': 'strong',
                },
              ],
              'text': 'italicized and even ',
            },
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'link',
                  'attrs': {
                    'href': 'https://google.com',
                    'title': null,
                  },
                },
                {
                  'type': 'em',
                },
                {
                  'type': 'strong',
                },
              ],
              'text': 'with a link',
            },
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'em',
                },
                {
                  'type': 'strong',
                },
              ],
              'text': '.',
            },
          ],
        },
        {
          'type': 'openGraph',
          'attrs': {
            'id': 0,
            'url': 'https://google.com',
            'wasAddedWithInlineLink': true,
          },
        },
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'There\'s an OpenGraph ^ there ',
            },
          ],
        },
        {
          'type': 'paragraph',
        },
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'A separate link: ',
            },
          ],
        },
        {
          'type': 'paragraph',
        },
        {
          'type': 'openGraph',
          'attrs': {
            'id': 1,
            'url': 'https://google.com.au',
            'wasAddedWithInlineLink': false,
          },
        },
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'Image: ',
            },
          ],
        },
        {
          'type': 'image',
          'attrs': {
            'id': 0,
          },
        },
        {
          'type': 'bulletList',
          'attrs': {
            'createdWith': null,
          },
          'content': [
            {
              'type': 'listItem',
              'content': [
                {
                  'type': 'paragraph',
                  'content': [
                    {
                      'type': 'text',
                      'text': 'Bullet ',
                    },
                    {
                      'type': 'text',
                      'marks': [
                        {
                          'type': 'em',
                        },
                        {
                          'type': 'strong',
                        },
                      ],
                      'text': 'with ',
                    },
                    {
                      'type': 'text',
                      'marks': [
                        {
                          'type': 'strong',
                        },
                      ],
                      'text': 'bold',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          'type': 'paragraph',
        },
        {
          'type': 'orderedList',
          'attrs': {
            'createdWith': null,
          },
          'content': [
            {
              'type': 'listItem',
              'content': [
                {
                  'type': 'paragraph',
                  'content': [
                    {
                      'type': 'text',
                      'text': 'Number',
                    },
                  ],
                },
              ],
            },
            {
              'type': 'listItem',
              'content': [
                {
                  'type': 'paragraph',
                  'content': [
                    {
                      'type': 'text',
                      'text': 'Number 2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          'type': 'code_block',
          'content': [
            {
              'type': 'text',
              'text': 'Text',
            },
          ],
        },
        {
          'type': 'paragraph',
        },
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'marks': [
                {
                  'type': 'mention',
                  'attrs': {
                    'href': null,
                    'userId': '5811199',
                    'userName': 'Noreplyz',
                  },
                },
              ],
              'text': '@Noreplyz',
            },
            {
              'type': 'text',
              'text': ' hello text',
            },
          ],
        },
      ],
    };

    expect(DiscussionUtil.getTextContent(model)).toEqual('This is sample text.\nThis contains bolded and bolded and italicized and even with a link.\nThere\'s an OpenGraph ^ there \nA separate link: \nImage: \nBullet with bold\nNumber\nNumber 2\nText\n@Noreplyz hello text');
  });
});
