import { useForm } from "react-hook-form";
import { Box, Text, Input, Button, Spinner } from "@chakra-ui/react";
import useCourseSearch from "./hooks/useCourseSearch";
import useStyles from "./hooks/useStyles";
import { useContext, useEffect, useState } from "react";
import { CourseOutlineContext } from "../../context/CourseOutlineContext";
import { useQuery } from "react-query";
import React from "react";

const CourseSearch = () => {
  const { boxContainer } = useStyles();
  const { handleSearch } = useCourseSearch();
  const { setOutline, setSubjectSearch, setIsSearching } =
    useContext(CourseOutlineContext);
  const [shouldSearch, setShouldSearch] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const subjectSearch = watch("subjectSearch");
  const { data, isLoading, isFetching } = useQuery(
    ["courseSearch", subjectSearch],
    () => handleSearch({ query: subjectSearch }),
    {
      enabled: shouldSearch,
      onSuccess: ({ data: { Course: course, Sections: sections } }) => {
        console.log(data);
        setShouldSearch(false);
        setOutline({ course, sections });
        setIsSearching(false);
      },
    }
  );

  const onSubmit = () => {
    if (!isFetching) {
      setShouldSearch(true);
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setSubjectSearch(subjectSearch);
  }, [subjectSearch]);

  return (
    <Box {...boxContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
