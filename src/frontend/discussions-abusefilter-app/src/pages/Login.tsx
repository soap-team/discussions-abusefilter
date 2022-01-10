import * as React from 'react';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

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

  const handleDiscordLogin = () => {
    console.log('discord');
  };

  return (
    <>
      <Typography component="h1" variant="h5">Login</Typography>
      <Stack component="form" onSubmit={handleSubmit} autoComplete="off" spacing={2} sx={{ mt: 2 }}>
        <Stack direction="column">
          <Typography component="label" htmlFor="login-email" variant="subtitle2">Email</Typography>
          <TextField
            id="login-email"
            variant="outlined"
            size="small"
            color="secondary"
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
            color="secondary"
            defaultValue={password}
            onBlur={handlePasswordChange}
            type="password"
          />
        </Stack>
        <Button variant="contained" color="secondary" type="submit" disableElevation>Submit</Button>
      </Stack>
      <Button variant="contained" color="secondary" onClick={handleDiscordLogin} disableElevation>Log in with Discord</Button>
    </>
  );
}
