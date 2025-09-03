import baseApi from "../api";

const api = baseApi;

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response;
  } catch (error) {
    console.error("Помилка входу", error);
    throw error;
  }
};
