import { Link } from "react-router-dom";

// Кнопка навигации в личном кабинете пользователя для перехода между страницами профиля
export const ProfileNavButton = ({ text, link }) => {
  return (
    <Link to={link}>
      <div className="bg-white text-gray-500 flex text-md gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out">
        {text}
      </div>
    </Link>
  );
};
