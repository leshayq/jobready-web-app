import { NavLink } from "react-router-dom";

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
