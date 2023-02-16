import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";
import Register from "../component/registerPages/signup";

function Signup() {
  return (
    <section className="flex items-center justify-center h-screen">
      <Head>
        <title>Singup</title>
      </Head>
      <Register />
    </section>
  );
}

export default Signup;
