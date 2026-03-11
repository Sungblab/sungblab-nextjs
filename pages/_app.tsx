import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import { ToastProvider } from "../components/ui/Toast";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
