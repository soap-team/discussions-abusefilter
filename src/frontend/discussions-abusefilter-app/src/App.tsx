import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Container,
  Box,
  Button,
} from '@mui/material';
import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import FilterList from './pages/FilterList';
import Filter from './pages/Filter';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import './App.css';

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
// FEC600 F57C00

export default function App() {
  const [theme] = React.useState(localStorage.getItem('theme'));
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <NavBar />
        <Box component={Container} sx={{ mt: 5 }}>
          <Button color="secondary" variant="contained" onClick={() => setIsLoggedIn(true)}>true</Button>
          <Button color="secondary" variant="contained" onClick={() => setIsLoggedIn(false)}>false</Button>
          <Routes>
            <Route path="/" element={isLoggedIn ? <FilterList /> : <Landing />} />
            <Route path="/:filterId" element={isLoggedIn ? <Filter /> : <Landing />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
