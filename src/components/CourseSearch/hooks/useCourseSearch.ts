import { CourseOutlineContext } from "./../../../context/CourseOutlineContext";
import { useContext } from "react";
import { supabase } from "../../../util/supabase";
import { newCourse } from "../../../services/newCourse";
import { useCourseContext } from "../../../context/CourseContext";

const useCourseSearch = () => {
  const { search } = useCourseContext();

  const handleSearch = async () => {
    const { data, error } = await supabase.functions.invoke(newCourse.v2, {
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
