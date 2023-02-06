import supabase from "../../utils/supabaseClient";

export const getLinks = async (userId: any) => {
  const { data, error } = await supabase
    .from("links")
    .select("title, url")
    .eq("user_id", userId);
  return { data, error };
};
