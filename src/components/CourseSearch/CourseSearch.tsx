import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import useStyles from "./hooks/useStyles";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import { useQuery } from "react-query";
import CourseProficiency from "./CourseProficiency";
import CourseSectionCount from "./CourseSectionCount";

const CourseSearch = () => {
  const { boxContainer } = useStyles();
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
    console.log(isFetching);
    if (!isFetching) {
      refetch();
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setSubjectSearch(subjectSearch);
  }, [subjectSearch]);

  return (
    <Box {...boxContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="space-between">
          <CourseProficiency></CourseProficiency>
          <CourseSectionCount></CourseSectionCount>
        </Box>
        <Text fontSize="3xl">What would you like to learn?</Text>
        <Box display="flex" gap={2}>
          <Input {...register("subjectSearch")}></Input>{" "}
          <Button type="submit">Search</Button>
        </Box>
      </form>
    </Box>
  );
};

export default CourseSearch;
