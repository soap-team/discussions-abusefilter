// IRC filters publishes messages to 11100
import type { Listener } from 'messenger';
import type { Filter, FilterMetadata, Trigger, TriggerAction, TriggerPlatform, TriggerPostType } from '../shared/filters';
import type { MessengerAction, MessengerEvent, MessengerPlatform, MessengerPostType } from '../shared/messenger';
import { VM } from 'vm2';
import type { Context, ContextHandler } from './context_handler';
import { DiscussionUtil } from './discussions_util';
import type { ContentNode } from 'fandom-api/dist/controllers/discussion_types/json_model';
import type { ActionHandler } from './action_handler';
import { RuleHandler } from './rule_handler';

export type FilterData = {
  info: Record<string, FilterMetadata>,
  filters: Record<string, Filter>,
};

/**
 * Handles rule checking when a post arrives in the listener.
 */
export class FilterHandler {
  data: FilterData;
  wikis: Set<string>;

  constructor(
    data: FilterData,
    readonly listener: Listener,
    readonly contextHandler: ContextHandler,
    readonly actionHandler: ActionHandler,
  ) {
    this.data = data;
    this.wikis = new Set();

    Object.values(data.info).map(info => {
      info.wikis.forEach(wiki => this.wikis.add(wiki));
    });
    // eslint-disable-next-line no-console
    console.log('Filters enabled on wikis:', this.wikis);
  }

  private matchPlatform(eventPlatform: MessengerPlatform, triggerPlatform: TriggerPlatform): boolean {
    switch (triggerPlatform) {
      case 'any': return true;
      default: return eventPlatform === triggerPlatform;
    }
  }

  private matchPostType(eventPostType: MessengerPostType, triggerPostType: TriggerPostType): boolean {
    switch (triggerPostType) {
      case 'any': return true;
      default: return eventPostType === triggerPostType;
    }
  }

  private matchAction(eventAction: MessengerAction, triggerAction: TriggerAction): boolean {
    switch (triggerAction) {
      case 'create-modify': return eventAction === 'created' || eventAction === 'modified';
      case 'create': return eventAction === 'created';
      case 'delete': return eventAction === 'deleted';
      case 'modify': return eventAction === 'modified';
      case 'move': return eventAction === 'moved';
      case 'report': return true;
    }
  }

  /**
   * Checks if a trigger matches the event coming from messenger.
   * Wiki must be provided. If platform is 'report', postType and action are ignored.
   */
  matchTrigger(event: MessengerEvent, trigger: Trigger): boolean {
    // Wikis must match
    if (!trigger.wikis.includes(event.wiki)) {
      return false;
    }

    // Report triggers only checked against the action type
    if (event.platform === 'report' && trigger.action === 'report') {
      return true;
    }

    return this.matchPlatform(event.platform, trigger.platform) &&
      this.matchPostType(event.postType, trigger.postType) &&
      this.matchAction(event.action, trigger.action);
  }

  checkAndPerformActions = async (_: unknown, event: MessengerEvent): Promise<void> => {
    try {
      if (!this.wikis.has(event.wiki)) {
        return;
      }

      // Set the context on the first trigger
      let context: Context | null = null;

      // Go through each filter
      for (const filter of Object.values(this.data.filters)) {
        if (filter.triggers.some(trigger => this.matchTrigger(event, trigger))) {
          // Retrieve context if not retrieved before
          if (!context) {
            context = await this.contextHandler.getContext(event);
          }

          const ruleHandler = new RuleHandler(filter, context);
          let res = false;

          // Check if the filter matches UI rules
          if (ruleHandler.checkUIFilter()) {
            res = ruleHandler.parseUIFilter();
          } else {
            // Check if the filter matches JS rules
            res = this.checkJSFilter(filter, context, event);
          }

          // Perform actions
          if (res) {
            filter.actions.forEach((action) => {
              this.actionHandler.performAction(action, context, event);
            });
          }
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  /** Starts listening to events and checking filters. */
  start = (): void => {
    this.listener.on('find:raw', this.checkAndPerformActions);
  };

  checkJSFilter(filter: Filter, context: Context, event: MessengerEvent): boolean {
    if (!context) return false;
    const { user, post } = context;
    if (!user || !post || !post.jsonModel) return false;

    const contentNode: ContentNode = JSON.parse(post.jsonModel!);

    const sandbox = {
      user,
      post,
      event,
      getLinks: () => DiscussionUtil.getLinks(contentNode, event.wiki),
      getText: () => DiscussionUtil.getTextContent(contentNode),
    };

    const result = new VM({ sandbox }).run(`
      (function() {
        ${filter.filter.replace(/\\n/g, '')}
      })();
    `);
    return result;
  }
}
