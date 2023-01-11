import React, { useState } from "react";
import supabase from "../utils/supabaseClient";
import { useEffect } from "react";
type Message = {
  profile: any;
  id: string;
  created_ad: string;
  content: string;
  profile_id: string;
};
export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*, profile:users(username)");
    if (!data) {
      alert("no data");
      return;
    }
    setMessages(data);
  };
  useEffect(() => {
    getMessages();
  }, []);
  useEffect(() => {
    const subsription = supabase;
    supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload: any) => {
        getMessages();
      })
      .subscribe();

    // return () => {
    //   supabase.removeChannel(subsription);
    // };
  }, []);
  console.log(messages);
  return (
    <ul className="p-2">
      {messages.map((e: any) => (
        <>
          <p>{e.created_ad}</p>
          <li key={e.id}>{e.content}</li>
          <span>{e.profile.username}</span>
        </>
      ))}
    </ul>
  );
}
