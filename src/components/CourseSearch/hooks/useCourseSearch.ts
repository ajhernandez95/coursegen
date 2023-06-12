import { useCourseContext } from "../../../context/CourseContext";
import { useCallback } from "react";
import { postReq } from "../../../services/httpClient";
import endpoints from "../../../services/endpoints";

const useCourseSearch = () => {
  const { search, setIsSearching, setCourse } = useCourseContext();

  const handleSearch = useCallback(async () => {
    try {
      const { data } = await postReq(endpoints.v1.course.post, {
        search_text: search,
        max_tokens: 3000,
      });

      // if (error) {
      //   return Promise.reject(error);
      // }

      setCourse(data);
      return data;
    } finally {
      setIsSearching(false);
    }
  }, [search]);

  return handleSearch;
};

export default useCourseSearch;
