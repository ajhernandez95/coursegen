import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext";
import NavBar from "../../layout/NavBar";
import { GenerationStatus } from "../GenerationStatus";

const Root = () => {
  const { isLoggedIn } = useSupabase();
  return (
    <Box overflow="auto">
      <Flex height="10vh" minHeight="50px" maxHeight="70px" alignItems="center">
        <NavBar />
      </Flex>
      <Box minHeight="90vh">
        <Outlet />
        {isLoggedIn && <GenerationStatus />}
      </Box>
    </Box>
  );
};

export default Root;
