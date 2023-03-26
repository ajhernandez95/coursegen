import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { SupabaseContext } from "../../context/SupabaseContext";

interface ProtectedRouteProps {
  component: FC;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { isLoggedIn } = useContext(SupabaseContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
