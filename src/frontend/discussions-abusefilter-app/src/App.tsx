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
import FilterList from './pages/FilterList';
import Filter from './pages/Filter';
import { FormProvider } from './contexts/FormContext';
import AuthContext from './contexts/AuthContext';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
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
            <Route path="/" element={token === '' ? <Landing /> : <FilterList />} />
            <Route path="/:filterId" element={<ProtectedRoute><FormProvider><Filter /></FormProvider></ProtectedRoute>} />
            <Route path="/login" element={token === '' ? <Login /> : <Navigate replace to='/' /> } />
            <Route path="/register" element={token === '' ? <Register /> : <Navigate replace to='/' /> } />
          </Routes>
        </Box>
      </Router>
    </ColorModeProvider>
  );
}
