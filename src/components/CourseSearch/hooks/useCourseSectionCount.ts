import { CourseOutlineContext } from "../../../context/CourseOutlineContext";
import { useContext, useState } from "react";

interface handleChangeParams {
  newCount: string;
}

const useCourseSectionCount = () => {
  const { sectionCount, setSectionCount } = useContext(CourseOutlineContext);

  const handleChange = ({ newCount }: handleChangeParams) => {
    setSectionCount(newCount);
  };

  return {
    sectionCount,
    handleChange,
  };
};

export default useCourseSectionCount;
