import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  logout as logoutAction,
  setError,
  setLoading,
} from "../store/slices/authSlice";
import { authAPI } from "../api/auth";

// Создаем контекст с начальными значениями
export const AuthContext = createContext({
  login: async () => {},
  register: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  isLoading: false,
  error: null,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация - проверка сохраненного токена и получение данных пользователя
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          dispatch(setLoading(true));
          const user = await authAPI.getCurrentUser();
          dispatch(setCredentials({ user, token: storedToken }));
        } catch (error) {
          console.error("Error initializing auth:", error);
          localStorage.removeItem("token");
          dispatch(logoutAction());
        } finally {
          dispatch(setLoading(false));
        }
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, [dispatch]);

  // Функция входа
  const login = async (credentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const { user, token } = await authAPI.login(credentials);

      localStorage.setItem("token", token);
      dispatch(setCredentials({ user, token }));

      return { user, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция регистрации
  const register = async (userData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const { user, token } = await authAPI.register(userData);

      localStorage.setItem("token", token);
      dispatch(setCredentials({ user, token }));

      return { user, token };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      dispatch(logoutAction());
    }
  };

  // Функция восстановления пароля
  const forgotPassword = async (email) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authAPI.forgotPassword(email);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password reset request failed";
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Функция сброса пароля
  const resetPassword = async (resetData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authAPI.resetPassword(resetData);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password reset failed";
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Мемоизированное значение контекста
  const contextValue = {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isInitialized,
  };

  if (!isInitialized) {
    // Можно показать загрузчик или заглушку
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  const {
    user,
    token,
    loading: isLoading,
    error,
  } = useSelector((state) => state.auth);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return {
    ...context,
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
  };
};
