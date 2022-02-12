/**
 * Naming: post attributes have no prefix
 * user attributes prefixed with 'user'
 */
export type StringAttribute =
  | 'text'
  | 'title'
  | 'forumName'
  | 'userName';

export type StringArrayAttribute =
  | 'links'
  | 'userGroups'
  | 'mentions'
  | 'imageHashes';

export type SelectAttribute =
  | 'type';

export type DateAttribute =
  | 'creationDate'
  | 'userRegistrationDate';

export type NumberAttribute =
  | 'position';

export type BooleanAttribute =
  | 'hasImages'
  | 'hasMentions';

export type Attribute =
  | StringAttribute
  | StringArrayAttribute
  | SelectAttribute
  | DateAttribute
  | NumberAttribute
  | BooleanAttribute;

export const SelectAttributeOptions: Record<SelectAttribute, string[]> = {
  type: ['TEXT', 'POLL'],
};

export type AttributeType = 'string' | 'stringArray' | 'select' | 'date' | 'number' | 'boolean';
