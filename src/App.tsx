import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import LoginSignUp from "./components/LogInSignUp";
import CourseContent from "./components/CourseContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CourseContextProvider } from "./context/CourseContext";
import customTheme from "./util/customChakraTheme";
import Root from "./components/Root";
import MyCourses from "./components/MyCourses";
import AboutUs from "./components/AboutUs";
import ProtectedRoute from "./components/ProtectedRoute";

export const routes = [
  {
    path: "search",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "my-courses",
    element: (
      <ProtectedRoute>
        <MyCourses />
      </ProtectedRoute>
    ),
  },
  {
    path: "about-us",
    element: (
      <ProtectedRoute>
        <AboutUs />
      </ProtectedRoute>
    ),
  },
  {
    path: "course/:courseId",
    element: (
      <ProtectedRoute>
        <CourseContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <LoginSignUp />,
  },
  {
    path: "signup",
    element: <LoginSignUp startTab={1} />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // The following route to handle redirection from the root path
        index: true,
        element: <Navigate to="/search" replace />,
      },
      ...routes,
    ],
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
      <ReactQueryDevtools initialIsOpen={false} />
      <CourseContextProvider>
        <Box>
          <ChakraProvider theme={customTheme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </Box>
      </CourseContextProvider>
    </QueryClientProvider>
  );
};
