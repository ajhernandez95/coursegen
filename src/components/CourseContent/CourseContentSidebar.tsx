import { Accordion, Box, Fade, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { MdKeyboardBackspace } from "react-icons/md";
import { useCourseContext } from "../../context/CourseContext";
import useColorModePresets from "../../hooks/useColorModePresets";
import SidebarItem from "./SidebarItem";

const CourseContentSidebar = () => {
  const { secondaryBgColor } = useColorModePresets();
  const [isOpen, setIsOpen] = useState(false);
  const { course, activeLesson } = useCourseContext();
  const { items } = course || {};
  const index = items?.findIndex((obj: any) => {
    return obj?.id === activeLesson?.id;
  });

  return (
    <Box
      pt="10px"
      minWidth={isOpen ? "314px" : "60px"}
      width={isOpen ? "314px" : "60px"}
      // bg={secondaryBgColor}
      // borderRight="1px solid #E2E8F0"
      transition="all 0.3s ease-out"
      height="100vh"
      top="0"
      position="sticky"
    >
      {!isOpen && (
        <Box pl="16px">
          <IconButton
            // size="lg"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Course Outline Sidebar"
            icon={<CiViewList size={30} />}
          />
        </Box>
      )}
      {isOpen && (
        <Box pl="16px">
          <IconButton
            variant="ghost"
            aria-label="go back"
            onClick={() => setIsOpen(!isOpen)}
            icon={<MdKeyboardBackspace size={30} />}
          />
          {items && (
            <Fade in={isOpen} delay={0.35}>
              <Accordion defaultIndex={index}>
                {items?.map((item: any, i: number) => {
                  return (
                    <SidebarItem key={i} item={item} showDescription={false} />
                  );
                })}
              </Accordion>
            </Fade>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CourseContentSidebar;
