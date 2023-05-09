import { IFetchLessonContent } from "./../interfaces/courseContent";
import { supabase } from "../../../util/supabase";
import { useCallback } from "react";
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
    setActiveLesson,
    setActiveTopics,
    setIsFetchingCourse,
    setIsFetchingLesson,
    setIsFetchingTopics,
  } = useCourseContext();

  const getTopics = async (courseId: string, lessonId: string) => {
    let topics;
    const { data } = await supabase
      .from("topic")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true });

    topics = data;
    if (!topics?.length) {
      topics = await generateTopics({
        courseId,
        lessonId,
      });
    }

    return topics;
  };

  const handleGetLesson = useCallback(
    async ({ courseId, lessonId }: { courseId: any; lessonId: any }) => {
      return await supabase.functions
        .invoke(lessonContent.v2, {
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
          setActiveLesson(firstLesson);
          const topics = await getTopics(courseId, firstLesson.id);
          setActiveTopics(topics);
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

  const handleSetActiveLesson = useCallback(
    async (courseId: string, lesson: ICourseItem<CourseItemType.LESSON>) => {
      try {
        if (lesson) {
          setActiveLesson(lesson);
          if (!lesson.topics?.length) {
            setIsFetchingLesson(true);
            const topics = await getTopics(courseId, lesson.id);
            setActiveTopics(topics);
          }
        }
      } finally {
        setIsFetchingLesson(false);
      }
    },
    [setActiveLesson, handleGetLesson, setCourse]
  );

  return {
    handleGetCourse,
    handleGetLesson,
    handleSetActiveLesson,
  };
};

export default useCourseContent;
