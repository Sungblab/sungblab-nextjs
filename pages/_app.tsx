import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import { ToastProvider } from "../components/ui/Toast";
import { useLenis } from "../utils/lenis";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

function AppContent({ Component, pageProps }: AppProps): JSX.Element {
  useLenis();

  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
