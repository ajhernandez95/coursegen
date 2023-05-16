import { Box, Text } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "../CourseSearch/hooks/useCourseSearchQuery";
import { Image } from "@chakra-ui/react";

const Home = () => {
  const { isSearching, search } = useCourseContext();
  const { isSuccess } = useCourseSearchQuery(search);

  return (
    <Box
      position="relative"
      height="100%"
      width="100vw"
      padding={["0 2rem", "0 5rem", "0 10rem"]}
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      {isSearching && (
        <Box display="flex" flexDir="column" alignItems="center">
          <Image
            src="/dancing-owl.gif"
            borderRadius="50%"
            width={["100px", "100px", "200px"]}
            height={["100px", "100px", "200px"]}
          />
          <Text mt={5} textAlign="center">
            Generating Course
          </Text>
        </Box>
      )}
      {!isSearching && !isSuccess && (
        <Box width="80%" maxWidth="600px">
          <CourseSearch />
        </Box>
      )}
      {isSuccess && <CourseOutline />}
    </Box>
  );
};

export default Home;
