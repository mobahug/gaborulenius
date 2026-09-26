import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider as JotaiProvider } from "jotai";
import App from "./App";
import Seo from "./components/Seo";
import { I18nWrapper } from "./i18n/i18nWrapper";
import JourneyStage from "./journey/JourneyStage";
import { PageOverlay } from "./journey/overlays/Overlays";
import theme from "./theme";

const AppShell = () => (
  <JotaiProvider>
    <I18nWrapper>
      <ThemeProvider theme={theme}>
        <Seo />
        <JourneyStage />
        <CssBaseline />
        <App />
        <PageOverlay />
      </ThemeProvider>
    </I18nWrapper>
  </JotaiProvider>
);

export default AppShell;
