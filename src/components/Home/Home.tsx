import { Box, Text } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "../CourseSearch/hooks/useCourseSearchQuery";
import { MdKeyboardBackspace } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const { isSearching, search } = useCourseContext();
  const { isSuccess } = useCourseSearchQuery(search);
  const queryClient = useQueryClient();

  return (
    <Box padding={["0 2rem", "0 5rem", "0 10rem"]}>
      {isSearching && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <img
            src="/dancing-owl.gif"
            style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          />
          <Text mt={5} textAlign="center">
            Generating Course
          </Text>
        </Box>
      )}
      {!isSearching && !isSuccess && (
        <Box pt="25%">
          <CourseSearch />
        </Box>
      )}
      {!isSearching && isSuccess && (
        <IconButton
          mb={3}
          aria-label="go back"
          size="lg"
          paddingX="20px"
          onClick={() => queryClient.resetQueries(["courseSearch", search])}
          icon={<MdKeyboardBackspace />}
        />
      )}
      {isSuccess && <CourseOutline />}
    </Box>
  );
};

export default Home;
