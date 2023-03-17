import { Text } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Text fontSize="1xl">
        <Link to="signup">Sign Up</Link>
      </Text>
    </div>
  );
};

export default Home;
