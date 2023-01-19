import React from "react";
import supabase from "../../utils/supabaseClient";
import { useEffect } from "react";
import Messages from "../../component/messages";
import Head from "next/head";
function Chat(props: any) {
  const { username, ...other } = props;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { error, data } = await supabase
        .from("messages")
        .insert({ content: message });
      console.log({ error, data });
      if (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className=" h-max w-full items-center justify-center p-5">
      <Head>
        <title>{`${username}'s chat`}</title>
      </Head>
      <h1>{username}</h1>
      <Messages />
      <form className="w-full" onSubmit={handleSubmit}>
        <input className=" text-black" type="text" name="message" />
      </form>
    </div>
  );
}

export default Chat;
