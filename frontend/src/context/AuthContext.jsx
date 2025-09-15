import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../api/auth/login";
import { registerUser } from "../api/auth/register";
import { Loader } from "../components/Loader";
import api, { setAccessToken } from "../api/api";

// Создаем контекст аутентификации
const AuthContext = createContext(null);

// Провайдер контекста аутентификации
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        setUser(response.data.data.user);
        setAccessToken(response.data.data.accessToken);
      } catch (error) {
        console.error("Користувач не авторизований", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);

      setUser(response.data.data.user);
      setAccessToken(response.data.data.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerUser(username, email, password);
    } catch (error) {
      throw error;
    }
  };

  const authData = {
    user,
    login,
    register,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
