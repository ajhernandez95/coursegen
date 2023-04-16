import { CourseOutlineContext } from "./../../../context/CourseOutlineContext";
import { useContext } from "react";
import { supabase } from "../../../util/supabase";
import { useToast } from "@chakra-ui/toast";

const useCourseSearch = () => {
  const { subjectSearch, proficiency, sectionCount } =
    useContext(CourseOutlineContext);
  const toast = useToast();

  const handleSearch = async () => {
    const { data, error } = await supabase.functions.invoke("new_course", {
      body: {
        subject: subjectSearch,
        // proficiency: proficiency,
        // section_count: +sectionCount,
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
