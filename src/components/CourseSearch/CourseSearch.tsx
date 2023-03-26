import { useForm } from "react-hook-form";
import { Box, Text, Input } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import useStyles from "./hooks/useStyles";

const CourseSearch = () => {
  const { boxContainer, formContainer } = useStyles();
  const { handleSearch } = useCourseSearch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = () => handleSearch({ query: watch("subjectSearch") });
  return (
    <Box {...boxContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="1xl">What would you like to learn?</Text>
        <Input {...register("subjectSearch")}></Input>
      </form>
    </Box>
  );
};

export default CourseSearch;
