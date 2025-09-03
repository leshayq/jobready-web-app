export const getError = (err) => {
  return (
    err?.response?.data?.error?.message ?? err?.message ?? "Невідома помилка"
  );
};
