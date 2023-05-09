import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import useColorModePresets from "../../hooks/useColorModePresets";
import useActivePath from "./hooks/useActiveNavItem";
import pathPatternMapper from "./util/pathPatternMapper";
import { Link } from "react-router-dom";
import SignInButton from "../../components/SignInButton";

const SideNavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { drawerBg, activeBg } = useColorModePresets();
  const activePath = useActivePath();

  return (
    <>
      <Flex alignItems="center" mr="20px">
        <IconButton
          aria-label="side-navigation"
          onClick={onOpen}
          icon={<GiHamburgerMenu size="25px" />}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent background={drawerBg}>
          <DrawerCloseButton />
          <DrawerHeader>CourseGen</DrawerHeader>
          <DrawerBody>
            <Flex justifyContent="center">
              <SignInButton />
            </Flex>
            {pathPatternMapper.map(([path, name]) => (
              <Link key={path} to={path}>
                <Box
                  key={path}
                  cursor="pointer"
                  p="10px"
                  bg={`/${activePath}` === path ? activeBg : "initial"}
                  _hover={{ bg: activeBg }}
                >
                  {name}
                </Box>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNavBar;
