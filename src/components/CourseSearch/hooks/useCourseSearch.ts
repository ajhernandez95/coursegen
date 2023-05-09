import { supabase } from "../../../util/supabase";
import { newCourse } from "../../../services/edgeFunctions";
import { useCourseContext } from "../../../context/CourseContext";
import { useCallback, useState } from "react";
import { gpt } from "../../../constants/modelVersions";

const useCourseSearch = () => {
  const { search, setIsSearching, setCourse } = useCourseContext();

  const handleSearch = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke(newCourse.v2, {
        body: {
          search_text: search,
          max_tokens: 3000,
          gpt_model: process.env.NODE_ENV === "production" ? gpt.v4 : gpt.v3,
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
