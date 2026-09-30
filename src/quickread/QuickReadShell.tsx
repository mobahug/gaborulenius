import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider as JotaiProvider } from "jotai";
import Seo from "../components/Seo";
import { I18nWrapper } from "../i18n/i18nWrapper";
import theme from "../theme";
import QuickReadPage from "./QuickReadPage";

/** Quick read, with what the journey's shell gives it: state, the copy in
 * both languages, the interface theme and the search data. */
const QuickReadShell = () => (
  <JotaiProvider>
    <I18nWrapper>
      <ThemeProvider theme={theme}>
        <Seo />
        <CssBaseline />
        <QuickReadPage />
      </ThemeProvider>
    </I18nWrapper>
  </JotaiProvider>
);

export default QuickReadShell;
