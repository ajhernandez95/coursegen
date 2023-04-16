export interface Outline {
  course: Course;
  sections?: CourseSection[];
}

export interface Course {
  title: string;
  dates?: string;
  description: string;
  courseId: string;
}

export interface CourseSection extends Omit<Course, "courseId"> {
  id: number;
  subsections?: CourseSubSection[];
}

export interface CourseSubSection extends Omit<Course, "sections"> {}
