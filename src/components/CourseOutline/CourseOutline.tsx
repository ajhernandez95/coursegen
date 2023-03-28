import { Box, Heading, Text } from "@chakra-ui/layout";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import CourseSection from "./CourseSection";

const CourseOutline = () => {
  const {
    outline: {
      course: { title, dates, description },
      sections,
    },
    subjectSearch,
    isSearching: isLoading,
  } = useContext(CourseOutlineContext);

  return (
    <Box p="2rem 0">
      {isLoading ? (
        <>
          <Skeleton height="40px" width="600px"></Skeleton>
          <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="3" />
        </>
      ) : (
        <>
          <Heading as="h3" size="lg">
            {title} {dates && "(" + dates + ")"}
          </Heading>
          <Text m="1rem 0" fontSize="1xl">
            {description}
          </Text>
          {sections?.map((section, i) => (
            <CourseSection key={i} section={section}></CourseSection>
          ))}
        </>
      )}
    </Box>
  );
};

export default CourseOutline;
