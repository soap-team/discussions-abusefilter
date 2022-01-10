import * as React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  SvgIcon,
  Box,
} from '@mui/material';
import AuthContext from '../contexts/AuthContext';
import logo from '../assets/fandom-heart.svg';

export default function NavBar() {
  const { token, modifyToken } = React.useContext(AuthContext);

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <SvgIcon component={Link} to="/" sx={{ mr: 1, mb: 2 }}>
            <img src={logo}/>
          </SvgIcon>
          <Typography component={Link} to="/" variant="h6" className="links" color="inherit" sx={{ fontWeight: 700 }}>Discussions AbuseFilter</Typography>
        </Box>
        {token !== '' && <Button color="inherit" sx={{ fontWeight: 700 }} onClick={() => modifyToken('')}>Log out</Button>}
      </Toolbar>
    </AppBar>
  );
}
