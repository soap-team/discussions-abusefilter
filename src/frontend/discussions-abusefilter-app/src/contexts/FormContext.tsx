import * as React from 'react';

interface FormContext {
    filter: string,
    modifyFilter: (filter: string) => void;
  }

const defaultValues = {
  filter: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  modifyFilter: () => {},
};

const FormContext = React.createContext<FormContext>(defaultValues);

export default FormContext;

export const FormProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState(defaultValues.filter);

  const modifyFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <FormContext.Provider value={{ filter, modifyFilter }}>
      {children}
    </FormContext.Provider>
  );
};
