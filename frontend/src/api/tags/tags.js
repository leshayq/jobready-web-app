import baseApi from "../api";

const api = baseApi;

export const findAllTags = async () => {
  try {
    const response = await api.get("/tags");
    return response;
  } catch (error) {
    console.error("Помилка при отриманні тегів", error);
    throw error;
  }
};
