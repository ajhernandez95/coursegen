import { Box, Image, Text } from "@chakra-ui/react";

const LoadingGif = ({ text }: { text?: string }) => {
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Image
        src="/dancing-owl.gif"
        borderRadius="50%"
        width={["100px", "100px", "200px"]}
        height={["100px", "100px", "200px"]}
      />
      {text && (
        <Text mt={5} textAlign="center">
          {text}
        </Text>
      )}
    </Box>
  );
};

export default LoadingGif;
