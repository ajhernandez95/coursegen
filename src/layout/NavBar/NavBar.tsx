import { Box, Text } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import useStyles from "./hooks/useStyles";
import SignOutButton from "../../components/SignOutButton";
import SignInButton from "../../components/SignInButton";
import { useSupabase } from "../../context/SupabaseContext";
import { Flex, Show, TextProps, useColorModeValue } from "@chakra-ui/react";

const NavBar = () => {
  const { textStyles } = useStyles();
  const { isLoggedIn } = useSupabase();
  const bg = useColorModeValue("white", "black.900");
  const logo = useColorModeValue("owl-black.png", "owl-white.png");

  return (
    <Box bg={bg} as="nav" top="0" w="100%">
      {/** @ts-ignore */}
      <Flex alignItems="center" justifyContent="space-between" py={4} px={6}>
        <a href="/">
          <Box display="flex" alignItems="center">
            <Box w={30} h={30}>
              <img src={"/" + logo} alt="logo" />
            </Box>
            {/** @ts-ignore */}
            <Show above="sm">
              <Text {...(textStyles as TextProps)}>CourseGen</Text>
            </Show>
          </Box>
        </a>
        <Box>
          <ColorModeSwitcher mr={[0, 2]} />
          <Show above="sm">
            {isLoggedIn ? <SignOutButton /> : <SignInButton />}
          </Show>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
