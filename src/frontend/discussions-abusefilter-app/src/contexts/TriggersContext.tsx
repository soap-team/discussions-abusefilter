/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import type { Trigger } from '@shared/filters';

interface TriggersContext {
  triggers: Trigger[],
  modifyTriggers: (triggers: Trigger[]) => void,
}

const defaultValues: TriggersContext = {
  triggers: [],
  modifyTriggers: () => {},
};

const TriggersContext = React.createContext<TriggersContext>(defaultValues);

export default TriggersContext;

export const TriggersProvider: React.FC = ({ children }) => {
  const [triggers, setTriggers] = React.useState(defaultValues.triggers);

  const modifyTriggers = (value: Trigger[]) => {
    setTriggers(value);
  };

  return (
    <TriggersContext.Provider value={{ triggers, modifyTriggers }}>
      {children}
    </TriggersContext.Provider>
  );
};
