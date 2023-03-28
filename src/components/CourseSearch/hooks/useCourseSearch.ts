import { CourseOutlineContext } from "./../../../context/CourseOutlineContext";
import { useContext } from "react";
import { SupabaseContext } from "./../../../context/SupabaseContext";
import { useToast } from "@chakra-ui/toast";

const useCourseSearch = () => {
  const { supabaseClient } = useContext(SupabaseContext);
  const { subjectSearch, proficiency, sectionCount } =
    useContext(CourseOutlineContext);
  const toast = useToast();

  const handleSearch = async () => {
    // toast({
    //   position: "bottom-left",
    //   render: () => (
    //     <Box color="white" p={3} bg="blue.500">
    //       Hello World
    //     </Box>
    //   ),
    // });
    const { data, error } = await supabaseClient.functions.invoke(
      "new_course",
      {
        body: {
          subject: subjectSearch,
          proficiency: proficiency,
          section_count: +sectionCount,
          max_tokens: 3000,
        },
      }
    );

    return {
      data,
      error,
    };
  };

  return {
    handleSearch,
  };
};

export default useCourseSearch;
