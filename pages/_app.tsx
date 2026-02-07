import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
