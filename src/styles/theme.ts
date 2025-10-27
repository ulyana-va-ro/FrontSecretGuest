import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F2F1F0",
    },
    primary: { main: "#1E40CA" },
    secondary: { main: "#BDF39F" },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: "2rem" },
    h2: { fontSize: "1.5rem" },
    // body1: { fontSize: "1.1rem" },
    // button: { fontSize: "1.1rem" },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto', sans-serif",
          textTransform: "none", 
          borderRadius: 8,
          padding: "12px 24px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1.1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8, 
          },
        },
      },
    },
  },
});

export default theme;