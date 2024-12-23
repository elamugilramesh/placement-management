import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');

export const getCompanies = () => api.get('/companies');
export const getCompany = (id) => api.get(`/companies/${id}`);
export const createCompany = (data) => api.post('/companies', data);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);

export const getExperiences = () => api.get('/experiences');
export const getCompanyExperiences = (companyId) => 
  api.get(`/experiences/company/${companyId}`);
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

export const getTrends = () => api.get('/trends');
export const createTrend = (data) => api.post('/trends', data);
export const updateTrend = (id, data) => api.put(`/trends/${id}`, data);
export const deleteTrend = (id) => api.delete(`/trends/${id}`);

export default api;