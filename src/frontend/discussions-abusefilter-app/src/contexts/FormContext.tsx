/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import type { Trigger } from '@shared/filters';
import type { Action } from '../../../../shared/actions';
import type { Rules } from '@shared/rules/rules';

interface FormContext {
  filter: string,
  modifyFilter: (filter: string) => void,
  triggers: Trigger[],
  modifyTriggers: (triggers: Trigger[]) => void,
  actions: Action[],
  modifyActions: (actions: Action[]) => void;
  rules: Rules,
  modifyRules: (rules: Rules) => void,
}

const defaultValues: FormContext = {
  filter: '',
  modifyFilter: () => {},
  triggers: [],
  modifyTriggers: () => {},
  actions: [],
  modifyActions: () => {},
  rules: { ruleGroups: [], catchAll: false },
  modifyRules: () => {},
};

const FormContext = React.createContext<FormContext>(defaultValues);

export default FormContext;

export const FormProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState(defaultValues.filter);
  const [triggers, setTriggers] = React.useState(defaultValues.triggers);
  const [actions, setActions] = React.useState(defaultValues.actions);
  const [rules, setRules] = React.useState(defaultValues.rules);

  const modifyFilter = (value: string) => {
    setFilter(value);
  };

  const modifyTriggers = (value: Trigger[]) => {
    setTriggers(value);
  };

  const modifyActions = (value: Action[]) => {
    setActions(value);
  };

  const modifyRules = (value: Rules) => {
    setRules(value);
  };

  return (
    <FormContext.Provider value={{ filter, modifyFilter, triggers, modifyTriggers, actions, modifyActions, rules, modifyRules }}>
      {children}
    </FormContext.Provider>
  );
};
