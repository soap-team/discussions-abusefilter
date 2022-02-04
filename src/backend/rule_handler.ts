import type { Filter } from '../shared/filters';
import type { Context } from './context_handler';
import type { Rules, StringRule, StringArrayRule, DateRule } from '../shared/rules/rules';
import { DiscussionUtil } from './discussions_util';
import type { ContentNode } from 'fandom-api/dist/controllers/discussion_types/json_model';
import type { ForumThreadResponse } from 'fandom-api/dist/controllers/discussion_types/thread';

export class RuleHandler {
  filter: Filter;
  context: Context;

  constructor(filter: Filter, context: Context) {
    this.filter = filter;
    this.context = context;
  }

  checkUIFilter(): boolean {
    if (!this.context) return false;
    const { user, post } = this.context;
    if (!user || !post || !post.jsonModel) return false;

    // Check if the filter is a UI filter
    let res = this.filter.filter.startsWith('{') && this.filter.filter.endsWith('}');

    if (res) {
      res = this.parseUIFilter();
    }

    return res;
  }

  parseUIFilter(): boolean {
    const filterObject: Rules = JSON.parse(this.filter.filter);
    if (!this.context) return false;
    const { user, post } = this.context;
    const contentNode: ContentNode = JSON.parse(post.jsonModel!);
    filterObject.ruleGroups.forEach(ruleGroup => {
      if (ruleGroup.type === 'and') {
        let match = true;
        ruleGroup.rules.forEach(rule => {
          switch (rule.attr) {
            // StringAttribute
            case 'text':
              match &&= this.parseStringRule(rule, DiscussionUtil.getTextContent(contentNode));
              break;
            case 'title':
              match &&= this.parseStringRule(rule, post.title);
              break;
            case 'forumName':
              match &&= this.parseStringRule(rule, (post as ForumThreadResponse).forumName);
              break;
            case 'userName':
              if (user !== undefined) {
                match &&= this.parseStringRule(rule, user.name);
              }
              break;
            // StringArrayAttribute
            case 'links':
              break;
            case 'userGroups':
              if (user !== undefined) {
                match &&= this.parseStringArrayRule(rule, user.groups);
              }
              break;
            case 'mentions':
              break;
            case 'imageHashes':
              break;
            // SelectAttribute
            // case 'type':
            //   break;
            // DateAttribute
            case 'creationDate':
              match &&= this.parseDateRule(rule, post.creationDate.epochSecond);
              break;
            case 'userRegistrationDate':
              // if (user !== undefined) {
              //   match &&= this.parseDateRule(rule, user.registration);
              // }
              break;
            // NumberAttribute
            case 'position':
              break;
            // BooleanAttribute
            case 'hasImages':
              break;
            case 'hasMentions':
              break;
          }
        });
        if (match) return match;
      } else {
        let match = false;
        ruleGroup.rules.forEach(rule => {
          switch (rule.attr) {
            // StringAttribute
            case 'text':
              match ||= this.parseStringRule(rule, DiscussionUtil.getTextContent(contentNode));
              break;
            case 'title':
              match ||= this.parseStringRule(rule, post.title);
              break;
            case 'forumName':
              match ||= this.parseStringRule(rule, (post as ForumThreadResponse).forumName);
              break;
            case 'userName':
              if (user !== undefined) {
                match ||= this.parseStringRule(rule, user.name);
              }
              break;
            // StringArrayAttribute
            case 'links':
              break;
            case 'userGroups':
              if (user !== undefined) {
                match ||= this.parseStringArrayRule(rule, user.groups);
              }
              break;
            case 'mentions':
              break;
            case 'imageHashes':
              break;
            // SelectAttribute
            // case 'type':
            //   break;
            // DateAttribute
            case 'creationDate':
              break;
            case 'userRegistrationDate':
              break;
            // NumberAttribute
            case 'position':
              break;
            // BooleanAttribute
            case 'hasImages':
              break;
            case 'hasMentions':
              break;
          }
        });
        if (match) return match;
      }
    });
    return filterObject.catchAll;
  }

  parseStringRule(rule: StringRule, attributeValue: string | null): boolean {
    if (attributeValue === null) return false;
    switch (rule.operator) {
      case 'isOneOf':
        return rule.value.includes(attributeValue);
      case 'isNotOneOf':
        return !rule.value.includes(attributeValue);
      case 'startsWith':
        rule.value.forEach(e => {
          if (attributeValue.startsWith(e)) {
            return true;
          }
        });
        return false;
      case 'contains':
        rule.value.forEach(e => {
          if (attributeValue.includes(e)) {
            return true;
          }
        });
        return false;
      case 'matchesRegex':
        rule.value.forEach(e => {
          if (attributeValue.match(e)) {
            return true;
          }
        });
        return false;
    }
  }

  parseStringArrayRule(rule: StringArrayRule, attributeValue: string[]): boolean {
    let match = true;
    switch (rule.operator) {
      case 'exactlyMatches':
        if (attributeValue.length === rule.value.length) {
          attributeValue.forEach(e => {
            if (rule.value.includes(e)) {
              match &&= true;
            }
          });
        }
        return match;
      case 'containsAll':
        rule.value.forEach(e => {
          if (attributeValue.includes(e)) {
            match &&= true;
          }
        });
        return match;
      case 'containsAny':
        attributeValue.forEach(e => {
          if (rule.value.includes(e)) {
            return true;
          }
        });
        return false;
      case 'containsNone':
        attributeValue.forEach(e => {
          if (!rule.value.includes(e)) {
            match &&= true;
          }
        });
        return match;
    }
  }

  parseDateRule(rule: DateRule, attributeValue: number): boolean {
    switch (rule.operator) {
      case 'isBefore':
        return attributeValue < rule.value;
      case 'isAfter':
        return attributeValue > rule.value;
      case 'isWithin':
        return Date.now() - attributeValue < rule.value;
      case 'isNotWithin':
        return !(Date.now() - attributeValue < rule.value);
    }
  }
}
