import { Box, Text } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import useStyles from "./hooks/useStyles";
import SignInButton from "../../components/SignInButton";
import { useSupabase } from "../../context/SupabaseContext";
import { Flex, Show, useColorModeValue } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar";
import { AccountAvatar } from "../../components/AccountAvatar";

const NavBar = () => {
  const { textStyles } = useStyles();
  const { isLoggedIn } = useSupabase();
  const bg = useColorModeValue("white", "black.900");
  const logo = useColorModeValue("owl-black.png", "owl-white.png");

  return (
    <Box bg={bg} as="nav" w="100%">
      <Flex alignItems="center" justifyContent="space-between" py={2} px={4}>
        <Flex alignItems="center">
          <SideNavBar />
          <a href="/">
            <Box display="flex" alignItems="center">
              <Box w={["30px", "30px", "30px"]}>
                <img src={"/" + logo} alt="logo" />
              </Box>
              <Show above="md">
                <Text {...textStyles} fontSize={["20px", "20px", "30px"]}>
                  CourseGen
                </Text>
              </Show>
            </Box>
          </a>
        </Flex>
        <Flex alignItems="center">
          <ColorModeSwitcher mr={[0, 2]} />
          <Show above="sm">
            {isLoggedIn ? <AccountAvatar /> : <SignInButton />}
          </Show>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
