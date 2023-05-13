import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const Root = () => {
  return (
    <Box overflow="auto">
      <Flex alignItems="center" h={["10vh", "8vh", "10vh"]} maxH="10vh">
        <NavBar />
      </Flex>
      <Box h={["92vh", "92vh", "90vh"]} maxH="90vh">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
