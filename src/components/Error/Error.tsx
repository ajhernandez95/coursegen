import { useToast } from "@chakra-ui/react";

interface ErrorProps {
  msg?: string;
  duration?: number;
  isClosable?: boolean;
}

const Error = ({
  msg = "An error occurred. Please try again later.",
  duration = Infinity,
  isClosable = true,
}: ErrorProps) => {
  const toast = useToast();
  toast({
    description: msg,
    status: "error",
    duration,
    isClosable,
  });
};

export default Error;
