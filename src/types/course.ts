export interface Course {
  id: string;
  title: string;
  dates?: string;
  description: string;
  items: CourseItem[];
  isSuccess: boolean;
  userId: number;
}

// TODO: Fix this type to inherit and exclude form Course interface
export interface CourseItem {
  id: number;
  title: string;
  dates: string;
  description: string;
  order_index: number;
  items: CourseItem[];
  type: CourseItemType;
}

export enum CourseItemType {
  MODULE = "module",
  LESSON = "lesson",
}
