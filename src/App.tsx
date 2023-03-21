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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
]);

export const App = () => {
  // useSupabaseClient();
  return (
    <Box w="100%">
      <ChakraProvider theme={theme}>
        <NavBar />
        <RouterProvider router={router} />
      </ChakraProvider>
    </Box>
  );
};
