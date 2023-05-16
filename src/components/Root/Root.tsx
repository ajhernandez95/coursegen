import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const Root = () => {
  return (
    <Box overflow="auto">
      <Flex height="10vh" minHeight="50px" maxHeight="70px" alignItems="center">
        <NavBar />
      </Flex>
      <Box minHeight="90vh">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
