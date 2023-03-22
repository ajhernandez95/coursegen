import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignInButton = () => {
  return (
    <a href="/login">
      <Button>Log In</Button>
    </a>
  );
};

export default SignInButton;
