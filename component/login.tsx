import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const router = useRouter();

  async function signInWithEmail() {
    try {
      if (email && password) {
        const resp = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (resp.error) throw resp.error;
        const userId = resp.data.user?.id;
        console.log("userId: ", userId);
        router.push("/enkhe");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return (
    <div className=" flex items-center justify-center">
      <Head>
        {" "}
        <title>Login</title>
      </Head>
      <div className="flex flex-col  items-center justify-center  ">
        <label htmlFor="email" className="block text-sm font-medium ">
          <h1 className="text-base"> E-mail</h1>
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            className="block  rounded-md text-black border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="password" className="block text-sm font-medium  mt-4">
          <h1 className="text-base"> Password</h1>
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-md text-black border border-transparent bg-lime-300 px-4 py-2 text-sm font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 mt-4"
          onClick={signInWithEmail}
        >
          <h1>Log in</h1>
        </button>
      </div>
    </div>
  );
}
