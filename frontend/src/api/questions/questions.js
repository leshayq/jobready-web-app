import baseApi from "../api";

const api = baseApi;

export const findAllQuestions = async (page = 1, limit = 1) => {
  try {
    const response = api.get(`/questions?page=${page}&limit=${limit}`);

    return response;
  } catch (error) {
    console.error("Помилка при отриманні питань", error);
    throw error;
  }
};

export const findByTag = async (page = 1, tag, limit) => {
  try {
    const response = api.get(
      `/questions/?tag=${encodeURIComponent(tag)}&page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Помилка при пошуку питань за тегом", error);
    throw error;
  }
};

export const findByTitle = async (page = 1, search, limit) => {
  try {
    const response = api.get(
      `/questions?page=${page}&limit=${limit}&search=${search}`
    );
    return response;
  } catch (error) {
    console.error("Помилка при пошуку питань", error);
    throw error;
  }
};

export const findOneQuestion = async (id) => {
  try {
    const response = api.get(`/questions/${id}`);

    return response;
  } catch (error) {
    console.error("Помилка при отриманні питання", error);
    throw err;
  }
};
