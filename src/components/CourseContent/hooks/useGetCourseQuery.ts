import { useQuery } from "@tanstack/react-query";
import useCourseContent from "./useCourseContent";

const useGetCourseQuery = (courseId: string | undefined) => {
  const { handleGetCourse } = useCourseContent();
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => handleGetCourse({ setFirstLesson: true }),
    enabled: courseId ? true : false,
    retry: false,
  });
};

export default useGetCourseQuery;
