import { IFetchLessonContent } from "./../interfaces/courseContent";
import { supabase } from "../../../util/supabase";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../../../context/CourseContext";
import { v4 as uuidv4 } from "uuid";
import { CourseItemType, ICourse, ICourseItem } from "../../../types/course";
import { getCourse, lessonContent } from "../../../services/edgeFunctions";
import { findFirstLesson } from "../util/courseContentHelpers";

const useCourseContent = () => {
  const { courseId } = useParams();
  const {
    clearCourseContentState,
    setCourse,
    setActiveSection,
    setActiveTopics,
    setIsFetchingCourse,
    setIsFetchingLesson,
    setIsFetchingTopics,
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

  const handleGetCourse = useCallback(
    async ({ setFirstLesson }: { setFirstLesson?: boolean }) => {
      try {
        if (!courseId) return Promise.reject("No course id provided");
        setIsFetchingCourse(true);
        clearCourseContentState();

        const { data, error } = await supabase.functions.invoke(getCourse.v1, {
          body: { course_id: courseId },
        });

        if (error) {
          return Promise.reject(error);
        }

        setCourse(data);
        if (setFirstLesson) {
          const firstLesson = findFirstLesson({ items: data.items });
          const { data: topics } = await supabase
            .from("topic")
            .select("*")
            .eq("lesson_id", firstLesson.id)
            .order("order_index", { ascending: true });

          if (!topics?.length) {
            const topics = await generateTopics({
              courseId: courseId,
              lessonId: firstLesson.id,
            });
            setActiveTopics(topics);
          } else {
            setActiveTopics(topics);
          }

          setActiveSection(firstLesson);
        }

        return data;
      } finally {
        setIsFetchingCourse(false);
      }
    },
    [courseId]
  );

  const generateTopics = useCallback(
    async ({ lessonId, courseId }: { lessonId: string; courseId: string }) => {
      setIsFetchingTopics(true);
      try {
        const { data, error } = await supabase.functions.invoke(
          lessonContent.v2,
          {
            body: {
              lesson_id: lessonId,
              course_id: courseId,
              session_key: uuidv4(),
            },
          }
        );

        console.log(data, error);
        if (error) {
          return Promise.reject(error);
        }

        return data;
      } finally {
        setIsFetchingTopics(false);
      }
    },
    []
  );

  // Query for lesson content, if content does not exist then generate it.
  const handleSetActiveLesson = useCallback(
    async (courseId: string, lesson: ICourseItem<CourseItemType.LESSON>) => {
      if (lesson) {
        setActiveSection(lesson);
        if (!lesson.topics?.length) {
          setIsFetchingLesson(true);
          const res = await handleGetLesson({
            courseId: courseId,
            lessonId: lesson.id,
          });

          if (res) {
            setCourse(
              (
                prev: ICourse<CourseItemType.LESSON | CourseItemType.MODULE>
              ) => {
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
              }
            );
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
