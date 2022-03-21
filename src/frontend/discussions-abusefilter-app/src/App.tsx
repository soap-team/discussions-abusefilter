import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Container,
  Box,
  CssBaseline,
} from '@mui/material';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Filters from './pages/Filters';
import Filter from './pages/Filter';
import { FormProvider } from './contexts/FormContext';
import AuthContext from './contexts/AuthContext';
import './App.css';
import Register from 'pages/Register';
import { ColorModeProvider } from 'contexts/ColorModeContext';
import { Paths } from 'Paths';
import { ActionsProvider } from 'contexts/ActionsContext';
import { RulesProvider } from 'contexts/RulesContext';
import { TriggersProvider } from 'contexts/TriggersContext';

export default function App() {
  const { token } = React.useContext(AuthContext);

  return (
    <ColorModeProvider>
      <CssBaseline enableColorScheme />
      <Router>
        <NavBar />
        <Box component={Container} sx={{ my: 5 }}>
          <Routes>
            <Route path="/" element={<Navigate replace to={Paths.landing} />} />
            <Route path={Paths.landing} element={token === '' ? <Landing /> : <Filters />} />
            <Route path={Paths.filter} element={token === '' ? <Navigate replace to={Paths.landing} /> : <FormProvider><TriggersProvider><RulesProvider><ActionsProvider><Filter /></ActionsProvider></RulesProvider></TriggersProvider></FormProvider>} />
            <Route path={Paths.login} element={token === '' ? <Login /> : <Navigate replace to={Paths.landing} /> } />
            <Route path={Paths.register} element={token === '' ? <Register /> : <Navigate replace to={Paths.landing} /> } />
          </Routes>
        </Box>
      </Router>
    </ColorModeProvider>
  );
}
