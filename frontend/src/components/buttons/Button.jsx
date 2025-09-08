// Основная кнопка
export const Button = ({ title, onClickEvent }) => {
  return (
    <button
      onClick={onClickEvent ? onClickEvent : undefined}
      className="bg-[var(--primary-color)] text-white py-1 px-4 sm:py-3 sm:px-7 cursor-pointer outline-0 border-4 border-solid border-[var(--primary-color)] rounded-3xl hover:bg-[var(--primary-hover-color)] hover:border-[var(--primary-hover-color)] transition-colors duration-200"
    >
      {title}
    </button>
  );
};
