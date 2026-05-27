import api from './api.js';

export const logFitFormSession = async (sessionData) => {
  const response = await api.post('/api/fit-form/log', sessionData);
  return response.data;
};

export const getFitFormHistory = async () => {
  const response = await api.get('/api/fit-form/history');
  return response.data;
};
