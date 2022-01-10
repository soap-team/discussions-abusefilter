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
} from '@mui/material';
import AuthContext from '../contexts/AuthContext';
import logo from '../assets/fandom-heart.svg';

export default function NavBar() {
  const { token, modifyToken } = React.useContext(AuthContext);
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
          <Typography variant="h6" className="links" sx={{ fontWeight: 700 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">Discussions AbuseFilter</Link>
          </Typography>
        </Box>
        {token !== '' && <Button color="inherit" sx={{ fontWeight: 700 }} onClick={handleLogout}>Log out</Button>}
      </Toolbar>
    </AppBar>
  );
}
