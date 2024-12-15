// src/api/users.js
import api from "../services/api.service";

export const usersAPI = {
  // Получение всех пользователей
  getAllUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },

  // Получение профиля пользователя
  getUserProfile: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  // Обновление профиля
  updateProfile: async (userData) => {
    const { data } = await api.put("/users/profile", userData);
    return data;
  },

  // Изменение пароля
  changePassword: async (passwordData) => {
    const { data } = await api.put("/users/password", passwordData);
    return data;
  },

  // Получение уведомлений пользователя
  getNotifications: async () => {
    const { data } = await api.get("/users/notifications");
    return data;
  },

  // Отметить уведомление как прочитанное
  markNotificationAsRead: async (notificationId) => {
    const { data } = await api.put(`/users/notifications/${notificationId}`);
    return data;
  },
};
