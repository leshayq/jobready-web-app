import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

// Компонент для защиты маршрутов, доступных только авторизованным пользователям
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification("Авторизуйтесь для перегляду даної сторінки", false);
    }
  }, [isAuthenticated, showNotification]);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
