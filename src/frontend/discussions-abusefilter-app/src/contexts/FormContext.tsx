/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import type { Trigger } from '@shared/filters';
import type { Action } from '../../../../shared/actions';

interface FormContext {
  filter: string,
  modifyFilter: (filter: string) => void,
  triggers: Trigger[],
  modifyTriggers: (triggers: Trigger[]) => void,
  actions: Action[],
  modifyActions: (actions: Action[]) => void;
}

const defaultValues: FormContext = {
  filter: '',
  modifyFilter: () => {},
  triggers: [{
    action: 'create',
    platform: 'article-comment',
    postType: 'thread',
    wiki: '',
  }],
  modifyTriggers: () => {},
  actions: [{
    type: 'log',
    webhook: '',
    content: '',
  }],
  modifyActions: () => {},
};

const FormContext = React.createContext<FormContext>(defaultValues);

export default FormContext;

export const FormProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState(defaultValues.filter);
  const [triggers, setTriggers] = React.useState(defaultValues.triggers);
  const [actions, setActions] = React.useState(defaultValues.actions);

  const modifyFilter = (value: string) => {
    setFilter(value);
  };

  const modifyTriggers = (value: Trigger[]) => {
    setTriggers(value);
  };

  const modifyActions = (value: Action[]) => {
    setActions(value);
  };

  return (
    <FormContext.Provider value={{ filter, modifyFilter, triggers, modifyTriggers, actions, modifyActions }}>
      {children}
    </FormContext.Provider>
  );
};
