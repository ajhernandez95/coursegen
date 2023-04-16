import { Box } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";

const Home = () => {
  return (
    <Box mt={100} padding={["0 2rem", "0 5rem", "0 10rem"]}>
      <CourseSearch></CourseSearch>
      <CourseOutline></CourseOutline>
    </Box>
  );
};

export default Home;
