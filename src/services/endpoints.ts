export default {
  v1: {
    course: {
      get: (courseId: string) => `/api/v1/courses/${courseId}`,
      post: "/api/v1/courses",
    },
    topics: {
      post: "/api/v1/topics",
    },
    generationLogs: {
      get: "/api/v1/generationlogs",
    },
  },
};
