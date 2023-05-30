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

const CourseContentSidebarMobile = () => {
  const { course, activeLesson } = useCourseContext();
  const { items } = course || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { primaryBgColor, altBtnBg, altBtnColor } = useColorModePresets();
  const index = items?.findIndex((obj: any) => {
    return obj?.id === activeLesson?.id;
  });

  return (
    <>
      <Box position="fixed" bottom="10px" right="10px">
        <IconButton
          color={altBtnColor}
          bg={altBtnBg}
          _hover={{ bg: altBtnBg, color: altBtnColor }}
          size="lg"
          onClick={onOpen}
          aria-label="Search database"
          icon={<CiViewList size={35} />}
        />
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent background={primaryBgColor}>
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
    </>
  );
};
export default CourseContentSidebarMobile;
