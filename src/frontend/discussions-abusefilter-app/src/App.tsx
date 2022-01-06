import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
//import { ThemeProvider } from '@mui/material/styles';
import {
  Container,
  Box,
} from '@mui/material';
import FilterList from './pages/FilterList';
import Filter from './pages/Filter';
import NavBar from './components/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

export default function App() {
  //const [theme, setTheme] = React.useState(localStorage.getItem('theme'));

  return (
    <CssBaseline>
      <Router>
        <NavBar />
        <Box component={Container} mt={5}>
          <Routes>
            <Route path="/" element={<FilterList />} />
            <Route path="/:filterId" element={<Filter />} />
          </Routes>
        </Box>
      </Router>
    </CssBaseline>
  );
}
