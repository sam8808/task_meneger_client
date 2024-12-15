import api from '../services/api.service';

export const commentsAPI = {
  // Получение комментариев задачи
  getTaskComments: async (taskId) => {
    const { data } = await api.get(`/tasks/${taskId}/comments`);
    return data;
  },

  // Создание комментария
  createComment: async (taskId, commentData) => {
    const { data } = await api.post(`/tasks/${taskId}/comments`, commentData);
    return data;
  },

  // Удаление комментария
  deleteComment: async (taskId, commentId) => {
    const { data } = await api.delete(`/tasks/${taskId}/comments/${commentId}`);
    return data;
  },

  // Редактирование комментария
  updateComment: async (taskId, commentId, commentData) => {
    const { data } = await api.put(`/tasks/${taskId}/comments/${commentId}`, commentData);
    return data;
  }
};