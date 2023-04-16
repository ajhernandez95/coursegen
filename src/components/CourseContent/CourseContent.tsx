import { Box, VStack } from "@chakra-ui/layout";
import useCourseContent from "./hooks/useCourseContent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CourseContentSidebar from "./CourseContentSidebar";
import CourseContentSection from "./CourseContentSection";

const CourseContent = () => {
  const { handleSection } = useCourseContent();
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      handleSection();
    }
  }, []);

  return (
    <Box display="flex">
      <CourseContentSidebar />
      <CourseContentSection />
    </Box>
  );
};

export default CourseContent;
