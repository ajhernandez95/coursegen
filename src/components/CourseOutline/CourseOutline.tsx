import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
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
  const myRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isLoading === false && courseId) {
      executeScroll();
    }
  }, [isLoading, courseId]);

  return isLoading || courseId ? (
    <Box pb={50}>
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="/dancing-owl.gif"
            style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          />
          <Text mt={5}>Generating Course Modules</Text>
        </Box>
      ) : (
        courseId && (
          <Box ref={myRef} textAlign={["center", "left"]}>
            <Box
              display="flex"
              justifyContent={["center", "space-between"]}
              flexWrap="wrap"
              gap={4}
            >
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
          </Box>
        )
      )}
    </Box>
  ) : null;
};

export default CourseOutline;
