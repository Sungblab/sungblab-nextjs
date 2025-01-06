import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../components/Components";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
};

export default App;
