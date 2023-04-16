import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Text, Input, Button, Heading } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import useStyles from "./hooks/useStyles";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import { useQuery } from "react-query";
import CourseProficiency from "./CourseProficiency";
import CourseSectionCount from "./CourseSectionCount";

const CourseSearch = () => {
  const { handleSearch } = useCourseSearch();
  const { setOutline, setSubjectSearch, setIsSearching } =
    useContext(CourseOutlineContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const subjectSearch = watch("subjectSearch");
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["courseSearch", subjectSearch],
    () => handleSearch(),
    {
      enabled: false,
      onSuccess: ({ data: { Course: course, Sections: sections } }) => {
        setOutline({ course, sections });
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
    setSubjectSearch(subjectSearch);
  }, [subjectSearch]);

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
            {...register("subjectSearch")}
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
