import { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext";
import { Box } from "@chakra-ui/react";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useSupabase();
  const location = useLocation();
  const addPathRedirect = () => {
    const url = new URL(location.pathname, window.location.href);
    if (url.pathname !== "/") {
      return `?pathRedirect=${url.pathname}`;
    }

    return "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !isLoggedIn ? (
    <Navigate to={"/login" + addPathRedirect()} replace={true} />
  ) : (
    <Box h="100%">{children}</Box>
  );
};
