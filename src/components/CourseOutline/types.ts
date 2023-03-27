export interface Outline {
  course: Course;
  sections?: CourseSection[];
}

export interface Course {
  title: string;
  dates?: string;
  description: string;
}

export interface CourseSection extends Omit<Course, "sections"> {
  subsections?: CourseSubSection[];
}

export interface CourseSubSection extends Omit<Course, "sections"> {}
