import { FormField } from "./fields/FormField";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { DifficultySelector } from "../components/DifficultySelector";
import { createInterviewRequests } from "../api/interviewRequests/interviewRequests";
import { findAllTags } from "../api/tags/tags";
import { getError } from "../utils/utils";
import {
  validateTitle,
  validateTheme,
  validateDate,
  validateDifficulty,
  validateAdditionalInfo,
} from "../utils/interview-requests.validators";

export const RequestInterviewForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    theme: "",
    date: "",
    difficulty: "",
    additionalInfo: "",
  });
  const [themes, setThemes] = useState([]);
  const { showNotification } = useNotification();
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = {};

    const titleValidation = validateTitle(formData.title);
    const themeValidation = validateTheme(formData.theme);
    const dateValidation = validateDate(formData.date);
    const difficultyValidation = validateDifficulty(formData.difficulty);
    const additionalInfoValidation = validateAdditionalInfo(
      formData.additionalInfo
    );

    if (!titleValidation.ok) {
      newErrors.title = titleValidation.message;
      valid = false;
    }

    if (!themeValidation.ok) {
      newErrors.theme = themeValidation.message;
      valid = false;
    }

    if (!dateValidation.ok) {
      newErrors.date = dateValidation.message;
      valid = false;
    }

    if (!difficultyValidation.ok) {
      newErrors.difficulty = difficultyValidation.message;
      valid = false;
    }

    if (!additionalInfoValidation.ok) {
      newErrors.additionalInfo = additionalInfoValidation.message;
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await createInterviewRequests({ ...formData });
      showNotification("Запит успішно створено!", true);
      clearForm();
      setErrors({});
    } catch (error) {
      setErrors({ general: getError(error) });
    }
  };

  useEffect(() => {
    if (errors.general) {
      showNotification(errors.general, false);
    }
  }, [errors]);

  useEffect(() => {
    const load = async () => {
      try {
        const tags = await findAllTags();
        setThemes(tags.data.data);
      } catch (error) {
        setErrors({ general: "Помилка при отриманні тегів" });
      }
    };

    load();
  }, []);

  const clearForm = () => {
    setFormData({
      title: "",
      theme: "",
      date: "",
      difficulty: "",
      additionalInfo: "",
    });
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FormField
        type="text"
        placeholder="Назва"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        isRequired={true}
      ></FormField>
      <div className="mb-4">
        <select
          className={`bg-gray-100 w-full text-gray-900 rounded-md p-4 transition ease-in-out duration-150
    focus:bg-gray-200 focus:outline-none
    ${
      errors.theme
        ? "ring-1 ring-red-600 border-red-600"
        : "focus:ring-1 focus:ring-[var(--primary-color)]"
    }`}
          value={formData.theme}
          onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
          error={errors.theme}
          required={true}
        >
          <option defaultChecked>Тема</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.title}>
              {theme.title}
            </option>
          ))}
        </select>
        {errors.theme && (
          <p className="text-red-600 font-bold text-sm mt-2">{errors.theme}</p>
        )}
      </div>

      <FormField
        type="date"
        placeholder="Дата"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        error={errors.date}
        isRequired={true}
      ></FormField>

      <div className="mb-4">
        <textarea
          className={`resize-vertical bg-gray-100 w-full text-gray-900 rounded-md p-4 transition ease-in-out duration-150
    focus:bg-gray-200 focus:outline-none
    ${
      errors.additionalInfo
        ? "ring-1 ring-red-600 border-red-600"
        : "focus:ring-1 focus:ring-[var(--primary-color)]"
    }`}
          placeholder="Коментар та побажання"
          value={formData.additionalInfo}
          onChange={(e) =>
            setFormData({ ...formData, additionalInfo: e.target.value })
          }
        ></textarea>
        {errors.additionalInfo && (
          <p className="text-red-600 font-bold text-sm mt-2">
            {errors.additionalInfo}
          </p>
        )}
      </div>

      <DifficultySelector
        formData={formData}
        setFormData={setFormData}
        error={errors.difficulty}
      ></DifficultySelector>

      <button
        type="submit"
        className="bg-[var(--primary-color)] cursor-pointer text-white font-bold !py-3 !px-4 rounded-md !mt-2 hover:bg-[var(--primary-hover-color)] transition ease-in-out duration-150"
      >
        Надіслати
      </button>
    </form>
  );
};
