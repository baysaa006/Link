import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          className="bg-black rounded"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.svg"
        />
      </Head>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </>
  );
}
