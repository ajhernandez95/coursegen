import { Dispatch, SetStateAction, useContext } from "react";
import { createContext, useState, ReactNode } from "react";

interface ICourseContentContext {
  courseIdParam: string;
  setCourseIdParam: Dispatch<SetStateAction<string>>;
  course: any;
  setCourse: Dispatch<SetStateAction<any>>;
  activeSection: any;
  setActiveSection: Dispatch<SetStateAction<any>>;
  clearCourseContentState: () => void;
}

const defaultCourseContentContext = {
  courseIdParam: "",
  setCourseIdParam: () => undefined,
  course: undefined,
  setCourse: () => undefined,
  activeSection: undefined,
  setActiveSection: () => undefined,
  clearCourseContentState: () => undefined,
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

  const clearCourseContentState = () => {
    setCourse(undefined);
    setActiveSection(undefined);
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
        clearCourseContentState,
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
