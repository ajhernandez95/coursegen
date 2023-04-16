import { supabase } from "../../../util/supabase";
import { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCourseContent as useCourseContentHook } from "../../../context/CourseContentContext";
import { v4 as uuidv4 } from "uuid";

const useCourseContent = () => {
  const { courseIdParam, setCourse, setActiveSection } = useCourseContentHook();
  const { courseId } = useParams();

  const handleSection = useCallback(async () => {
    await supabase
      .from("course")
      .select(
        `
      *,
      sections: section (
        *
      )
      `
      )
      .eq("id", courseId)
      .then(async ({ data, error }) => {
        const sectionIndex = 0;
        if (data && data[0]) {
          setCourse(data[0]);
          if (data[0].sections && data[0].sections[sectionIndex]) {
            setActiveSection(data[0].sections[sectionIndex]);
            if (!data[0].sections[sectionIndex].content) {
              await supabase.functions
                .invoke("section_content", {
                  body: {
                    course_id: data[0].id,
                    section_id: data[0].sections[sectionIndex].id,
                    proficiency: "Beginner",
                    max_tokens: 2500,
                    session_key: uuidv4(),
                  },
                })
                .then(({ data: sectionData, error }) => {
                  if (sectionData.content) {
                    data[0].sections[sectionIndex].content =
                      sectionData.content;
                    setActiveSection(sectionData);
                    setCourse(data[0]);
                  }
                });
            }
          }
        }
      });
  }, []);

  return {
    handleSection,
  };
};

export default useCourseContent;
