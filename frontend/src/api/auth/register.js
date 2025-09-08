import baseApi from "../api";

const api = baseApi;

// API запрос на регистрацию пользователя
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Помилка реєстрації", error);
    throw error;
  }
};
