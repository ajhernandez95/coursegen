import { Dispatch, SetStateAction } from "react";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Outline } from "../components/CourseOutline/types";
import {
  defaultCourseOutline,
  defaultProficiency,
  defaultSectionCount,
} from "../constants/course";
import { useToast } from "@chakra-ui/react";

interface ICourseOutlineContext {
  outline: Outline;
  setOutline: Dispatch<
    SetStateAction<{
      course: {
        title: string;
        dates: string;
        description: string;
        courseId: string;
      };
      sections: never[];
    }>
  >;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sectionCount: string;
  setSectionCount: Dispatch<SetStateAction<string>>;
  proficiency: string;
  setProficiency: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  copyCourseLink: () => void;
}

export const CourseOutlineContext = createContext<ICourseOutlineContext>({
  outline: defaultCourseOutline,
  setOutline: () => undefined,
  search: "",
  setSearch: () => undefined,
  proficiency: defaultProficiency,
  setProficiency: () => undefined,
  sectionCount: defaultSectionCount,
  setSectionCount: () => undefined,
  setIsSearching: () => undefined,
  isSearching: false,
  copyCourseLink: () => undefined,
});

export const CourseOutlineContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [outline, setOutline] = useState(defaultCourseOutline);
  const [search, setSearch] = useState("");
  const [proficiency, setProficiency] = useState(defaultProficiency);
  const [sectionCount, setSectionCount] = useState<string>(defaultSectionCount);
  const [isSearching, setIsSearching] = useState(false);
  const toast = useToast();

  const copyCourseLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/course/${outline.course.courseId}`
    );

    toast({
      title: "Course Link Copied",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <CourseOutlineContext.Provider
      value={{
        outline,
        setOutline,
        search,
        setSearch,
        proficiency,
        setProficiency,
        sectionCount,
        setSectionCount,
        isSearching,
        setIsSearching,
        copyCourseLink,
      }}
    >
      {children}
    </CourseOutlineContext.Provider>
  );
};
