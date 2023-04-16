import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button, Skeleton, SkeletonText, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import CourseSections from "./CourseSections";

const CourseOutline = () => {
  const {
    outline: {
      course: { title, dates, description, courseId },
      sections,
    },
    isSearching: isLoading,
  } = useContext(CourseOutlineContext);

  return isLoading || courseId ? (
    <Box pb={50}>
      {isLoading ? (
        <Spinner />
      ) : (
        courseId && (
          <>
            <Box display="flex" justifyContent={["space-between"]}>
              <Heading as="h3" size="lg">
                {title} {dates && "(" + dates + ")"}
              </Heading>
              <Link to={"/course/" + courseId}>
                <Button>View Course</Button>
              </Link>
            </Box>
            <Text m="1rem 0" fontSize="1xl">
              {description}
            </Text>
            <CourseSections sections={sections}></CourseSections>
          </>
        )
      )}
    </Box>
  ) : null;
};

export default CourseOutline;
