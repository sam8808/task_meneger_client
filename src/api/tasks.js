import api from "../services/api.service";

export const tasksAPI = {
  // Получение всех задач
  getAllTasks: async () => {
    const { data } = await api.get("/tasks");
    return data;
  },

  // Получение задачи по ID
  getTaskById: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  // Создание задачи
  createTask: async (taskData) => {
    const { data } = await api.post("/tasks", taskData);
    return data;
  },

  // Обновление задачи
  updateTask: async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data;
  },

  // Удаление задачи
  deleteTask: async (id) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },

  // Получение подзадач
  getSubtasks: async (taskId) => {
    const { data } = await api.get(`/tasks/${taskId}/subtasks`);
    return data;
  },

  // Обновление статуса задачи
  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/tasks/${id}/status`, { status });
    return data;
  },

  // Добавление комментария к задаче
  addComment: async (taskId, comment) => {
    const { data } = await api.post(`/tasks/${taskId}/comments`, comment);
    return data;
  },
};
