import { useForm } from "react-hook-form";
import { Box, Text, Input } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import useStyles from "./hooks/useStyles";
import { useContext } from "react";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";

const CourseSearch = () => {
  const { boxContainer } = useStyles();
  const { handleSearch } = useCourseSearch();
  const { setOutline } = useContext(CourseOutlineContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async () => {
    // Update the below destructure to access data.course and data.sections once Cole updates capatalization of each
    const {
      data: { Course: course, Sections: sections },
      error,
    } = await handleSearch({
      query: watch("subjectSearch"),
    });
    setOutline({ course, sections });
  };

  return (
    <Box {...boxContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="3xl">What would you like to learn?</Text>
        <Input {...register("subjectSearch")}></Input>
      </form>
    </Box>
  );
};

export default CourseSearch;
