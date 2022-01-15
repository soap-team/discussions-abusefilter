import * as React from 'react';
import { Typography, TextField, Button, Stack, SvgIcon, Divider, Link, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { ReactComponent as DiscordLogo } from '../assets/icon_clyde_white_RGB.svg';

export default function Login() {
  const navigate = useNavigate();
  // const handleLogin = async () => {
  // const token = await ;
  // };
  const { modifyToken } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    modifyToken('token');
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  const handleDiscordLogin = () => {
    console.log('discord');
  };

  const handleForgotPassword = () => {
    console.log('forgot pw');
  };

  return (
    <Paper variant="outlined" sx={{ mx: 40, my: 10, p: 10 }}>
      <Typography component="h1" variant="h5">Login</Typography>
      <Stack component="form" onSubmit={handleSubmit} autoComplete="off" spacing={2} sx={{ mt: 2 }}>
        <Stack direction="column">
          <Typography component="label" htmlFor="login-email" variant="subtitle2">Email</Typography>
          <TextField
            id="login-email"
            variant="outlined"
            size="small"
            color="primary"
            defaultValue={email}
            onBlur={handleEmailChange}
          />
        </Stack>
        <Stack direction="column">
          <Typography component="label" htmlFor="login-password" variant="subtitle2">Password</Typography>
          <TextField
            id="login-password"
            variant="outlined"
            size="small"
            color="primary"
            defaultValue={password}
            onBlur={handlePasswordChange}
            type="password"
          />
        </Stack>
        <Button variant="contained" color="primary" type="submit" disableElevation>Log in with email</Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link
            component="button"
            type="button"
            color="primary"
            onClick={handleSignup}
            underline="none"
            sx={{ textAlign: 'right' }}
          >
            Don't have an account? Sign up
          </Link>
          <Link
            component="button"
            type="button"
            color="primary"
            onClick={handleForgotPassword}
            underline="none"
            sx={{ textAlign: 'right' }}
          >
            Forgot Password
          </Link>
        </Box>
        <Divider>or</Divider>
        <Button
          variant="contained"
          onClick={handleDiscordLogin}
          disableElevation
          color="blurple"
          startIcon={<SvgIcon><DiscordLogo /></SvgIcon>}
        >
        Log in with Discord
        </Button>

      </Stack>
    </Paper>
  );
}
