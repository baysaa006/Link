import React from "react";
import supabase from "../../../utils/supabaseClient";

function AddLink(props: any) {
  const {
    title,
    setTitle,
    url,
    setUrl,
    links,
    setLinks,
    userId,
    setClose,
    ...other
  } = props;
  const addNewLink = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase
          .from("links")
          .insert({
            title: title,
            url: url,
            user_id: userId,
          })
          .select();
        if (error) throw error;
        console.log("data: ", data);
        if (links) {
          setLinks([...data, ...links]);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div>
      <div className="w-full  flex justify-between">
        {" "}
        <h1> Create new link </h1>
        <button onClick={setClose}>x</button>
      </div>

      <div className="mt-4">
        <div className="block text-sm font-medium text-white">Title</div>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
          placeholder="my awesome link"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <div className="block text-sm font-medium white">URL</div>
        <input
          type="text"
          name="url"
          id="url"
          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
          placeholder="https://www.youtube.com"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 mt-4"
        onClick={addNewLink}
      >
        Add link
      </button>
    </div>
  );
}

export default AddLink;
