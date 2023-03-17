import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { useSupabaseClient } from "./hooks/useSupabaseClient";
import AppRouter from "./AppRouter";
import NavBar from "./layout/NavBar";

export const App = () => {
  // useSupabaseClient();
  return (
    <Box w="100%">
      <ChakraProvider theme={theme}>
        <NavBar />
        <AppRouter />
      </ChakraProvider>
    </Box>
  );
};
