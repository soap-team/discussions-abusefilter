/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import type { Rules } from '@shared/rules/rules';

interface RulesContext {
  rules: Rules,
  modifyRules: (rules: Rules) => void,
}

const defaultValues: RulesContext = {
  rules: { ruleGroups: [], catchAll: false },
  modifyRules: () => {},
};

const RulesContext = React.createContext<RulesContext>(defaultValues);

export default RulesContext;

export const RulesProvider: React.FC = ({ children }) => {
  const [rules, setRules] = React.useState(defaultValues.rules);

  const modifyRules = (value: Rules) => {
    setRules(value);
  };

  return (
    <RulesContext.Provider value={{ rules, modifyRules }}>
      {children}
    </RulesContext.Provider>
  );
};
