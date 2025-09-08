import { NavLink } from "react-router-dom";

// Навигационная кнопка. Если type="footer", кнопка будет белая, иначе черная.
// Используется в навбаре сайта и в футере.
export const NavButton = ({ title, link, type }) => {
  return (
    <li>
      <NavLink
        to={`/${link}`}
        className={({ isActive }) =>
          `
    no-underline transition-colors duration-200 ${
      type === "footer"
        ? "text-white hover:underline"
        : isActive
        ? "text-[var(--primary-color)]"
        : "text-black hover:text-[var(--primary-color)]"
    }`
        }
      >
        {title}
      </NavLink>
    </li>
  );
};
