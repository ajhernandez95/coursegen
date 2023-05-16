import { Box, Text, Image } from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";
// TODO: Rename to CourseContentLesson
const CourseContentSection = () => {
  const { activeTopics, isFetchingCourse, isFetchingLesson } =
    useCourseContext();
  // TODO: Extract this to a component
  const loadingGif = (
    <Box display="flex" flexDir="column" alignItems="center">
      <Image
        src="/dancing-owl.gif"
        width={["100px", "100px", "200px"]}
        height={["100px", "100px", "200px"]}
        borderRadius="50%"
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
