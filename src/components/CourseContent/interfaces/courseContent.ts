export interface IFetchLessonContent {
  lesson_id: string;
  course_id: string;
  topic_count?: number;
  proficiency?: string;
  max_tokens?: number;
  temperature?: number;
  session_key: string;
}
