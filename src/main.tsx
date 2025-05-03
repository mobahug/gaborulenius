import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import theme from "./theme";
import { Provider as JotaiProvider } from "jotai";
import { I18nWrapper } from "./i18n/i18nWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JotaiProvider>
      <I18nWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </I18nWrapper>
    </JotaiProvider>
  </React.StrictMode>
);
