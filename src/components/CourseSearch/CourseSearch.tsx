import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Heading } from "@chakra-ui/react";
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
    <Box mb={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={6} size={["2xl", "3xl", "4xl"]} textAlign="center">
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
            maxW={900}
            mt={4}
            placeholder="e.g., Introduction to Programming, History of Human Civilization"
            {...register("search")}
          ></Input>
          <Button size="lg" mt={5} type="submit">
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseSearch;
