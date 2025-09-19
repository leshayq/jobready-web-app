import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FormField } from "./fields/FormField";
import { validateEmail, validatePassword } from "../utils/auth.validators";
import { getError } from "../utils/utils";
import { useNotification } from "../context/NotificationContext";
import { GoogleAuthButton } from "../components/buttons/GoogleAuthButton";

// Форма авторизации
export const LoginForm = ({ onSuccessFunc, openRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = {};

    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    if (!emailValidation.ok) {
      newErrors.email = emailValidation.message;
      valid = false;
    }

    if (!passwordValidation.ok) {
      newErrors.password = passwordValidation.message;
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await login(formData.email, formData.password);
      onSuccessFunc();
      showNotification("Ви успішно увійшли в акаунт!", true);
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
          Вхід в акаунт
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <FormField
            name="email"
            type="email"
            placeholder="Електрона пошта"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            isRequired={true}
          ></FormField>
          <FormField
            name="password"
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            isRequired={true}
          ></FormField>

          <div className="flex items-center justify-end mb-5">
            <a
              href="#"
              className="text-sm text-[var(--primary-color)] hover:underline"
            >
              Забули пароль?
            </a>
          </div>
          <div className="mb-0.5">
            <p className="text-gray-400 mt-4">
              {" "}
              Немає акаунту?{" "}
              <button
                type="button"
                href="#"
                className="text-sm text-[var(--primary-color)] hover:underline mt-4 cursor-pointer"
                onClick={openRegister}
              >
                Зареєструватися
              </button>
            </p>
          </div>
          {errors.general && (
            <p className="text-red-600 font-bold text-sm">{errors.general}</p>
          )}

          <button
            type="submit"
            className="bg-[var(--primary-color)] cursor-pointer text-white font-bold !py-3 !px-4 rounded-md !mt-3 hover:bg-[var(--primary-hover-color)] transition ease-in-out duration-150"
          >
            Вхід
          </button>

          <GoogleAuthButton
            title="Вхід через Google"
            onClick={handleGoogleAuthClick}
          ></GoogleAuthButton>
        </form>
      </div>
    </div>
  );
};
