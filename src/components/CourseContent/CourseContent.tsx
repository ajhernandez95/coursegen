import { Box } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGetCourseQuery from "./hooks/useGetCourseQuery";
import CourseContentSidebar from "./CourseContentSidebar";
import CourseContentSidebarMobile from "./CourseContentSidebarMobile";
import CourseContentSection from "./CourseContentSection";

const CourseContent = () => {
  const { courseId } = useParams();
  useGetCourseQuery(courseId);

  return (
    <Box display="flex" width="100%">
      <Show below="sm">
        <CourseContentSidebarMobile />
      </Show>
      <Show above="md">
        <CourseContentSidebar />
      </Show>
      <CourseContentSection />
    </Box>
  );
};

export default CourseContent;
