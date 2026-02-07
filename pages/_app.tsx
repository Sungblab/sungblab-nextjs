import type { AppProps } from "next/app";
import { ThemeProvider, LanguageProvider } from "../components/Components";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
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
