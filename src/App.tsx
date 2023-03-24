import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import NavBar from "./layout/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LoginSignUp from "./components/LogInSignUp";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute component={Home} />,
  },
  { path: "/signup", element: <LoginSignUp startTab={1} /> },
  { path: "/login", element: <LoginSignUp /> },
]);

export const App = () => {
  return (
    <Box w="100%">
      <ChakraProvider theme={theme}>
        <NavBar />
        <RouterProvider router={router} />
      </ChakraProvider>
    </Box>
  );
};
