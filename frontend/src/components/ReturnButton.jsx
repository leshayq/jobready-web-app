import { Link } from "react-router-dom";

export const ReturnButton = ({ link }) => {
  return (
    <Link className="mb-7" to={link}>
      <div className="bg-white text-gray-500 flex text-md justify-center gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out">
        <div>⟵</div>
        Повернутися
      </div>
    </Link>
  );
};
