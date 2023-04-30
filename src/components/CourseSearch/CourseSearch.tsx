import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Heading } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import { useQuery } from "react-query";
import handleSupabaseResponse from "../../util/handleSupabaseResponse";
import { useCourseContext } from "../../context/CourseContext";

const CourseSearch = () => {
  const { handleSearch } = useCourseSearch();
  const { setCourse, setSearch, setIsSearching } = useCourseContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const search = watch("search");
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["courseSearch", search],
    () => handleSearch(),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log(response);
        const parsedRes = handleSupabaseResponse(response);
        console.log(parsedRes);
        if (parsedRes.isSuccess) {
          setCourse(parsedRes);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        setIsSearching(false);
      },
    }
  );

  const onSubmit = () => {
    if (!isFetching) {
      refetch();
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <Box mb={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Box display="flex" justifyContent="space-between">
          <CourseProficiency />
          <CourseSectionCount />
        </Box> */}
        {/* @ts-ignore */}
        <Heading mb={6} size={["lg", "3xl", "4xl"]} textAlign="center">
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
