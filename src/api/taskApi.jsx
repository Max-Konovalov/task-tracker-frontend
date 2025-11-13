// src/api/taskApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:80/api';

export const taskApi = {
  getAll: (params = {}) => {
    // Удаляем ключи, у которых значение — пустая строка или null/undefined
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v != null)
    );
    return axios.get(`${API_BASE_URL}/tasks/`, { params: cleanParams });
  },

  getStats: () => axios.get(`${API_BASE_URL}/tasks/count`),

  getById: (id) => axios.get(`${API_BASE_URL}/tasks/${id}`),

  create: (task) => axios.post(`${API_BASE_URL}/tasks/`, task),

  update: (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task),

  // ✅ ИСПРАВЛЕНО: data = undefined → axios НЕ отправляет тело и НЕ ставит Content-Type
  updateStatus: (id, status) =>
    axios.patch(`${API_BASE_URL}/tasks/${id}/status`, undefined, {
      params: { status },
    }),

  delete: (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`),
};