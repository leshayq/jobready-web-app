import React, { createContext, useState, useContext } from "react";
import { SuccessMessage } from "../components/messages/SuccessMessage";
import { ErrorMessage } from "../components/messages/ErrorMessage";

// Создаем контекст уведомлений
const NotificationContext = createContext();

// Хук для использования контекста уведомлений
export const useNotification = () => useContext(NotificationContext);

// Провайдер контекста уведомлений
export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showNotification = (msg, success) => {
    setIsSuccess(success);
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const value = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {isSuccess ? (
        <SuccessMessage message={message} isVisible={isVisible} />
      ) : (
        <ErrorMessage message={message} isVisible={isVisible} />
      )}
    </NotificationContext.Provider>
  );
};
