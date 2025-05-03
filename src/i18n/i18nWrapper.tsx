import { useAtomValue } from "jotai";
import { IntlProvider } from "react-intl";
import { localeAtom } from "../hooks/localeAtom";
import { messages } from "./messages";

export function I18nWrapper({ children }: React.PropsWithChildren) {
  const locale = useAtomValue(localeAtom);
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale="en"
    >
      {children}
    </IntlProvider>
  );
}
