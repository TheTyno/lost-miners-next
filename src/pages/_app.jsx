import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c111a",
          color: "white",
          borderStyle: "solid",
          borderColor: "white",
          fontSize: 14,
          margin: 15,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Border color when focused
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Border color on hover
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#909191", // Default border color
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0c111a",
          border: "0.1px solid white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform .2s ease-in-out",
          margin: "1em",
          width: "5em",
          height: "7em",
          borderRadius: "5px",
          backgroundColor: "#0c111a",
          boxShadow:
            "0 8px 12px rgba(255, 255, 255, 0.2), 0 4px 8px rgba(255, 255, 255, 0.19)",
          "&:hover": {
            transform: "scale(1.1)", // Increase size slightly on hover
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#e8cd33", // Primary color
    },
    background: {
      default: "#0c111a", // Background color
    },
    text: {
      primary: "#ffff",
      secondary: "#e8cd33",
    },
    // Add other palette options as needed
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Font family
    // Add other typography options as needed
  },
  // Add other theme options as needed
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
