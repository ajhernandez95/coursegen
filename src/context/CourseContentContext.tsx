import { Dispatch, SetStateAction, useContext } from "react";
import { createContext, useState, ReactNode } from "react";

interface ICourseContentContext {
  courseIdParam: string;
  setCourseIdParam: Dispatch<SetStateAction<string>>;
  course: any;
  setCourse: Dispatch<SetStateAction<any>>;
  activeSection: any;
  setActiveSection: Dispatch<SetStateAction<any>>;
  isFetchingCourse: boolean;
  setIsFetchingCourse: Dispatch<SetStateAction<boolean>>;
  isFetchingLesson: boolean;
  setIsFetchingLesson: Dispatch<SetStateAction<boolean>>;
  clearCourseContentState: () => void;
  copyCourseLink: () => void;
}

const defaultCourseContentContext = {
  courseIdParam: "",
  setCourseIdParam: () => undefined,
  course: undefined,
  setCourse: () => undefined,
  activeSection: undefined,
  setActiveSection: () => undefined,
  isFetchingCourse: false,
  setIsFetchingCourse: () => undefined,
  isFetchingLesson: false,
  setIsFetchingLesson: () => undefined,
  clearCourseContentState: () => undefined,
  copyCourseLink: () => undefined,
};

export const CourseContentContext = createContext<ICourseContentContext>(
  defaultCourseContentContext
);

export const CourseContentContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [courseIdParam, setCourseIdParam] = useState<any>();
  const [course, setCourse] = useState<any>();
  const [activeSection, setActiveSection] = useState<any>();
  const [isFetchingCourse, setIsFetchingCourse] = useState(false);
  const [isFetchingLesson, setIsFetchingLesson] = useState(false);

  const clearCourseContentState = () => {
    setCourse(undefined);
    setActiveSection(undefined);
  };

  const copyCourseLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/course/${courseIdParam}`
    );
  };
  return (
    <CourseContentContext.Provider
      value={{
        courseIdParam,
        setCourseIdParam,
        course,
        setCourse,
        activeSection,
        setActiveSection,
        isFetchingCourse,
        setIsFetchingCourse,
        isFetchingLesson,
        setIsFetchingLesson,
        clearCourseContentState,
        copyCourseLink,
      }}
    >
      {children}
    </CourseContentContext.Provider>
  );
};

export const useCourseContentContext = () => {
  const context = useContext(CourseContentContext);
  if (!context) {
    throw new Error(
      "useCourseContent must be used within an CourseContentProvider"
    );
  }
  return context;
};
