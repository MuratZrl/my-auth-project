// theme.ts
import { createTheme } from '@mui/material/styles';
import {
  grey,
  blue,
  orange,
  red,
  green,
  indigo,
} from '@mui/material/colors';

// Varsayılan font ailesi
const defaultFont = ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',');

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: blue[600],
      light: blue[300],
      dark: blue[800],
      contrastText: '#fff',
    },

    secondary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
      contrastText: '#fff',
    },

    error: {
      main: red[600],
    },

    warning: {
      main: orange[600],
    },

    info: {
      main: indigo[500],
    },

    success: {
      main: green[600],
    },

    background: {
      default: grey[100],
      paper: '#fff',
    },

    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },

  typography: {
    fontFamily: defaultFont,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      color: grey[600],
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8, // default 8px bazlı spacing sistemi

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: blue[600],
          '&:hover': {
            backgroundColor: blue[700],
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

export default theme;
