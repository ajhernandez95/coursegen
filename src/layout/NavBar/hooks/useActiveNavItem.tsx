import { matchRoutes, useLocation } from "react-router-dom";
import { routes } from "../../../App";

const useActivePath = () => {
  const location = useLocation();
  const path = matchRoutes(routes, location)?.[0]?.route?.path;

  return path;
};

export default useActivePath;
