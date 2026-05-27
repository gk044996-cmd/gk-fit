import api from './api.js';

export const getDailyIntake = async (date) => {
  const response = await api.get('/api/nutrition/daily', {
    params: { date }
  });
  return response.data;
};

export const addFoodIntake = async (intakeData) => {
  const response = await api.post('/api/nutrition/add', intakeData);
  return response.data;
};

export const editFoodIntake = async (logId, intakeData) => {
  const response = await api.put(`/api/nutrition/edit/${logId}`, intakeData);
  return response.data;
};

export const removeFoodIntake = async (logId, { date, mealType }) => {
  const response = await api.delete(`/api/nutrition/remove/${logId}`, {
    params: { date, mealType }
  });
  return response.data;
};
