import type { AppProps /*, AppContext */ } from "next/app";
import "tailwindcss/tailwind.css";
import { Header, Footer } from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
