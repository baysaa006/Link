import Head from "next/head";
import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();

  async function signUpWithEmail() {
    try {
      if (email && password) {
        const resp = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (resp.error) throw resp.error;
        const userId = resp.data.user?.id;
        if (userId) {
          await createUser(userId);
          console.log("userId: ", userId);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function createUser(userId: string) {
    try {
      const { error } = await supabase
        .from("users")
        .insert({ id: userId, username: username });
      if (error) throw error;
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="flex flex-col  gap-[1vw]   w-full justify-center items-center">
        <label htmlFor="email" className="block text-sm font-medium ">
          <h1 className="text-base">Username</h1>
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
            placeholder="chatly.io/username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label htmlFor="email" className="block text-sm font-medium ">
          <h1 className="text-base"> E-mail</h1>
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mt-4"
        >
          <h1 className="text-base">Password</h1>
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
          className="inline-flex items-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 mt-4"
          onClick={signUpWithEmail}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
