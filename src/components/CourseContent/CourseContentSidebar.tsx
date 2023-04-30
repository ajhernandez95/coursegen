import { Box } from "@chakra-ui/layout";
import { useCourseContext } from "../../context/CourseContext";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  IconButton,
  Show,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { CiViewList } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import useCourseContent from "./hooks/useCourseContent";

const CourseContentSidebar = () => {
  const { course, activeSection } = useCourseContext();
  const { handleSetActiveLesson } = useCourseContent();
  const { items } = course || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBg = useColorModeValue("white", "#1A1C1E");
  const floatingBtnBg = useColorModeValue("#EDF2F7", "#2C2D2E");
  const activeModuleBg = useColorModeValue("#EDF2F7", "#2C2D2E");
  const index = items?.findIndex((obj: any) => {
    return obj?.id === activeSection?.id;
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
                    <AccordionItem key={i}>
                      <h2>
                        <AccordionButton
                          onClick={() => handleSetActiveLesson(item)}
                          _expanded={{
                            bg: activeModuleBg,
                          }}
                          _hover={{
                            bg: activeModuleBg,
                          }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {item.title}
                          </Box>
                        </AccordionButton>
                      </h2>
                    </AccordionItem>
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
