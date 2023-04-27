import { Box, Text } from "@chakra-ui/react";
import { useCourseContentContext } from "../../context/CourseContentContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";
import { useEffect } from "react";

const CourseContentSection = () => {
  const { activeSection, isFetchingCourse, isFetchingLesson } =
    useCourseContentContext();
  let { content } = activeSection || {};

  if (typeof content === "string") {
    content = JSON.parse(content);
  }

  useEffect(() => {
    console.log(isFetchingCourse, isFetchingLesson);
  }, [isFetchingCourse, isFetchingLesson]);

  const loadingGif = (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      marginTop="-100px"
      marginLeft="-100px"
    >
      <img
        src="/dancing-owl.gif"
        style={{ borderRadius: "50%", width: "200px", height: "200px" }}
      />
      <Text mt={5}>Generating Lesson Content</Text>
    </Box>
  );

  return activeSection && activeSection.content ? (
    <Box pt={2} px={[10, 30]} mb={8} overflow="auto">
      {isFetchingCourse}
      {isFetchingLesson}
      <Box>
        {isFetchingCourse || isFetchingLesson
          ? loadingGif
          : content.map((content: any, i: number) => (
              <CourseContentSectionDetails content={content} key={i} />
            ))}
      </Box>
    </Box>
  ) : (
    loadingGif
  );
};

export default CourseContentSection;
