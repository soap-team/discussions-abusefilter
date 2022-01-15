import * as React from 'react';
import {
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/banner.png';

export default function Landing() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/login');
  };

  return (
    <Stack spacing={1} sx={{
      backgroundImage: `url(${banner})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      py: 19,
    }}>
      <Typography sx={{ color: '#000000de' }}>You must be logged in to use this tool.</Typography>
      <Button variant="contained" color="primary" disableElevation sx={{ fontWeight: 700, px: 5 }} onClick={handleOnClick}>Log in</Button>
    </Stack>
  );
}
