import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../util/supabase";
import handleSupabaseResponse from "../../../util/handleSupabaseResponse";
import { useSupabase } from "../../../context/SupabaseContext";
import { useCallback } from "react";
import { CourseItemType, ICourse } from "../../../types/course";

const useMyCourses = () => {
  const { user } = useSupabase();
  const { id: userId } = user || {};
  const { data, isLoading, isError } = useQuery(["myCourses"], () =>
    handleFetchMyCourses()
  );

  const handleFetchMyCourses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("course")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        return Promise.reject(error);
      }

      return data as ICourse<CourseItemType.LESSON | CourseItemType.MODULE>[];
    } finally {
      // TODO: Add fetchingCourses state
    }
  }, [userId]);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useMyCourses;
