/* eslint-disable no-console */
import type { FilterData } from './filter_handler';
import { FilterHandler } from './filter_handler';
import * as config from '../../config/config.json';
import * as prodData from '../../config/data.json';
import * as devData from '../../config/data.dev.json';
import { MockFeed } from '../mock_feed/mock_feed';
import { createListener } from 'messenger';
import type { Controllers } from './context_handler';
import { ContextHandler } from './context_handler';
import { ApiInterface, ArticleCommentsController, DiscussionPostController, DiscussionThreadController, MessageWallController } from 'fandom-api';
import { ActionHandler } from './action_handler';

const data = (config.flags.isDev ? devData : prodData) as FilterData;

const startListener = (port: number) => {
  const listener = createListener(port);

  listener.onError((e) => {
    console.error('An error occurred:', e);
  });

  listener.on('close', () => {
    console.log('Connection closed');
  });

  return listener;
};

const api = new ApiInterface({
  ua: config.ua,
  accessToken: config.accessToken,
});

const controllers: Controllers = {
  thread: new DiscussionThreadController(api),
  post: new DiscussionPostController(api),
  article: new ArticleCommentsController(api),
  wall: new MessageWallController(api),
};

const handler = new FilterHandler(
  data,
  startListener(config.ports.discussion),
  new ContextHandler(api, controllers),
  new ActionHandler(controllers),
);

handler.start();

if (config.flags.useSocialActivity) {
  const wikis = Array.from(new Set(Object.values(data.info).flatMap(m => m.wikis)));
  new MockFeed(wikis, api, config.ports.discussion).start();
}
