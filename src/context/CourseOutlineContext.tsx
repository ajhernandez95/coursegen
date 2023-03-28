import { Dispatch, SetStateAction } from "react";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Outline } from "../components/CourseOutline/types";
import {
  defaultCourseOutline,
  defaultProficiency,
  defaultSectionCount,
} from "../constants/course";

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
  sectionCount: string;
  setSectionCount: Dispatch<SetStateAction<string>>;
  proficiency: string;
  setProficiency: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export const CourseOutlineContext = createContext<ICourseOutlineContext>({
  outline: defaultCourseOutline,
  setOutline: () => undefined,
  subjectSearch: "",
  setSubjectSearch: () => undefined,
  proficiency: defaultProficiency,
  setProficiency: () => undefined,
  sectionCount: defaultSectionCount,
  setSectionCount: () => undefined,
  setIsSearching: () => undefined,
  isSearching: false,
});

export const CourseOutlineContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [outline, setOutline] = useState(defaultCourseOutline);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [proficiency, setProficiency] = useState(defaultProficiency);
  const [sectionCount, setSectionCount] = useState<string>(defaultSectionCount);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <CourseOutlineContext.Provider
      value={{
        outline,
        setOutline,
        subjectSearch,
        setSubjectSearch,
        proficiency,
        setProficiency,
        sectionCount,
        setSectionCount,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </CourseOutlineContext.Provider>
  );
};
