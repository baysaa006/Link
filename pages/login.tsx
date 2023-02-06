import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";
import Signin from "../component/registerPages/signin";

function Login() {
  return (
    <section className="flex items-center justify-center h-screen">
      <Head>
        <title>Signin</title>
      </Head>
      <Signin />
    </section>
  );
}

export default Login;
