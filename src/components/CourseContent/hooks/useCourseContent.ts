import { supabase } from "../../../util/supabase";
import { useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContentContext } from "../../../context/CourseContentContext";
import { v4 as uuidv4 } from "uuid";

const useCourseContent = () => {
  const { courseId } = useParams();
  const { clearCourseContentState, setCourse, setActiveSection } =
    useCourseContentContext();
  const [isFetchingCourse, setIsFetchingCourse] = useState(false);
  const [isFetchingLesson, setIsFetchingLesson] = useState(false);

  const handleGetLesson = useCallback(
    async ({ courseId, sectionId }: { courseId: any; sectionId: any }) => {
      setIsFetchingLesson(true);
      return await supabase.functions
        .invoke("section_content", {
          body: {
            course_id: courseId,
            section_id: sectionId,
            proficiency: "Beginner",
            max_tokens: 2500,
            session_key: uuidv4(),
          },
        })
        .then(({ data: lessonData }) => {
          // setIsFetchingLesson(false);
          return lessonData;
        });
    },
    []
  );

  const handleGetCourse = useCallback(async () => {
    setIsFetchingCourse(true);
    clearCourseContentState();

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
      .then(async ({ data }) => {
        if (data && data[0]) {
          setCourse(data[0]);
          const sectionIndex = 0;

          if (data[0].sections && data[0].sections[sectionIndex]) {
            setActiveSection(data[0].sections[sectionIndex]);

            if (!data[0].sections[sectionIndex].content) {
              handleGetLesson({
                courseId: data[0].id,
                sectionId: data[0].sections[sectionIndex].id,
              }).then((res) => {
                if (res) {
                  setCourse((prev: any) => {
                    const newList = [...prev.sections];
                    newList.splice(sectionIndex, 1, res);
                    return {
                      ...prev,
                      sections: newList,
                    };
                  });
                  setActiveSection(res);
                }
              });
            }
          }
          setIsFetchingCourse(false);
        }
      });
  }, [setIsFetchingCourse, setCourse, setActiveSection, handleGetLesson]);

  const handleSetActiveLesson = useCallback(
    async (lesson: any) => {
      setIsFetchingLesson(true);
      if (lesson) {
        if (!lesson.content) {
          setIsFetchingLesson(true);
          const res = await handleGetLesson({
            courseId: lesson.course_id,
            sectionId: lesson.id,
          });

          if (res) {
            setCourse((prev: any) => {
              const newList = [...prev.sections];
              newList.splice(
                prev.sections.findIndex(
                  (section: any) => section.id === lesson.id
                ),
                1,
                res
              );
              return {
                ...prev,
                sections: newList,
              };
            });
            lesson = res;
          }
        }
        setActiveSection(lesson);
      }
    },
    [setActiveSection, handleGetLesson, setCourse]
  );

  return {
    handleGetCourse,
    handleGetLesson,
    handleSetActiveLesson,
    isFetchingCourse,
    isFetchingLesson,
  };
};

export default useCourseContent;
