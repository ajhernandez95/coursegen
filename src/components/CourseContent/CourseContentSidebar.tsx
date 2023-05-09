import { Box } from "@chakra-ui/layout";
import { useCourseContext } from "../../context/CourseContext";
import {
  Accordion,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  IconButton,
  Show,
  Text,
} from "@chakra-ui/react";
import { CiViewList } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import useColorModePresets from "../../hooks/useColorModePresets";
import SidebarItem from "./SidebarItem";

const CourseContentSidebar = () => {
  const { course, activeLesson } = useCourseContext();
  const { items } = course || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { drawerBg, floatingBtnBg } = useColorModePresets();
  const index = items?.findIndex((obj: any) => {
    return obj?.id === activeLesson?.id;
  });

  return (
    <Box>
      <Show above="sm">
        <Box position="sticky" top="10px" pl="10px">
          <IconButton
            bg={floatingBtnBg}
            size="lg"
            onClick={onOpen}
            aria-label="Search database"
            icon={<CiViewList size={35} />}
          />
        </Box>
      </Show>
      <Show below="sm">
        <Box position="fixed" bottom="10px" left="10px">
          <IconButton
            bg={floatingBtnBg}
            size="lg"
            onClick={onOpen}
            aria-label="Search database"
            icon={<CiViewList size={35} />}
          />
        </Box>
      </Show>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent background={drawerBg}>
          <DrawerHeader fontSize={["3xl"]} borderBottomWidth="1px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Lessons</Text>{" "}
              <IconButton
                variant="ghost"
                onClick={onClose}
                aria-label="Close drawer"
                icon={
                  <IoMdClose cursor="pointer" size={35} onClick={onClose} />
                }
              />
            </Box>
          </DrawerHeader>
          <DrawerBody>
            {items && (
              <Accordion defaultIndex={index}>
                {items?.map((item: any, i: number) => {
                  return (
                    <SidebarItem key={i} item={item} showDescription={false} />
                  );
                })}
              </Accordion>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default CourseContentSidebar;
