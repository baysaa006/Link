import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import router from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Link from "next/link";
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import extendTheme from "../styles/theme/index"
import theme from "../styles/theme/index";
export default function App({ Component, pageProps }: AppProps) {
   const [isAuthenticated, setIsAuthenticated]=useState(false)
  const queryClient = new QueryClient()
 

useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user);
      if (user.data.user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
      }
    };

    getUser();
  }, []);

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
      {/* {isAuthenticated?<></>:  <nav className="fixed top-0  py-4  z-40 w-full m-0  flex flex-row justify-around backdrop-blur-lg  transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]   dark:bg-[#131517] ">
        <Link href="/" className="cursor-pointer">
          <h1>Chatly</h1>
        </Link>
        <div>
          <button onClick={() => router.push("/login")} className="border-none">
            Sign in
          </button>
        </div>
      </nav>} */}
    
          <ChakraProvider resetCSS={true}  theme={theme}>

          <QueryClientProvider client={queryClient}>       
            <Component {...pageProps} />
            </QueryClientProvider>
            </ChakraProvider>

    </>
  );
}
