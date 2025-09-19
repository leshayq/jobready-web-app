import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FormField } from "./fields/FormField";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateEqualPasswords,
  validatePassword,
  validateUsername,
} from "../utils/auth.validators";
import { getError } from "../utils/utils";
import { GoogleAuthButton } from "../components/buttons/GoogleAuthButton";

// Форма регистрации
export const RegisterForm = ({ onSuccessFunc, openLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { register, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const equalPasswordsValidation = validateEqualPasswords(
      formData.password,
      formData.password2
    );

    if (!usernameValidation.ok) {
      newErrors.username = usernameValidation.message;
      valid = false;
    }
    if (!emailValidation.ok) {
      newErrors.email = emailValidation.message;
      valid = false;
    }
    if (!passwordValidation.ok) {
      newErrors.password = passwordValidation.message;
      valid = false;
    }
    if (!equalPasswordsValidation.ok) {
      newErrors.password2 = equalPasswordsValidation.message;
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await register(formData.username, formData.email, formData.password);
      onSuccessFunc();
      showNotification("Реєстрація пройшла успішно!", true);
      navigate("/auth/email-sent", { replace: true });
    } catch (error) {
      setErrors({ general: getError(error) });
    }
  };

  const handleGoogleAuthClick = () => {
    window.location.href = "http://localhost:3000/api/auth/google/login";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-md max-w-md bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-black !mb-12 text-center">
          Реєстрація
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <FormField
            type="text"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            error={errors.username}
            isRequired={true}
          ></FormField>
          <FormField
            type="text"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            isRequired={true}
          ></FormField>
          <FormField
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            isRequired={true}
          ></FormField>
          <FormField
            type="password"
            placeholder="Підтверждення паролю"
            value={formData.password2}
            onChange={(e) =>
              setFormData({ ...formData, password2: e.target.value })
            }
            error={errors.password2}
            isRequired={true}
          ></FormField>
          <div className="mb-0.5 text-right">
            <p className="text-gray-400 mt-4">
              {" "}
              Вже є акаунт?{" "}
              <button
                type="button"
                href="#"
                className="text-sm text-[var(--primary-color)] hover:underline mt-4 cursor-pointer"
                onClick={openLogin}
              >
                Вхід
              </button>
            </p>
          </div>
          {errors.general && (
            <p className="text-red-600 font-bold text-sm">{errors.general}</p>
          )}
          <button
            type="submit"
            className="bg-[var(--primary-color)] cursor-pointer text-white font-bold !py-3 !px-4 rounded-md !mt-2 hover:bg-[var(--primary-hover-color)] transition ease-in-out duration-150"
          >
            Реєстрація
          </button>

          <GoogleAuthButton
            title="Реєстрація через Google"
            onClick={handleGoogleAuthClick}
          ></GoogleAuthButton>
        </form>
      </div>
    </div>
  );
};
