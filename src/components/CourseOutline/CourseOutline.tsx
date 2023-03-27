import { Box, Heading, Text } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import CourseSection from "./CourseSection";

const CourseOutline = () => {
  // const { title, dates, description, sections } = course;
  const {
    outline: {
      course: { title, dates, description },
      sections,
    },
  } = useContext(CourseOutlineContext);

  useEffect(() => {}, [title, dates, description]);
  return (
    <Box p="2rem 0">
      <Heading as="h3" size="lg">
        {title} {dates && "(" + dates + ")"}
      </Heading>
      <Text m="1rem 0" fontSize="1xl">
        {description}
      </Text>
      {sections?.map((section, i) => (
        <CourseSection key={i} section={section}></CourseSection>
      ))}
    </Box>
  );
};

export default CourseOutline;
