// All actions a filter can take
export type Action =
  | LogAction
  | DeleteAction
  | LockAction
  | ReplyAction
  | MoveAction;

// Logs to Discord
type LogAction = {
  type: 'log',
  webhook: string,
  content: string,
};

// Deletes a thread or reply
type DeleteAction = {
  type: 'delete',
};

// Locks a thread
type LockAction = {
  type: 'lock'
};

// Replies to a thread
type ReplyAction = {
  type: 'reply',
  message: string,
};

type MoveAction = {
  type: 'move',
  category: string,
};
