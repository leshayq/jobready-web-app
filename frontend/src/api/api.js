import axios from "axios";

// Экземпляр axios с базовым URL и настройками
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = null;

// Функция для установки / очистки accessToken
export const setAccessToken = (token) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  }
};

let isRefreshing = false; // флаг — идёт ли сейчас обновление токена
let failedQueue = []; // очередь запросов, которые ждут обновления токена

// Функция для обработки очереди отложенных запросов
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// Перехватчик ответов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Если ошибка не связана с авторизацией — пробрасываем дальше
    if (!status || status !== 401) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest?.url || "";

    if (
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    // Если 401 получен при попытке обновить токен — выходим
    if (requestUrl.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Если обновление уже идёт, ставим запрос в очередь
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            // повторяем запрос с новым токеном
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    // Устанавливаем флаг и пробуем обновить токен
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Запрос на обновление refresh токена
      const refreshResponse = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      // Получаем новый access token и сохраняем его
      const newAccessToken = refreshResponse.data.accessToken;
      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      // Повторяем исходный запрос с новым токеном
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Если обновить не удалось — отклоняем все запросы
      processQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
