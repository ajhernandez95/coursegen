import { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext";
import { Box } from "@chakra-ui/react";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useSupabase();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !isLoggedIn ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Box h="100%">{children}</Box>
  );
};
