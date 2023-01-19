import React, { useState } from "react";
import supabase from "../utils/supabaseClient";
import { useEffect } from "react";
import { useUser } from "@supabase/auth-ui-react/dist/esm/src/components/Auth/UserContext";
type Message = {
  profile: any;
  id: string;
  created_ad: string;
  content: string;
  profile_id: string;
};
export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useUser();

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
  console.log(user);
  return (
    <div className="w-60">
      <ul className="justify-end space-y-1 ">
        {messages.map((e: any) => (
          <li className="  bg-lime-300 p-2 " key={e.id}>
            <span className="text-black">{e.content}</span>
            <span className="text-sm w-2 p-1  text-gray-800">
              {/* {e.profile.username===useUser} */}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
