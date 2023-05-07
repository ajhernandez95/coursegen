export enum CourseItemType {
  MODULE = "module",
  LESSON = "lesson",
}

export interface ICourse {
  id: string;
  title: string;
  dates?: string;
  description: string;
  items: ICourseItem[];
  user_id: number;
}

// TODO: Fix this type to inherit and exclude form Course interface
export interface ICourseItem {
  id: string;
  title: string;
  dates: string;
  description: string;
  order_index: number;
  items: ICourseItem[];
  type: CourseItemType;
  topics?: ITopic[];
}

export interface ITopic {
  id: string;
  title: string;
  content: string;
  order_index: number;
}
