import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";
import { RefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CourseItems from "./CourseItems";
import { useCourseContext } from "../../context/CourseContext";

const CourseOutline = () => {
  const {
    course: { id: courseId, title, dates, description, items },
    isSearching: isLoading,
    copyCourseLink,
  } = useCourseContext();
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
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="/dancing-owl.gif"
            style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          />
          <Text mt={5}>Generating Course</Text>
        </Box>
      ) : (
        courseId && (
          <Box textAlign={["center", "left"]}>
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
          </Box>
        )
      )}
    </Box>
  ) : null;
};

export default CourseOutline;
