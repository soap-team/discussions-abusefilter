/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import type { Action } from '../../../../shared/actions';

interface ActionsContext {
  actions: Action[],
  modifyActions: (actions: Action[]) => void;
}

const defaultValues: ActionsContext = {
  actions: [],
  modifyActions: () => {},
};

const ActionsContext = React.createContext<ActionsContext>(defaultValues);

export default ActionsContext;

export const ActionsProvider: React.FC = ({ children }) => {
  const [actions, setActions] = React.useState(defaultValues.actions);

  const modifyActions = (value: Action[]) => {
    setActions(value);
  };

  return (
    <ActionsContext.Provider value={{ actions, modifyActions }}>
      {children}
    </ActionsContext.Provider>
  );
};
