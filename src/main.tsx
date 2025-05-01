import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import theme from "./theme";
import { Provider as JotaiProvider } from "jotai";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </JotaiProvider>
  </React.StrictMode>
);
