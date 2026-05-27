import api from './api.js';

export const getFoods = async (search = '') => {
  const response = await api.get('/api/foods', {
    params: { search }
  });
  return response.data;
};
