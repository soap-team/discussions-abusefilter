import * as React from 'react';
import {
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom';
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  SvgIcon,
  Box,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';
import AuthContext from '../contexts/AuthContext';
import logo from '../assets/fandom-heart.svg';
import ColorModeContext from 'contexts/ColorModeContext';

export default function NavBar() {
  const { token, modifyToken } = React.useContext(AuthContext);
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    modifyToken('');
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="fandomPurple" enableColorOnDark>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <SvgIcon component={RouterLink} to="/" sx={{ mr: 1, mb: 2 }}>
            <img src={logo}/>
          </SvgIcon>
          <Typography component="h1" variant="h6" className="links" sx={{ fontWeight: theme.typography.fontWeightBold }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">Discussions AbuseFilter</Link>
          </Typography>
        </Box>
        <Tooltip title="Toggle light/dark mode">
          <IconButton aria-label="Toggle light/dark mode" onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
        {token !== '' &&
          <Button color="inherit" sx={{ fontWeight: theme.typography.fontWeightBold }} onClick={handleLogout}>
            Log out
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
}

