import type { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      blurple: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
      blurple?: PaletteOptions['primary'];
    }
  }

  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      blurple: true;
    }
  }

const dtheme = createTheme();

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle2: {
      fontWeight: 700,
    },
  },
  palette: {
    blurple: dtheme.palette.augmentColor({
      color: { main: '#5865F2', contrastText: '#fff' },
      name: 'blurple',
    }),
    mode,
    ...(mode === 'light' ?
      {
        // palette values for light mode
        primary: {
          main: '#FBEEDB',
        },
        secondary: {
          main: '#FEC600',
        },
      } :
      {
        // palette values for dark mode
        primary: {
          main: '#FBEEDB',
        },
        secondary: {
          main: '#FEC600',
        },
      }),
  },
});

// primary FEC600 secondary F57C00
// fandom logo yellow #ffc502 pink #fa035a
