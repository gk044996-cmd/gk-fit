import api from './api.js';

export const logProgress = async (progressData) => {
  const response = await api.post('/api/progress', progressData);
  return response.data;
};

export const getProgressHistory = async () => {
  const response = await api.get('/api/progress/history');
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/api/progress/dashboard');
  return response.data;
};
