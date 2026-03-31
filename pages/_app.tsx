import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import { ToastProvider } from "../components/ui/Toast";
import { useLenis } from "../utils/lenis";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

function AppInner({ Component, pageProps }: { Component: AppProps["Component"]; pageProps: AppProps["pageProps"] }): JSX.Element {
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
          <AppInner Component={Component} pageProps={pageProps} />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
