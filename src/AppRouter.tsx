import { Box } from "@chakra-ui/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const AppRouter = () => {
  return (
    <Box h="91%">
      <Router>
        <Routes>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default AppRouter;
