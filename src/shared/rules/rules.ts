import type { BooleanAttribute, DateAttribute, NumberAttribute, SelectAttribute, StringArrayAttribute, StringAttribute } from './attributes';
import type { BooleanOperator, DateOperator, NumberOperator, SelectOperator, StringArrayOperator, StringOperator } from './operators';

export type Rules = {
  ruleGroups: RuleGroup[],
  catchAll: boolean,
};

export type RuleGroup = {
  type: 'and' | 'or',
  rules: Rule[],
  then: boolean,
};

export type StringRule = {
  attr: StringAttribute,
  operator: StringOperator,
  value: string[],
};
export type StringArrayRule = {
  attr: StringArrayAttribute,
  operator: StringArrayOperator,
  value: string[],
};
export type SelectRule = {
  attr: SelectAttribute,
  operator: SelectOperator,
  value: string[],
};
export type DateRule = {
  attr: DateAttribute,
  operator: DateOperator,
  value: number,
};
export type NumberRule = {
  attr: NumberAttribute,
  operator: NumberOperator,
  value: number,
};
export type BooleanRule = {
  attr: BooleanAttribute,
  operator: BooleanOperator,
  value: boolean,
};

export type Rule =
  | StringRule
  | StringArrayRule
  | SelectRule
  | DateRule
  | NumberRule
  | BooleanRule;

export const testRules: Rules = {
  ruleGroups: [{
    type: 'and',
    rules: [
      { attr: 'text', operator: 'isOneOf', value: ['hello'] },
    ],
    then: true,
  }],
  catchAll: false,
};
