import { useContext } from "react";
import { SupabaseContext } from "./../../../context/SupabaseContext";

const useCourseSearch = () => {
  const { supabaseClient } = useContext(SupabaseContext);

  const handleSearch = async ({ query }: { query: string }) => {
    console.log(query);
    const res = await supabaseClient.functions.invoke("new_course", {
      body: {
        subject: "The Space Race",
        proficiency: "Basic",
        section_count: 5,
        max_tokens: 3000,
      },
    });

    console.log(res);
  };
  return {
    handleSearch,
  };
};

export default useCourseSearch;
