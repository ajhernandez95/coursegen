import { useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { defaultSupabaseContext } from "../../constants/supabase";
import { SupabaseContext } from "../../context/SupabaseContext";
import useStyles from "./hooks/useStyles";
import SignOutButton from "../../components/SignOutButton";
import SignInButton from "../../components/SignInButton";

const NavBar = () => {
  const { navbarStyles, textStyles } = useStyles();
  const { isLoggedIn } = useContext(SupabaseContext) ?? defaultSupabaseContext;

  return (
    <Box {...navbarStyles}>
      <Box display="flex" alignItems="center">
        <Text {...textStyles}>CourseGen</Text>
        <ColorModeSwitcher />
      </Box>
      {isLoggedIn ? <SignOutButton /> : <SignInButton />}
    </Box>
  );
};

export default NavBar;
