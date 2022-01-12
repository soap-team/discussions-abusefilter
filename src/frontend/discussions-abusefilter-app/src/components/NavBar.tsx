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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <SvgIcon component={RouterLink} to="/" sx={{ mr: 1, mb: 2 }}>
            <img src={logo}/>
          </SvgIcon>
          <Typography component="h1" variant="h6" className="links" sx={{ fontWeight: 700 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">Discussions AbuseFilter</Link>
          </Typography>
        </Box>
        <Tooltip title="Toggle light/dark theme">
          <IconButton aria-label="Toggle light/dark theme" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
        {token !== '' && <Button color="inherit" sx={{ fontWeight: 700 }} onClick={handleLogout}>Log out</Button>}
      </Toolbar>
    </AppBar>
  );
}
