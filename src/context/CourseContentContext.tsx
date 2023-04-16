import { Dispatch, SetStateAction, useContext } from "react";
import { createContext, useState, ReactNode } from "react";

interface ICourseContentContext {
  courseIdParam: string;
  setCourseIdParam: Dispatch<SetStateAction<string>>;
  course: any;
  setCourse: Dispatch<SetStateAction<any>>;
  activeSection: any;
  setActiveSection: Dispatch<SetStateAction<any>>;
}

const defaultCourseContentContext = {
  courseIdParam: "",
  setCourseIdParam: () => undefined,
  course: undefined,
  setCourse: () => undefined,
  activeSection: undefined,
  setActiveSection: () => undefined,
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

  return (
    <CourseContentContext.Provider
      value={{
        courseIdParam,
        setCourseIdParam,
        course,
        setCourse,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </CourseContentContext.Provider>
  );
};

export const useCourseContent = () => {
  const context = useContext(CourseContentContext);
  if (!context) {
    throw new Error(
      "useCourseContent must be used within an CourseContentProvider"
    );
  }
  return context;
};
