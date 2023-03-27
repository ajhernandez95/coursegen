import { Box } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";

const Home = () => {
  return (
    <Box p="0 10%">
      <CourseSearch></CourseSearch>
      <CourseOutline></CourseOutline>
    </Box>
  );
};

export default Home;
