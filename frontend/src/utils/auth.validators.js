// В файле собраны все функции для валидации полей формы авторизации и регистрации
export const validateEmail = (email) => {
  if (email.length < 1 || email.length > 50) {
    return { ok: false, message: "Невірний формат e-mail." };
  }

  const format = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!format) {
    return { ok: false, message: "Невірний формат e-mail." };
  }
  return { ok: true };
};

export const validatePassword = (password) => {
  if (password.length >= 8 && password.length <= 50) {
    return { ok: true };
  } else
    return {
      ok: false,
      message: "Довжина пароля повинна бути від 8 до 50 символів.",
    };
};

export const validateUsername = (username) => {
  if (username.length < 4 || username.length > 50) {
    return {
      ok: false,
      message: "Довжина імені користувача повинна бути від 4 до 50 символів.",
    };
  }

  const format = String(username)
    .toLowerCase()
    .match(/^[a-zA-Z0-9]+$/);

  if (!format) {
    return {
      ok: false,
      message:
        "Ім'я користувача повинно складатись лише з англійських літер та цифр.",
    };
  }

  return { ok: true };
};

export const validateEqualPasswords = (password1, password2) => {
  if (password1 !== password2)
    return { ok: false, message: "Паролі не співпадають" };
  return { ok: true };
};
