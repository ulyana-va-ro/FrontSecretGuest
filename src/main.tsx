import React from "react";
// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
import ReactDOM from "react-dom/client";
import App from "./App.tsx"
import { ThemeProvider, CssBaseline  } from '@mui/material';
import theme from "./styles/theme";
// import "./styles/fonts.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);