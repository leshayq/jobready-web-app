// В файле собраны все функции для валидации полей формы создания запроса на интервью
export const validateTitle = (title) => {
  if (title.length < 1 || title.length > 50) {
    return {
      ok: false,
      message: "Довжина назви повинна бути від 1 до 50 символів.",
    };
  }
  return { ok: true };
};

export const validateDate = (date) => {
  if (date.length < 1) {
    return {
      ok: false,
      message: "Дата не може бути порожньою",
    };
  }
  return { ok: true };
};

export const validateTheme = (theme) => {
  if (!theme || theme === "Тема") {
    return {
      ok: false,
      message: "Вкажіть тему співбесіди",
    };
  }
  return { ok: true };
};

export const validateDifficulty = (difficulty) => {
  if (!difficulty) {
    return {
      ok: false,
      message: "Рівень складності не може бути порожнім",
    };
  }
  return { ok: true };
};

export const validateAdditionalInfo = (info) => {
  if (info.length > 500) {
    return {
      ok: false,
      message:
        "Довжина додаткової інформації не може перевищувати 500 символів",
    };
  }
  return { ok: true };
};
