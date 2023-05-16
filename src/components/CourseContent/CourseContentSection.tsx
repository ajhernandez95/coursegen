import { Box, Text, Image } from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import CourseContentSectionDetails from "./CourseContentSectionDetails";
// TODO: Rename to CourseContentLesson
const CourseContentSection = () => {
  const { activeTopics, isFetchingCourse, isFetchingLesson } =
    useCourseContext();
  // TODO: Extract this to a component
  const loadingGif = (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
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
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      pt={2}
      px={["20px", "10px"]}
      mb={8}
      width="100%"
    >
      <Box>
        {isFetchingCourse || isFetchingLesson ? (
          <Box
            bg="red"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {loadingGif}
          </Box>
        ) : (
          activeTopics.map((topic: any, i: number) => (
            <CourseContentSectionDetails content={topic} key={i} />
          ))
        )}
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      pt={2}
      px={["20px", "10px"]}
      width="100%"
    >
      {loadingGif}
    </Box>
  );
};

export default CourseContentSection;
