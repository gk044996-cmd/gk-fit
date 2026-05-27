import api from './api.js';

export const getWorkouts = async (category = 'All', search = '') => {
  const response = await api.get('/api/workouts', {
    params: { category, search }
  });
  return response.data;
};

export const getWorkoutById = async (id) => {
  const response = await api.get(`/api/workouts/${id}`);
  return response.data;
};
