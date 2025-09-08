const ALLOWED_DIFFICULTIES = ['Junior', 'Middle', 'Senior'];

// Функция-валидатор, которая принимает на вход сложность, и если сложность найдена в массиве
// ALLOWED_DIFFICULTIES возвращает true, в ином случае false.
export const validateDifficulty = (difficulty: string): boolean => {
  if (!ALLOWED_DIFFICULTIES.includes(difficulty)) return false;
  return true;
};
