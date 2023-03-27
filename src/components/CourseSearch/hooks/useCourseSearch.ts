import { useContext } from "react";
import { SupabaseContext } from "./../../../context/SupabaseContext";

const useCourseSearch = () => {
  const { supabaseClient } = useContext(SupabaseContext);

  const handleSearch = async ({ query }: { query: string }) => {
    const { data, error } = await supabaseClient.functions.invoke(
      "new_course",
      {
        body: {
          subject: query,
          proficiency: "Beginner",
          section_count: 5,
          max_tokens: 3000,
        },
      }
    );
    // Add handleSupabaseResponse????
    return {
      data,
      error,
    };
  };
  return {
    handleSearch,
  };
};

export default useCourseSearch;
