import * as React from 'react';
import {
  Typography,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/banner.png';
import { fandomPurple } from 'themes/Theme';

export default function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOnClick = () => {
    navigate('/login');
  };

  return (
    <Stack spacing={1} direction="column" justifyContent="center" alignItems="center" sx={{
      backgroundImage: `url(${banner})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      borderRadius: '16px',
      backgroundColor: theme.palette.mode === 'light' ? '#f9edd8' : fandomPurple,
      height: '347px',
    }}>
      <Typography sx={{ color: theme.palette.mode === 'light' ? '#000000de' : '#fff' }}>You must be logged in to use this tool.</Typography>
      <Button variant="contained" color="primary" disableElevation sx={{ fontWeight: 700, px: 5 }} onClick={handleOnClick}>Log in</Button>
    </Stack>
  );
}
