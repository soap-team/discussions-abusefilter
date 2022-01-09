/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

export type Trigger = {
  action: string,
  platform: string,
  type: string,
  wiki: string,
};

interface FormContext {
  filter: string,
  modifyFilter: (filter: string) => void,
  triggers: Trigger[],
  modifyTriggers: (triggers: Trigger[]) => void;
}

const defaultValues = {
  filter: '',
  modifyFilter: () => {},
  triggers: [{
    action: 'creates',
    platform: 'article comment',
    type: 'post',
    wiki: '',
  }],
  modifyTriggers: () => {},
};

const FormContext = React.createContext<FormContext>(defaultValues);

export default FormContext;

export const FormProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState(defaultValues.filter);
  const [triggers, setTriggers] = React.useState(defaultValues.triggers);

  const modifyFilter = (value: string) => {
    setFilter(value);
  };

  const modifyTriggers = (value: Trigger[]) => {
    setTriggers(value);
  };

  return (
    <FormContext.Provider value={{ filter, modifyFilter, triggers, modifyTriggers }}>
      {children}
    </FormContext.Provider>
  );
};
