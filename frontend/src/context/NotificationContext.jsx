import React, { createContext, useState, useContext } from "react";
import { SuccessMessage } from "../components/SuccessMessage";
import { ErrorMessage } from "../components/ErrorMessage";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

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
