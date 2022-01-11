export type Action =
  | LogAction
  | DeleteAction
  | LockAction
  | ReplyAction
  | MoveAction;

type LogAction = {
  type: 'log',
  webhook: string,
  content: string,
};

type DeleteAction = {
  type: 'delete',
};

type LockAction = {
  type: 'lock'
};

type ReplyAction = {
  type: 'reply',
  message: string,
};

type MoveAction = {
  type: 'move',
  category: string,
};
