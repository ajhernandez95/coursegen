import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import CourseItem from "./CourseItem";
import useMyCourses from "./hooks/useMyCourses";
import { CourseItemType, ICourse } from "../../types/course";
import { useState } from "react";

const MyCourses = () => {
  const { data: courses, isLoading, isError } = useMyCourses();

  return (
    <Flex>
      <Box
        w="100%"
        p="5px 15px"
        maxH="90vh"
        overflow="auto"
        transition={"all 0.2s ease-in-out"}
        display="flex"
        flexWrap="wrap"
        gap="20px"
      >
        {courses?.length
          ? courses.map(
              (
                course: ICourse<CourseItemType.LESSON | CourseItemType.MODULE>
              ) => <CourseItem key={course.id} course={course} />
            )
          : null}
      </Box>
    </Flex>
  );
};

export default MyCourses;
