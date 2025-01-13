export const API_BASE_URL = 'http://localhost:3000';

export const endpoints = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  students_read: `${API_BASE_URL}/students`,
  student_id: (id: string) => `${API_BASE_URL}/students/${id}`,
  student_create: `${API_BASE_URL}/students`,
  student_update: (id: string) => `${API_BASE_URL}/students/${id}`,
  student_delete: (id: string) => `${API_BASE_URL}/students/${id}`,
  student_activities: `${API_BASE_URL}/students/activities`,
};