import { Box } from "@chakra-ui/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const AppRouter = () => {
  return (
    <Box h="91%" padding="0 20px">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default AppRouter;
