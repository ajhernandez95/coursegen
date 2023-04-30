import { CourseOutlineContext } from "./../../../context/CourseOutlineContext";
import { useContext } from "react";
import { supabase } from "../../../util/supabase";

const useCourseSearch = () => {
  const { search } = useContext(CourseOutlineContext);

  const handleSearch = async () => {
    const { data, error } = await supabase.functions.invoke("new_course", {
      body: {
        search_text: search,
        max_tokens: 3000,
      },
    });

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
