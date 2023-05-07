import { Box } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import CourseContentSidebar from "./CourseContentSidebar";
import CourseContentSection from "./CourseContentSection";
import useGetCourseQuery from "./hooks/useGetCourseQuery";

const CourseContent = () => {
  const { courseId } = useParams();
  useGetCourseQuery(courseId);

  return (
    <Box display="flex" width="100%">
      <CourseContentSidebar />
      <CourseContentSection />
    </Box>
  );
};

export default CourseContent;
