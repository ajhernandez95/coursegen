import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import CourseProficiency from "./CourseProficiency";
import CourseSectionCount from "./CourseSectionCount";

const CourseSearchConfig = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size="lg" onClick={onOpen}>
        Configure
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Configuration</DrawerHeader>
          <DrawerBody>
            <CourseProficiency></CourseProficiency>
            <CourseSectionCount></CourseSectionCount>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CourseSearchConfig;
