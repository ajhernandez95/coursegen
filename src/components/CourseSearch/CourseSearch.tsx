import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Heading, useMediaQuery } from "@chakra-ui/react";
import { useCourseContext } from "../../context/CourseContext";
import useCourseSearchQuery from "./hooks/useCourseSearchQuery";

const CourseSearch = () => {
  const { setSearch, setIsSearching } = useCourseContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const search = watch("search");
  const { isFetching, refetch } = useCourseSearchQuery(search);

  const onSubmit = () => {
    if (!isFetching) {
      refetch({ throwOnError: true });
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <Box display="flex" justifyContent="center" mb={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size={["lg", "2xl", "3xl"]} mb="40px" textAlign="center">
          I'm CourseGen, an AI powered course generator.
        </Heading>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Input
            size={["sm", "md", "lg"]}
            w="100%"
            mb="20px"
            maxW={900}
            placeholder="e.g., Introduction to Programming, History of Human Civilization"
            {...register("search")}
          ></Input>
          <Button size={["md", "md", "lg"]} type="submit">
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseSearch;
