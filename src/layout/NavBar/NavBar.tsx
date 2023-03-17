import { Box, Text } from "@chakra-ui/layout";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import useStyles from "./hooks/useStyles";

const NavBar = () => {
  const { navbarStyles, textStyles } = useStyles();
  return (
    <Box {...navbarStyles}>
      <Text {...textStyles}>CourseGen</Text>
      <ColorModeSwitcher />
    </Box>
  );
};

export default NavBar;
