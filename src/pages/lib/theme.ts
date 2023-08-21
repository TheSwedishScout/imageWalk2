import { createTheme } from "@mui/material/styles";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,110,199)",
      dark: "rgb(0,61,105)",
    },
    secondary: {
      main: "rgb(200,182,0)",
    },
    error: {
      main: "rgb(178,0,0)",
    },
    success: {
      main: "rgb(82,175,0)",
    },
    grey: {
      100: "rgb(243, 242, 241)",
      200: "rgb(232, 228, 225)",
      400: "rgb(212, 212, 212)",
      600: "rgb(136, 125, 117)",
    },
  },
  typography: {
    fontFamily: '"Klavika-regular",Helvetica,Arial,sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'klavika-regular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('klavika'), local('klavika-regular'), url("/fonts/klavika-regular.woff2") format('woff2');
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundImage:
            "linear-gradient(135deg, rgb(0,110,199) 0%, rgb(0,92,158) 69%, rgb(0,61,105) 100%)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgb(0,61,105)",
        },
      },
    },
  },
});


/*
primary
secondary
error
warning
info
success
mode
tonalOffset
contrastThreshold
common
grey
text
divider
action
background
 */
/**
  light?: string;
 * main: string;
  dark?: string;
  contrastText
 */

// --doc-height: 100vh;
// --base-font-size: 16px;
// --text-size: clamp(.875rem,2vw,1.125rem);
// --notchSize: 1.5rem;
// --max-content-width: 1280px;
// --min-width: .875rem;
// --page-frame-width: 0;
// --logo-width: 8rem;
// --logo-height: 3rem;
// --navbar-height: 30px;
// --color-opacity: 1;
// --bg-color-opacity: 1;
// --color-primary-blue: 0,110,199;
// --color-adesso-blue-2: 0,92,158;
// --color-adesso-blue-3: 0,61,105;
// --color-adesso-blue-4: 6,45,71;
// --color-secondary-mustard: 200,182,0;
// --color-tertiary-warmgrey: 136,125,117;
// --color-tertiary-grey: 220,217,215;
// --color-tertiary-grey--light: 232,228,225;
// --color-tertiary-grey--lighter: 243,242,241;
// --color-black: 0,0,0;
// --color-white: 255,255,255;
// --color-error: 178,0,0;
// --color-success: 82,175,0;
// --color-primary: var(--color-primary-blue);
// --color-bg: var(--color-white);
// --color-text: var(--color-black);
// --color-highlight: var(--color-primary-blue);
// --font-klavika-regular: "Klavika-regular",Helvetica,Arial,sans-serif;
// --font-klavika-medium: "Klavika-medium",Helvetica,Arial,sans-serif;
// --font-klavika-light: "Klavika-light",Helvetica,Arial,sans-serif;
// --align: center;
// --valign: center;
// --button-padding: .8rem;
// color-scheme: light only;
