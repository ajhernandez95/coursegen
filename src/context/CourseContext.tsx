import { Dispatch, SetStateAction, useContext } from "react";
import { createContext, useState, ReactNode } from "react";
import { ICourse } from "../types/course";
import {
  defaultCourse,
  defaultProficiency,
  defaultSectionCount,
} from "../constants/course";
import { useToast } from "@chakra-ui/react";

interface ICourseContext {
  course: ICourse;
  setCourse: Dispatch<SetStateAction<ICourse>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sectionCount: string;
  setSectionCount: Dispatch<SetStateAction<string>>;
  proficiency: string;
  setProficiency: Dispatch<SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  copyCourseLink: () => void;
  activeSection: any;
  setActiveSection: Dispatch<SetStateAction<any>>;
  isFetchingCourse: boolean;
  setIsFetchingCourse: Dispatch<SetStateAction<boolean>>;
  isFetchingLesson: boolean;
  setIsFetchingLesson: Dispatch<SetStateAction<boolean>>;
  clearCourseContentState: () => void;
}

export const CourseContext = createContext<ICourseContext>({
  course: defaultCourse,
  setCourse: () => undefined,
  search: "",
  setSearch: () => undefined,
  proficiency: defaultProficiency,
  setProficiency: () => undefined,
  sectionCount: defaultSectionCount,
  setSectionCount: () => undefined,
  setIsSearching: () => undefined,
  isSearching: false,
  copyCourseLink: () => undefined,
  activeSection: undefined,
  setActiveSection: () => undefined,
  isFetchingCourse: false,
  setIsFetchingCourse: () => undefined,
  isFetchingLesson: false,
  setIsFetchingLesson: () => undefined,
  clearCourseContentState: () => undefined,
});

export const CourseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [course, setCourse] = useState<any>(defaultCourse);
  const [search, setSearch] = useState("");
  const [proficiency, setProficiency] = useState(defaultProficiency);
  const [sectionCount, setSectionCount] = useState<string>(defaultSectionCount);
  const [isSearching, setIsSearching] = useState(false);
  const [activeSection, setActiveSection] = useState<any>();
  const [isFetchingCourse, setIsFetchingCourse] = useState(false);
  const [isFetchingLesson, setIsFetchingLesson] = useState(false);
  const toast = useToast();

  const clearCourseContentState = () => {
    setCourse(undefined);
    setActiveSection(undefined);
  };

  const copyCourseLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/course/${course.id}`
    );

    toast({
      title: "Course Link Copied",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        search,
        setSearch,
        proficiency,
        setProficiency,
        sectionCount,
        setSectionCount,
        isSearching,
        setIsSearching,
        copyCourseLink,
        activeSection,
        setActiveSection,
        isFetchingCourse,
        setIsFetchingCourse,
        isFetchingLesson,
        setIsFetchingLesson,
        clearCourseContentState,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within an CourseProvider");
  }
  return context;
};
