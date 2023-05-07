import { useQuery } from "@tanstack/react-query";
import useCourseSearch from "./useCourseSearch";

const useCourseSearchQuery = (search?: string) => {
  const handleSearch = useCourseSearch();

  return useQuery({
    queryFn: handleSearch,
    queryKey: ["courseSearch", search],
    enabled: false,
    retry: false,
  });
};

export default useCourseSearchQuery;
