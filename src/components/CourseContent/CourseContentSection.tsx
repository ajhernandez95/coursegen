import { Box } from "@chakra-ui/react";
import { useCourseContent } from "../../context/CourseContentContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";

const CourseContentSection = () => {
  const { activeSection } = useCourseContent();
  let { content } = activeSection || {};

  if (typeof content === "string") {
    content = JSON.parse(content);
  }

  return activeSection && activeSection.content ? (
    <Box pt={2} px={[10, 30]} mb={8} overflow="auto">
      <Box>
        {content.map((content: any, i: number) => (
          <CourseContentSectionDetails content={content} key={i} />
        ))}
      </Box>
    </Box>
  ) : null;
};

export default CourseContentSection;
