import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button, Collapse, IconButton } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";
import { RefObject, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CourseItems from "./CourseItems";
import { useCourseContext } from "../../context/CourseContext";
import { useQueryClient } from "@tanstack/react-query";
import { MdKeyboardBackspace } from "react-icons/md";

const CourseOutline = () => {
  const { course, copyCourseLink, search } = useCourseContext();
  const { id: courseId, title, dates, description, items } = course || {};
  const courseContainerRef = useRef<HTMLDivElement>(null);
  const courseTitleRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const handleCopyCourseLink = () => copyCourseLink();

  const executeScroll = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (courseId) {
      executeScroll(courseTitleRef);
    }
  }, [courseId]);

  return courseId ? (
    <Box ref={courseContainerRef}>
      <IconButton
        mb={3}
        aria-label="go back"
        size="lg"
        paddingX="20px"
        onClick={() => queryClient.resetQueries(["courseSearch", search])}
        icon={<MdKeyboardBackspace />}
      />
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
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
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
  ) : null;
};

export default CourseOutline;
