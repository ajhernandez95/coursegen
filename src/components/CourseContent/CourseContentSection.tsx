import { Box, Spinner } from "@chakra-ui/react";
import { useCourseContentContext } from "../../context/CourseContentContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";
import useCourseContent from "./hooks/useCourseContent";

const CourseContentSection = () => {
  const { activeSection } = useCourseContentContext();
  const { isFetchingCourse, isFetchingLesson } = useCourseContent();
  let { content } = activeSection || {};

  if (typeof content === "string") {
    content = JSON.parse(content);
  }
  console.log(
    "CourseContentSection",
    isFetchingCourse,
    isFetchingLesson,
    content
  );

  return activeSection && activeSection.content ? (
    <Box pt={2} px={[10, 30]} mb={8} overflow="auto">
      <Box>
        {isFetchingCourse || isFetchingLesson ? (
          <Spinner />
        ) : (
          content.map((content: any, i: number) => (
            <CourseContentSectionDetails content={content} key={i} />
          ))
        )}
      </Box>
    </Box>
  ) : null;
};

export default CourseContentSection;
