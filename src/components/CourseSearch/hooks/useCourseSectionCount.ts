import { useCourseContext } from "../../../context/CourseContext";

interface handleChangeParams {
  newCount: string;
}

const useCourseSectionCount = () => {
  const { sectionCount, setSectionCount } = useCourseContext();

  const handleChange = ({ newCount }: handleChangeParams) => {
    setSectionCount(newCount);
  };

  return {
    sectionCount,
    handleChange,
  };
};

export default useCourseSectionCount;
