import { Box } from "@chakra-ui/layout";
import CourseOutline from "../CourseOutline";
import CourseSearch from "../CourseSearch";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "../CourseSearch/hooks/useCourseSearchQuery";

const Home = () => {
  const { isSearching, search } = useCourseContext();
  const { isSuccess } = useCourseSearchQuery(search);

  return (
    <Box padding={["0 2rem", "0 5rem", "0 10rem"]}>
      {!isSearching && !isSuccess && <CourseSearch />}
      <CourseOutline />
    </Box>
  );
};

export default Home;
