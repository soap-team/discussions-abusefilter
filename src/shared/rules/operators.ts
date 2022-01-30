export type StringOperator =
  | 'isOneOf'
  | 'isNotOneOf'
  | 'startsWith'
  | 'contains'
  | 'matchesRegex';

export type StringArrayOperator =
  | 'exactlyMatches'
  | 'containsAll'
  | 'containsAny'
  | 'containsNone';

export type SelectOperator =
  | 'isOneOf'
  | 'isNotOneOf';

export type DateOperator =
  | 'isBefore'
  | 'isAfter'
  | 'isWithin'
  | 'isNotWithin';

export type NumberOperator =
  | 'isGreaterThan'
  | 'isLessThan'
  | 'isGreaterThanEqual'
  | 'isLessThanEqual'
  | 'isEqual'
  | 'isNotEqual';

export type BooleanOperator =
  | 'isEqual';

export type Operator =
  | StringOperator
  | StringArrayOperator
  | SelectOperator
  | DateOperator
  | NumberOperator
  | BooleanOperator;
