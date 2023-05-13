import { Box, Text } from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";
// TODO: Rename to CourseContentLesson
const CourseContentSection = () => {
  const { activeTopics, isFetchingCourse, isFetchingLesson } =
    useCourseContext();
  // TODO: Extract this to a component
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

  return activeTopics?.length ? (
    <Box pt={2} px={["20px", "10px"]} mb={8}>
      <Box>
        {isFetchingCourse || isFetchingLesson
          ? loadingGif
          : activeTopics.map((topic: any, i: number) => (
              <CourseContentSectionDetails content={topic} key={i} />
            ))}
      </Box>
    </Box>
  ) : (
    loadingGif
  );
};

export default CourseContentSection;
