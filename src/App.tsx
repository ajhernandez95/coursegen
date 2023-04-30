import { ChakraProvider, Box, theme, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Home from "./components/Home";
import LoginSignUp from "./components/LogInSignUp";
import CourseContent from "./components/CourseContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { CourseContextProvider } from "./context/CourseContext";
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
      <CourseContextProvider>
        <Box height="100vh">
          <ChakraProvider theme={customTheme}>
            <NavBar />
            <RouterProvider router={router} />
          </ChakraProvider>
        </Box>
      </CourseContextProvider>
    </QueryClientProvider>
  );
};
