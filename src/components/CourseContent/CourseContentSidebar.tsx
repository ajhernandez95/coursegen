import { Box } from "@chakra-ui/layout";
import { useCourseContentContext } from "../../context/CourseContentContext";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  IconButton,
  Show,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import getContrastingTextColor from "../../util/getContrastingTextColors";
import useColorSchemes from "../../hooks/useColorSchemes";
import useCourseContent from "./hooks/useCourseContent";

const CourseContentSidebar = () => {
  const { course, activeSection } = useCourseContentContext();
  const { handleSetActiveLesson } = useCourseContent();
  const { sections } = course || {};
  const { colors: buttonColors } = useColorSchemes(sections);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBg = useColorModeValue("white", "#1A1C1E");
  const index = sections?.findIndex((obj: any) => {
    return obj?.id === activeSection?.id;
  });

  return (
    <Box>
      <Show above="sm">
        <Box position="sticky" ml="15px" top="30px" left="15px">
          <IconButton
            size="lg"
            onClick={onOpen}
            aria-label="Search database"
            icon={<HamburgerIcon boxSize={6} />}
          />
        </Box>
      </Show>
      <Show below="sm">
        <Box position="fixed" right="15px" bottom="10px">
          <IconButton
            size="lg"
            onClick={onOpen}
            aria-label="Search database"
            icon={<HamburgerIcon boxSize={6} />}
          />
        </Box>
      </Show>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerContent background={drawerBg}>
          <DrawerHeader fontSize={["3xl"]} borderBottomWidth="1px">
            Sections
          </DrawerHeader>
          <DrawerBody>
            {sections && (
              <Accordion defaultIndex={index}>
                {sections?.map((section: any, i: number) => {
                  return (
                    <AccordionItem key={i}>
                      <h2>
                        <AccordionButton
                          onClick={() => handleSetActiveLesson(section)}
                          _expanded={{
                            bg: buttonColors[i].bgColor,
                            color: getContrastingTextColor(
                              buttonColors[i].bgColor
                            ),
                          }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {section.title}
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        - Sub Section 1 {<br />}- Sub Section 2 {<br />}- Sub
                        Section 3
                      </AccordionPanel>
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
