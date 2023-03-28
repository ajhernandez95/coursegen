import { Box, Button, Text } from "@chakra-ui/react";
import useCourseProficiency from "./hooks/useCourseProficiency";

const CourseProficiency = () => {
  const { profiencies, handleProficiency } = useCourseProficiency();

  return (
    <Box mb={2}>
      <Text as="b" fontSize="lg">
        Proficiency
        <br />
      </Text>
      {Object.entries(profiencies).map(([proficiency, variant]) => {
        return (
          <Button
            key={proficiency}
            onClick={() => handleProficiency({ proficiency, variant })}
            variant={variant}
            colorScheme="blue"
          >
            {proficiency}
          </Button>
        );
      })}
    </Box>
  );
};

export default CourseProficiency;
