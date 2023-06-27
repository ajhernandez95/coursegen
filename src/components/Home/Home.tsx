import { Box, Text } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "../CourseSearch/hooks/useCourseSearchQuery";
import { Image, Spinner } from "@chakra-ui/react";

const Home = () => {
  const { isSearching, search } = useCourseContext();
  const { isSuccess } = useCourseSearchQuery(search);

  return (
    <Box
      position="relative"
      minH="90vh"
      width="100vw"
      padding={["0 2rem", "0 5rem", "0 10rem"]}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {isSearching && (
        <Box display="flex" flexDir="column" alignItems="center">
          <Spinner size={["lg", "xl"]} />
          <Text mt={5} textAlign="center">
            Generating Course
          </Text>
          <Text mt={5} textAlign="center">
            Estimated time: 1 min
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
