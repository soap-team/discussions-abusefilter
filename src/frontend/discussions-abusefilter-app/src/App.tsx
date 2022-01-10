import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Container,
  Box,
  CssBaseline,
} from '@mui/material';
import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import FilterList from './pages/FilterList';
import Filter from './pages/Filter';
import { FormProvider } from './contexts/FormContext';
import AuthContext from './contexts/AuthContext';

import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle2: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FBEEDB',
    },
    secondary: {
      main: '#FEC600',
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FBEEDB',
    },
    secondary: {
      main: '#FEC600',
    },
  },
});
// primary FEC600 secondary F57C00
// fandom logo yellow #ffc502 pink #fa035a

export default function App() {
  const [theme] = React.useState(localStorage.getItem('theme'));
  const { token } = React.useContext(AuthContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box component={Container} sx={{ my: 5 }}>
          <Routes>
            <Route path="/" element={token === '' ? <Landing /> : <FilterList />} />
            <Route path="/:filterId" element={<ProtectedRoute><FormProvider><Filter /></FormProvider></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
