import { useBreakpointValue } from "@chakra-ui/react";
import { ICourseItem } from "../../types/course";
import CourseItem from "./CourseItem";

const CourseItems = ({ items }: { items: ICourseItem[] }) => {
  // const templateColumns = useBreakpointValue({
  //   base: "repeat(auto-fill, minmax(200px, 1fr))",
  //   sm: "repeat(auto-fill, minmax(300px, 1fr))",
  // });

  return (
    <>
      {items?.map((item, i) => (
        <CourseItem key={i} item={item} />
      ))}
    </>
  );
};

export default CourseItems;
