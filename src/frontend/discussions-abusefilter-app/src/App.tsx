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

export default function App() {
  const { token } = React.useContext(AuthContext);

  return (
    <ColorModeProvider>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box component={Container} sx={{ my: 5 }}>
          <Routes>
            <Route path="/" element={token === '' ? <Landing /> : <Filters />} />
            <Route path="/:filterId" element={token === '' ? <Navigate replace to='/' /> : <FormProvider><Filter /></FormProvider>} />
            <Route path="/login" element={token === '' ? <Login /> : <Navigate replace to='/' /> } />
            <Route path="/register" element={token === '' ? <Register /> : <Navigate replace to='/' /> } />
          </Routes>
        </Box>
      </Router>
    </ColorModeProvider>
  );
}
