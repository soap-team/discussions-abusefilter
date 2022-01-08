import * as React from 'react';
import {
  Typography,
  Button,
  Stack,
} from '@mui/material';
import banner from '../assets/banner.png';

export default function Landing() {
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
      <Typography>You must be logged in to use this tool.</Typography>
      <Button variant="contained" color="secondary" disableElevation sx={{ fontWeight: 700, px: 5 }}>Log in</Button>
    </Stack>
  );
}
