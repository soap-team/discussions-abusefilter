/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

interface AuthContext {
  token: string,
  modifyToken: (token: string) => void;
}

const defaultValues = {
  token: '',
  modifyToken: () => {},
};

const AuthContext = React.createContext<AuthContext>(defaultValues);

export default AuthContext;

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState(defaultValues.token);

  const modifyToken = (value: string) => {
    setToken(value);
  };

  return (
    <AuthContext.Provider value={{ token, modifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};
