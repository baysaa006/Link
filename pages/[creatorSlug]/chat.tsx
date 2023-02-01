import React from "react";
import supabase from "../../utils/supabaseClient";
import { useEffect } from "react";
import Messages from "../../component/profile/chat/messages";
import Head from "next/head";

type chat = {
  username: string;
};
function Chat() {
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
    <div className="h-screen w-full items-center justify-center flex flex-col gap-4 p-5 ">
      <Head>{/* <title>{`${username}'s chat`}</title> */}</Head>
      <div className="h-80 w-3/5 overflow-y-scroll">
        {" "}
        <Messages />
      </div>
      <form className="" onSubmit={handleSubmit}>
        <input className=" text-black" type="text" name="message" />
      </form>
    </div>
  );
}

export default Chat;
