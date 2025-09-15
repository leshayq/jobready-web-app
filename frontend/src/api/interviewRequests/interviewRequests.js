import baseApi from "../api";

const api = baseApi;

// API запрос на получение всех запросов на собеседования с пагинацией и фильтром по userId
export const findAllInterviewRequests = async (
  page = 1,
  limit = 1,
  userId = null
) => {
  try {
    const hasValidUserId =
      userId !== null &&
      userId !== undefined &&
      userId !== "" &&
      userId !== "null" &&
      !Number.isNaN(Number(userId));

    const url = hasValidUserId
      ? `/interview-requests/?page=${page}&limit=${limit}&user=${Number(
          userId
        )}`
      : `/interview-requests/?page=${page}&limit=${limit}`;
    const response = await api.get(url);
    return response;
  } catch (error) {
    console.error("Помилка при отриманні запитів співбесід", error);
    throw error;
  }
};

// API запрос на создание запроса на собеседование
export const createInterviewRequests = async (formData) => {
  try {
    const response = await api.post("/interview-requests/", { ...formData });
    return response;
  } catch (error) {
    console.error("Помилка при створенні запиту співбесіди", error);
    throw error;
  }
};

// API запрос на удаление запроса на собеседование
export const deleteInterviewRequest = async (id) => {
  try {
    const response = await api.delete(`/interview-requests/${id}/`);
    return response;
  } catch (error) {
    console.error("Помилка при видаленні запиту співбесіди", error);
    throw error;
  }
};
