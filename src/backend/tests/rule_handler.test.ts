import { RuleHandler } from '../rule_handler';
import type { StringRule, StringArrayRule } from '../../shared/rules/rules';

describe('RuleHandler', () => {
  describe('RuleHandler#parseStringRule', () => {
    it('isOneOf check', () => {
      const rule: StringRule = { attr: 'text', operator: 'isOneOf', value: ['a', 'b'] };
      expect(RuleHandler.parseStringRule(rule, 'test')).toEqual(false);
      expect(RuleHandler.parseStringRule(rule, 'a')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'b')).toEqual(true);
    });

    it('isNotOneOf check', () => {
      const rule: StringRule = { attr: 'text', operator: 'isNotOneOf', value: ['a', 'b'] };
      expect(RuleHandler.parseStringRule(rule, 'test')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'a')).toEqual(false);
      expect(RuleHandler.parseStringRule(rule, 'b')).toEqual(false);
    });

    it('startsWith check', () => {
      const rule: StringRule = { attr: 'text', operator: 'startsWith', value: ['a', 'b'] };
      expect(RuleHandler.parseStringRule(rule, 'test')).toEqual(false);
      expect(RuleHandler.parseStringRule(rule, 'a')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'b')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'bark')).toEqual(true);
    });

    it('contains check', () => {
      const rule: StringRule = { attr: 'text', operator: 'contains', value: ['a', 'b'] };
      expect(RuleHandler.parseStringRule(rule, 'test')).toEqual(false);
      expect(RuleHandler.parseStringRule(rule, 'a')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'b')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'bark')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'car')).toEqual(true);
    });

    it('matchesRegex check', () => {
      const rule: StringRule = { attr: 'text', operator: 'matchesRegex', value: ['[A-Z]{2}', 'hello+'] };
      expect(RuleHandler.parseStringRule(rule, 'test')).toEqual(false);
      expect(RuleHandler.parseStringRule(rule, 'AB')).toEqual(true);
      expect(RuleHandler.parseStringRule(rule, 'hellooo')).toEqual(true);
    });
  });

  describe('RuleHandler#parseStringArrayRule', () => {
    it('exactlyMatches check', () => {
      const rule: StringArrayRule = { attr: 'links', operator: 'exactlyMatches', value: ['a', 'b'] };
      expect(RuleHandler.parseStringArrayRule(rule, [])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['b'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b', 'b'])).toEqual(false);
    });

    it('containsAll check', () => {
      const rule: StringArrayRule = { attr: 'links', operator: 'containsAll', value: ['a', 'b'] };
      expect(RuleHandler.parseStringArrayRule(rule, [])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['b'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b', 'b'])).toEqual(true);
    });

    it('containsAny check', () => {
      const rule: StringArrayRule = { attr: 'links', operator: 'containsAny', value: ['a', 'b'] };
      expect(RuleHandler.parseStringArrayRule(rule, [])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['c'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['b'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b', 'b'])).toEqual(true);
    });

    it('containsNone check', () => {
      const rule: StringArrayRule = { attr: 'links', operator: 'containsNone', value: ['a', 'b'] };
      expect(RuleHandler.parseStringArrayRule(rule, [])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['c'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['c', 'd'])).toEqual(true);
      expect(RuleHandler.parseStringArrayRule(rule, ['a'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['b'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'c'])).toEqual(false);
      expect(RuleHandler.parseStringArrayRule(rule, ['a', 'b', 'b'])).toEqual(false);
    });
  });
});
