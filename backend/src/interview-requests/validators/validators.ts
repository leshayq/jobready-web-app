const ALLOWED_DIFFICULTIES = ['Junior', 'Middle', 'Senior'];

export const validateDifficulty = (difficulty: string): boolean => {
  if (!ALLOWED_DIFFICULTIES.includes(difficulty)) return false;
  return true;
};
