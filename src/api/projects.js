import api from "../services/api.service";

export const projectsAPI = {
  // Получение всех проектов
  getAllProjects: async () => {
    const { data } = await api.get("/projects");
    return data;
  },

  // Получение конкретного проекта
  getProjectById: async (id) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  // Создание проекта
  createProject: async (projectData) => {
    const { data } = await api.post("/projects", projectData);
    return data;
  },

  // Обновление проекта
  updateProject: async (id, projectData) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data;
  },

  // Удаление проекта
  deleteProject: async (id) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },

  // Добавление участника в проект
  addMember: async (projectId, userId) => {
    const { data } = await api.post(`/projects/${projectId}/members`, {
      userId,
    });
    return data;
  },

  // Удаление участника из проекта
  removeMember: async (projectId, userId) => {
    const { data } = await api.delete(
      `/projects/${projectId}/members/${userId}`
    );
    return data;
  },

  // Получение задач проекта
  getProjectTasks: async (projectId) => {
    const { data } = await api.get(`/projects/${projectId}/tasks`);
    return data;
  },

  // Получение статистики проекта
  getProjectStats: async (projectId) => {
    const { data } = await api.get(`/projects/${projectId}/stats`);
    return data;
  },

  getProjectMembers: async (projectId) => {
    const { data } = await api.get(`/projects/${projectId}/members`);
    return data;
  },

  // Обновление роли участника в проекте
  updateMemberRole: async (projectId, userId, role) => {
    const { data } = await api.put(`/projects/${projectId}/members/${userId}`, {
      role,
    });
    return data;
  },

  // Поиск проектов
  searchProjects: async (query) => {
    const { data } = await api.get(`/projects/search`, { params: { query } });
    return data;
  },

  // Получение активности проекта (история действий)
  getProjectActivity: async (projectId) => {
    const { data } = await api.get(`/projects/${projectId}/activity`);
    return data;
  },

  // Обновление статуса проекта
  updateProjectStatus: async (projectId, status) => {
    const { data } = await api.patch(`/projects/${projectId}/status`, {
      status,
    });
    return data;
  },

  // Получение проектов текущего пользователя
  getMyProjects: async () => {
    const { data } = await api.get("/projects/my");
    return data;
  },
};
