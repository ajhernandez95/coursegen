import { Box, Image, Spinner, Text } from "@chakra-ui/react";

const LoadingGif = ({ text }: { text?: string }) => {
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Spinner size={["lg", "xl"]} />
      {text && (
        <Text mt={5} textAlign="center">
          {text}
        </Text>
      )}
    </Box>
  );
};

export default LoadingGif;
