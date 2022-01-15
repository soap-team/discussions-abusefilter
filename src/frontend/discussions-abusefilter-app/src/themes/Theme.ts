import type { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      blurple: Palette['primary'];
      fandomPurple: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
      blurple?: PaletteOptions['primary'];
      fandomPurple?: PaletteOptions['primary'];
    }
  }

  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      blurple: true;
    }
  }
  // Update the Button's color prop options
  declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
      fandomPurple: true;
    }
  }
  // Update the Button's color prop options
  declare module '@mui/material/TableHead' {
    interface TableHeadPropsColorOverrides {
      fandomPurple: true;
    }
  }

const dtheme = createTheme();

export const fandomPurple = '#520044';

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
    fandomPurple: dtheme.palette.augmentColor({
      color: { main: fandomPurple, contrastText: '#fff' },
      name: 'fandomPurple',
    }),
    mode,
    ...(mode === 'light' ?
      {
        primary: {
          main: fandomPurple,
        },
        secondary: {
          main: '#9b004e',
        },
      } :
      {
        primary: {
          main: '#f00079',
        },
        secondary: {
          main: '#bd005f',
        },
      }),
  },
});

