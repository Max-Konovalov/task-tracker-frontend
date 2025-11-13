import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const taskApi = {
  getAll: (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v != null)
    );
    return axios.get(`${API_BASE_URL}/tasks/`, { params: cleanParams });
  },

  getStats: () => axios.get(`${API_BASE_URL}/tasks/count`),

  getById: (id) => axios.get(`${API_BASE_URL}/tasks/${id}`),

  create: (task) => axios.post(`${API_BASE_URL}/tasks/`, task),

  update: (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task),

  updateStatus: (id, status) =>
    axios.patch(`${API_BASE_URL}/tasks/${id}/status`, undefined, {
      params: { status },
    }),

  delete: (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`),
};