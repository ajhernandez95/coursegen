export enum CourseItemType {
  MODULE = "module",
  LESSON = "lesson",
}

export interface ICourse<T extends CourseItemType> {
  id: string;
  title: string;
  dates?: string;
  description: string;
  items: ICourseItem<T>[];
  user_id: number;
}

// TODO: Fix this type to inherit and exclude form Course interface
export interface ICourseItem<T extends CourseItemType> {
  id: string;
  title: string;
  dates: string;
  description: string;
  order_index: number;
  items: ICourseItem<T>[];
  type: CourseItemType;
  topics?: ITopic[];
}

export interface ITopic {
  id: string;
  title: string;
  content: string;
  order_index: number;
}
