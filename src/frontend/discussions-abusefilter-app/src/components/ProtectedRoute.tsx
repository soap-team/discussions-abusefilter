import * as React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export const ProtectedRoute: React.FC = ({ children }) => {
  const { token } = React.useContext(AuthContext);

  return (
    token === '' ?
      <Navigate replace to="/login" /> : <>{children}</>
  );
};

export default ProtectedRoute;
