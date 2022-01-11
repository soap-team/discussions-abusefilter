// All actions a filter can take
export type RuleAction =
  | LogAction
  | DeleteAction
  | LockAction
  | ReplyAction;

// Logs to Discord
type LogAction = {
  action: 'log',
  webhook: string,
  content: string,
};

// Deletes a thread or reply
type DeleteAction = {
  action: 'delete',
};

// Locks a thread
type LockAction = {
  action: 'lock'
};

// Replies to a thread
type ReplyAction = {
  action: 'reply',
  message: string,
};
