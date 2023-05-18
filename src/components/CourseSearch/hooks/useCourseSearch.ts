import { supabase } from "../../../util/supabase";
import { newCourse } from "../../../services/edgeFunctions";
import { useCourseContext } from "../../../context/CourseContext";
import { useCallback } from "react";

const useCourseSearch = () => {
  const { search, setIsSearching, setCourse } = useCourseContext();

  const handleSearch = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke(newCourse.v4, {
        body: {
          search_text: search,
          max_tokens: 3000,
        },
      });

      if (error) {
        return Promise.reject(error);
      }

      setCourse(data);
      return data;
    } finally {
      setIsSearching(false);
    }
  }, [search]);

  return handleSearch;
};

export default useCourseSearch;
