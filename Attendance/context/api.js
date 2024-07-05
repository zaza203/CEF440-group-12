import axios from 'axios';

const API_URL = 'http://192.168.43.99:8080';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllSessions = () => api.get('/sessions');
export const addSession = (session) => api.post('/sessions', session);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);
export const editSession = (session) => api.put('/sessions', session);

export const markAttendance = (attendance) => api.post('/attendance', attendance);
export const getAllAttendances = () => api.get('/attendance');

export const getAllCourses = () => api.get('/courses');
export const addCourse = (course) => api.post('/courses', course);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const editCourse = (course) => api.put('/courses', course);

export default api;
