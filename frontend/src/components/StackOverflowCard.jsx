import { Link } from "react-router-dom";

export const StackOverflowCard = ({ question }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
      <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">
        {question.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3">
        {question.owner.display_name}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">Stack Overflow</span>

        <Link
          to={question.link}
          className="text-indigo-500 hover:underline text-sm font-medium"
        >
          Читати →
        </Link>
      </div>
    </div>
  );
};
