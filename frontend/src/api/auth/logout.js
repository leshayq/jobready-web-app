import baseApi from "../api";

const api = baseApi;

// API запрос на выход из аккаунта пользователя
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("accessToken");

    return response;
  } catch (error) {
    console.error("Помилка виходу з акаунту", error);
    throw error;
  }
};
