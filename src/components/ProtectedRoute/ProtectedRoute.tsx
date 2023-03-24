import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { defaultSupabaseContext } from "../../constants/supabase";
import { SupabaseContext } from "../../context/SupabaseContext";

interface ProtectedRouteProps {
  component: FC;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { isLoggedIn } = useContext(SupabaseContext) ?? defaultSupabaseContext;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
