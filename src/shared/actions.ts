export type RuleAction =
  | LogAction
  | DeleteAction
  | LockAction
  | ReplyAction;

type LogAction = {
  action: 'log',
  webhook: string,
  content: string,
};
type DeleteAction = {
  action: 'delete',
};
type LockAction = {
  action: 'lock'
};

type ReplyAction = {
  action: 'reply',
  message: string,
};
