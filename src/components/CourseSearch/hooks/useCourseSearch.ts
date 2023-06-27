import { useCourseContext } from "../../../context/CourseContext";
import { useCallback } from "react";
import { getReq, postReq } from "../../../services/httpClient";
import endpoints from "../../../services/endpoints";
import { useSupabase } from "../../../context/SupabaseContext";

const useCourseSearch = () => {
  const { search, setIsSearching, setCourse } = useCourseContext();
  const { supabase } = useSupabase();

  const handleSearch = useCallback(async () => {
    try {
      const { data } = await postReq(endpoints.v2.course.post, {
        search_text: search,
        max_tokens: 3000,
      });

      const channel = supabase
        .channel("changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "course",
            filter: `id=eq.${data.course_id}`,
          },
          async (payload) => {
            if (payload?.new?.id) {
              await getReq(`${endpoints.v1.course.get(payload?.new?.id)}`).then(
                (res) => {
                  setCourse(res.data);
                  setIsSearching(false);
                  return res;
                }
              );
            }
          }
        )
        .subscribe();

      // if (error) {
      //   return Promise.reject(error);
      // }

      setCourse(data);
      return data;
    } catch (e) {
      setIsSearching(false);
    }
  }, [search]);

  return handleSearch;
};

export default useCourseSearch;
