import { NumberInput, NumberInputField, Text, Box } from "@chakra-ui/react";
import { defaultSectionCount } from "../../constants/course";
import useCourseSectionCount from "./hooks/useCourseSectionCount";

const CourseSectionCount = () => {
  const { sectionCount, handleChange } = useCourseSectionCount();
  return (
    <Box mb={2}>
      <Text as="b" fontSize="lg">
        Sections
        <br />
      </Text>
      <NumberInput
        onChange={(value) => {
          handleChange({ newCount: value });
        }}
        size="md"
        maxW={20}
        min={3}
        defaultValue={defaultSectionCount}
      >
        <NumberInputField />
      </NumberInput>
    </Box>
  );
};

export default CourseSectionCount;
