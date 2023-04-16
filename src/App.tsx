import { ChakraProvider, Box, theme, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./components/Home";
import LoginSignUp from "./components/LogInSignUp";
import CourseContent from "./components/CourseContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { CourseOutlineContextProvider } from "./context/CourseOutlineContext";
import { CourseContentContextProvider } from "./context/CourseContentContext";
import ProtectedRoute from "./components/ProtectedRoute";
import customTheme from "./util/customChakraTheme";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/course/:courseId",
    element: (
      <ProtectedRoute>
        <CourseContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginSignUp />,
  },
  {
    path: "/signup",
    element: <LoginSignUp startTab={1} />,
  },
]);

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CourseOutlineContextProvider>
        <CourseContentContextProvider>
          <Box
            position="fixed"
            top="0"
            left="0"
            height="100%"
            width="100%"
            overflow="auto"
          >
            <ChakraProvider theme={customTheme}>
              <NavBar />
              <RouterProvider router={router} />
            </ChakraProvider>
          </Box>
        </CourseContentContextProvider>
      </CourseOutlineContextProvider>
    </QueryClientProvider>
  );
};
