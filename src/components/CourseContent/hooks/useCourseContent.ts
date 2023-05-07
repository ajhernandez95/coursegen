import { IFetchLessonContent } from "./../interfaces/courseContent";
import { supabase } from "../../../util/supabase";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../../../context/CourseContext";
import { v4 as uuidv4 } from "uuid";
import { ICourse, ICourseItem } from "../../../types/course";
import { getCourse, lessonContent } from "../../../services/edgeFunctions";

const useCourseContent = () => {
  const { courseId } = useParams();
  const {
    clearCourseContentState,
    setCourse,
    setActiveSection,
    setIsFetchingCourse,
    setIsFetchingLesson,
  } = useCourseContext();

  const handleGetLesson = useCallback(
    async ({ courseId, lessonId }: { courseId: any; lessonId: any }) => {
      return await supabase.functions
        .invoke(lessonContent.v1, {
          body: {
            lesson_id: lessonId,
            course_id: courseId,
            session_key: uuidv4(),
          } as IFetchLessonContent,
        })
        .then(({ data: lessonData }) => {
          setIsFetchingLesson(false);
          return lessonData;
        });
    },
    []
  );

  const handleGetCourse = useCallback(async () => {
    try {
      setIsFetchingCourse(true);
      clearCourseContentState();

      const { data, error } = await supabase.functions.invoke(getCourse.v1, {
        body: { course_id: courseId },
      });

      if (error) {
        return Promise.reject(error);
      }

      setCourse(data);
    } finally {
      setIsFetchingCourse(false);
    }
  }, [courseId]);

  const handleSetActiveLesson = useCallback(
    async (courseId: string, lesson: ICourseItem) => {
      if (lesson) {
        setActiveSection(lesson);
        if (!lesson.topics?.length) {
          setIsFetchingLesson(true);
          const res = await handleGetLesson({
            courseId: courseId,
            lessonId: lesson.id,
          });

          if (res) {
            setCourse((prev: ICourse) => {
              const newList = [...prev.items];
              newList.splice(
                prev.items.findIndex(
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
            setActiveSection(lesson);
          }
          setIsFetchingLesson(true);
        }
      }
    },
    [setActiveSection, handleGetLesson, setCourse]
  );

  return {
    handleGetCourse,
    handleGetLesson,
    handleSetActiveLesson,
  };
};

export default useCourseContent;
