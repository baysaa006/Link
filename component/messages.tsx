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
    const { data, error } = await supabase.from("messages").select("*");
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
  return (
    <div className="w-60">
      <ul className="justify-end space-y-1 ">
        {messages.map((e: any) => (
          <li className="  bg-lime-300 " key={e.id}>
            <span className="text-black">{e.content}</span>

            {/* <span className="text-sm w-2 p-1  text-gray-800">
              {e.profile.username}
            </span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
