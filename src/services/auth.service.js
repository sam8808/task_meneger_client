import api from "./api.service";

export const authService = {
  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  async register(userData) {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get("/auth/user");
    return data;
  },

  async forgotPassword(email) {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },

  async resetPassword(credentials) {
    const { data } = await api.post("/auth/reset-password", credentials);
    return data;
  },
};
