import API from './api.js';

export const login = async (email, password) => {
  const response = await API.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get('/api/auth/profile');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await API.put('/api/auth/profile', userData);
  return response.data;
};
