import { useBreakpointValue } from "@chakra-ui/react";
import { CourseItemType, ICourseItem } from "../../types/course";
import CourseItem from "./CourseItem";

const CourseItems = ({
  items,
}: {
  items: ICourseItem<CourseItemType.LESSON | CourseItemType.MODULE>[];
}) => {
  return (
    <>
      {items?.map((item, i) => (
        <CourseItem key={i} item={item} />
      ))}
    </>
  );
};

export default CourseItems;
