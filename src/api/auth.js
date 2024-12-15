import api from "../services/api.service";

/**
 * Объект с методами для работы с API аутентификации
 */
export const authAPI = {
  /**
   * Авторизация пользователя
   * @param {Object} credentials - Данные для входа
   * @param {string} credentials.email - Email пользователя
   * @param {string} credentials.password - Пароль пользователя
   * @returns {Promise<{user: Object, token: string}>}
   */
  login: async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - Данные пользователя
   * @param {string} userData.name - Имя пользователя
   * @param {string} userData.email - Email пользователя
   * @param {string} userData.password - Пароль пользователя
   * @param {string} userData.password_confirmation - Подтверждение пароля
   * @returns {Promise<{user: Object, token: string}>}
   */
  register: async (userData) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Выход пользователя
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Получение данных текущего пользователя
   * @returns {Promise<Object>}
   */
  getCurrentUser: async () => {
    try {
      const { data } = await api.get("/auth/user");
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Запрос на восстановление пароля
   * @param {string} email - Email пользователя
   * @returns {Promise<{message: string}>}
   */
  forgotPassword: async (email) => {
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Сброс пароля
   * @param {Object} resetData - Данные для сброса пароля
   * @param {string} resetData.email - Email пользователя
   * @param {string} resetData.token - Токен сброса пароля
   * @param {string} resetData.password - Новый пароль
   * @param {string} resetData.password_confirmation - Подтверждение нового пароля
   * @returns {Promise<{message: string}>}
   */
  resetPassword: async (resetData) => {
    try {
      const { data } = await api.post("/auth/reset-password", resetData);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Обновление токена
   * @returns {Promise<{token: string}>}
   */
  refreshToken: async () => {
    try {
      const { data } = await api.post("/auth/refresh");
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Обновление профиля пользователя
   * @param {Object} profileData - Данные профиля
   * @returns {Promise<{user: Object}>}
   */
  updateProfile: async (profileData) => {
    try {
      const { data } = await api.put("/auth/profile", profileData);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Изменение пароля
   * @param {Object} passwordData - Данные для смены пароля
   * @param {string} passwordData.current_password - Текущий пароль
   * @param {string} passwordData.password - Новый пароль
   * @param {string} passwordData.password_confirmation - Подтверждение нового пароля
   * @returns {Promise<{message: string}>}
   */
  changePassword: async (passwordData) => {
    try {
      const { data } = await api.put("/auth/password", passwordData);
      return data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },
};

/**
 * Обработчик ошибок аутентификации
 * @param {Error} error - Объект ошибки
 * @returns {Error} Обработанная ошибка
 */
const handleAuthError = (error) => {
  // Если есть ответ от сервера
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 422: // Validation error
        return {
          ...error,
          message: "Validation failed",
          errors: data.errors,
        };
      case 401: // Unauthorized
        return {
          ...error,
          message: data.message || "Unauthorized access",
        };
      case 403: // Forbidden
        return {
          ...error,
          message: data.message || "Access forbidden",
        };
      case 404: // Not found
        return {
          ...error,
          message: "Resource not found",
        };
      case 429: // Too many requests
        return {
          ...error,
          message: "Too many attempts, please try again later",
        };
      default:
        return {
          ...error,
          message: data.message || "An error occurred during authentication",
        };
    }
  }

  // Если нет ответа от сервера
  if (error.request) {
    return {
      ...error,
      message: "No response from server",
    };
  }

  // Для остальных ошибок
  return {
    ...error,
    message: "An unexpected error occurred",
  };
};

export default authAPI;
