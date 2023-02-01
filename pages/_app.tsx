import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import router from "next/router";

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
      <nav className="fixed top-0  py-4  z-40 w-full m-0  flex flex-row justify-around backdrop-blur-lg  transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]   dark:bg-[#131517] ">
        <a href="/" className="cursor-pointer">
          <h1>Chatly</h1>
        </a>
        <div>
          <button onClick={() => router.push("/login")} className="border-none">
            Sign in
          </button>
        </div>
      </nav>{" "}
      <Component {...pageProps} />
    </>
  );
}
// c8e0d5fa-0b63-42aa-8ccc-1d2f8be7ef3b
