import axios from 'axios';

const API_URL = 'http://192.168.7.196:8080';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllSessions = () => api.get('/sessions/all');
export const addSession = (session) => api.post('/sessions', session);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);
export const editSession = (session) => api.put('/sessions', session);
export const getSessionByLecturer = (lecturer) => api.get(`/sessions?lecturer=${lecturer}`);
export const getSessionById = (id) => api.get(`/sessions/${id}`);

export const markAttendance = (attendance) => api.post('/attendance', attendance);
export const getAllAttendances = () => api.get('/attendance');
export const getAttendanceBySessionDetails = (courseId, date, startTime) => api.get(`/attendance?courseId=${courseId}&data=${date}&startTime=${startTime}`);

export const getAllCourses = () => api.get('/courses');
export const getCoursesByLecturer = (lecturer) => api.get(`/courses/${lecturer}`);
export const addCourse = (course) => api.post('/courses', course);
export const deleteCourse = (courseId) => api.delete(`/courses/${courseId}`);
export const editCourse = (course) => api.put('/courses', course);

export default api;
