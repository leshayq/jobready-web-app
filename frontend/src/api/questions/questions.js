import baseApi from "../api";

const api = baseApi;

// API запрос для поиска всех вопросов с пагинацией
export const findAllQuestions = async (page = 1, limit = 1) => {
  try {
    const response = await api.get(`/questions?page=${page}&limit=${limit}`);

    return response;
  } catch (error) {
    console.error("Помилка при отриманні питань", error);
    throw error;
  }
};

// API запрос для поиска вопросов по тегу с пагинацией
export const findByTag = async (page = 1, tag, limit) => {
  try {
    const response = await api.get(
      `/questions/?tag=${encodeURIComponent(tag)}&page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Помилка при пошуку питань за тегом", error);
    throw error;
  }
};

// API запрос для поиска вопросов по заголовку с пагинацией
export const findByTitle = async (page = 1, search, limit) => {
  try {
    const response = await api.get(
      `/questions?page=${page}&limit=${limit}&search=${search}`
    );
    return response;
  } catch (error) {
    console.error("Помилка при пошуку питань", error);
    throw error;
  }
};

// API запрос для поиска одного вопроса по ID
export const findOneQuestion = async (id) => {
  try {
    const response = await api.get(`/questions/${id}`);

    return response;
  } catch (error) {
    console.error("Помилка при отриманні питання", error);
    throw error;
  }
};
