import type { Action } from './actions';

export type FilterMetadata = {
  // Number that identifies the filter.
  id: string,
  // Short title of the filter
  title: string,
  // Long description of the filter.
  description: string,
  // List of domains in the form wiki.fandom.com
  wikis: string[],
  // Fandom username for the user who last edited the filter
  editedBy: string,
};

export type Filter = {
  // Number that identifies the filter.
  id: string,
  // List of triggers, which cause the filter to trigger.
  triggers: Trigger[],
  // JSON or JavaScript string that represents the filter.
  filter: string,
  // List of actions to take if the filter returns true.
  actions: Action[],
};

export type TriggerAction = 'create' | 'modify' | 'create-modify' | 'delete' | 'move' | 'report';
export type TriggerPlatform = 'article-comment' | 'discussion' | 'message-wall' | 'any' | 'report';
export type TriggerPostType = 'thread' | 'reply' | 'any';

export type Trigger = {
  // The action to trigger on. For 'report', the platform must be 'report' and
  // postType should be 'any'
  action: TriggerAction,
  // The platform to trigger on
  platform: TriggerPlatform,
  // The type of post to trigger on
  postType: TriggerPostType,
  // Domain in the form wiki.fandom.com
  wiki: string,
};
