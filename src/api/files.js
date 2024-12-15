// src/api/files.js
import api from "../services/api.service";

export const filesAPI = {
  // Загрузка файла
  uploadFile: async (taskId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(`/tasks/${taskId}/attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  // Получение файлов задачи
  getTaskFiles: async (taskId) => {
    const { data } = await api.get(`/tasks/${taskId}/attachments`);
    return data;
  },

  // Удаление файла
  deleteFile: async (taskId, fileId) => {
    const { data } = await api.delete(`/tasks/${taskId}/attachments/${fileId}`);
    return data;
  },

  // Скачивание файла
  downloadFile: async (taskId, fileId) => {
    const response = await api.get(
      `/tasks/${taskId}/attachments/${fileId}/download`,
      {
        responseType: "blob",
      }
    );
    return response;
  },
};
