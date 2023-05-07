import { ICourseItem, CourseItemType } from "../../../types/course";

export const findFirstLesson = ({
  items,
}: {
  items: ICourseItem<CourseItemType.LESSON | CourseItemType.MODULE>[];
}): ICourseItem<CourseItemType.LESSON> => {
  const [item] = items;
  if (item.type === CourseItemType.MODULE) {
    return findFirstLesson({ items: items[0].items });
  }
  return item;
};
