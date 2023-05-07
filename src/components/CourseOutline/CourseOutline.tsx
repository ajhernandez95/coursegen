import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button, Collapse, IconButton } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";
import { RefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CourseItems from "./CourseItems";
import { useCourseContext } from "../../context/CourseContext";

const CourseOutline = () => {
  const { course, isSearching: isLoading, copyCourseLink } = useCourseContext();
  const { id: courseId, title, dates, description, items } = course || {};
  const courseContainerRef = useRef<HTMLDivElement>(null);
  const courseTitleRef = useRef<HTMLDivElement>(null);

  const handleCopyCourseLink = () => copyCourseLink();

  const executeScroll = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isLoading) {
      executeScroll(courseContainerRef);
    } else if (isLoading === false && courseId) {
      executeScroll(courseTitleRef);
    }
  }, [isLoading, courseId]);

  return isLoading || courseId ? (
    <Box ref={courseContainerRef} pb={50}>
      {isLoading ? (
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
      ) : (
        courseId && (
          <>
            <Box
              display="flex"
              justifyContent={["center", "space-between"]}
              flexWrap="wrap"
              gap={4}
              ref={courseTitleRef}
            >
              <Heading as="h3" size="lg">
                {title} {dates && "(" + dates + ")"}
              </Heading>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={4}
              >
                <Link to={"/course/" + courseId}>
                  <Button>View Course</Button>
                </Link>
                <IconButton
                  aria-label="share course"
                  onClick={handleCopyCourseLink}
                  icon={<FiShare cursor="pointer" />}
                />
              </Box>
            </Box>
            <Text m="1rem 0" fontSize="1xl">
              {description}
            </Text>
            <CourseItems items={items}></CourseItems>
          </>
        )
      )}
    </Box>
  ) : null;
};

export default CourseOutline;
