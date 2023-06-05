import { Box, Flex, Text } from "@chakra-ui/react";
import CourseItem from "./CourseItem";
import useMyCourses from "./hooks/useMyCourses";
import { CourseItemType, ICourse } from "../../types/course";
import { LoadingGif } from "../LoadingGif";

const MyCourses = () => {
  const { data: courses, isLoading } = useMyCourses();

  return isLoading ? (
    <Box
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingGif text="Loading Courses" />
    </Box>
  ) : (
    <Flex justifyContent="center" alignItems="center">
      <Box
        p="5px 15px"
        maxH="90vh"
        overflow="auto"
        transition={"all 0.2s ease-in-out"}
        display="flex"
        flexWrap="wrap"
        gap="20px"
      >
        {courses?.length ? (
          courses?.map(
            (
              course: ICourse<CourseItemType.LESSON | CourseItemType.MODULE>
            ) => <CourseItem key={course.id} course={course} />
          )
        ) : (
          <Text>
            No courses yet, try generating some and come back later to see them
            here.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MyCourses;
