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
  subjectSearch: string;
  setSubjectSearch: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export const CourseOutlineContext = createContext<ICourseOutlineContext>({
  outline: defaultCourseOutline,
  setOutline: () => undefined,
  subjectSearch: "",
  setSubjectSearch: () => undefined,
  isSearching: false,
  setIsSearching: () => undefined,
});

export const CourseOutlineContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [outline, setOutline] = useState(defaultCourseOutline);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <CourseOutlineContext.Provider
      value={{
        outline,
        setOutline,
        subjectSearch,
        setSubjectSearch,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </CourseOutlineContext.Provider>
  );
};
