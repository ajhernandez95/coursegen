import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../layout/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
