import { CourseItemType, ICourse } from "../types/course";

export const defaultCourse: ICourse<
  CourseItemType.LESSON | CourseItemType.MODULE
> = {
  id: "",
  title: "",
  description: "",
  items: [],
  // isSuccess: false,
  user_id: -1,
};

export const defaultProficiency = "beginner";
export const defaultSectionCount = "3";
