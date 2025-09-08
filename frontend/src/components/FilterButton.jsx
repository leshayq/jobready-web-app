// Кнопка для фильтрации по тегам. Используется на странице со списком вопросов
export const FilterButton = ({ title, onFilter }) => {
  return (
    <button
      onClick={() => onFilter(title)}
      className="!font-medium rounded-3xl bg-gray-200 text-gray-600 py-1.5 px-4 cursor-pointer hover:text-black transition-colors ease-in-out duration-200"
    >
      {title}
    </button>
  );
};
