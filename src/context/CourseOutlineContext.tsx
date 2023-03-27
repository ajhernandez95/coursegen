import { Dispatch, SetStateAction } from "react";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Outline } from "../components/CourseOutline/types";
import { defaultCourseOutline } from "../constants/course";

interface ICourseOutlineContext {
  outline: Outline;
  setOutline: Dispatch<
    SetStateAction<{
      course: {
        title: string;
        dates: string;
        description: string;
      };
      sections: never[];
    }>
  >;
}

export const CourseOutlineContext = createContext<ICourseOutlineContext>({
  outline: defaultCourseOutline,
  setOutline: () => undefined,
});

export const CourseOutlineContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [outline, setOutline] = useState(defaultCourseOutline);

  return (
    <CourseOutlineContext.Provider
      value={{
        outline,
        setOutline,
      }}
    >
      {children}
    </CourseOutlineContext.Provider>
  );
};
