import baseApi from "../api";

const api = baseApi;

export const verificateEmail = async (token) => {
  try {
    const response = await api.post("/email-confirmation/confirm", {
      token,
    });
    return response;
  } catch (error) {
    console.error("Помилка верифікації електронної пошти", error);
    throw error;
  }
};
