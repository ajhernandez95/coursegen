import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const Root = () => {
  return (
    <Box overflow="auto">
      <Box h="10vh" maxH="10vh">
        <NavBar />
      </Box>
      <Box h="90vh" maxH="90vh">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
