import { Link } from "react-router-dom";
import { DifficultyTag } from "./DifficultyTag";

export const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col min-h-64 transition-transform hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/questions/${question.id}`}>
        <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">
          {question.title}
        </h3>
      </Link>

      {question.answer && (
        <p className="text-ellipsis line-clamp-2 text-gray-600 text-sm">
          {question.answer.text}
        </p>
      )}

      <div className="flex justify-between mt-auto items-center">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <div className="flex flex-wrap gap-2" key={tag.id}>
              <span className="bg-[var(--primary-color)] text-white text-xs px-3 py-1 rounded-full">
                {tag.title}
              </span>
            </div>
          ))}
        </div>
        <DifficultyTag difficulty={question.difficulty}></DifficultyTag>
      </div>
    </div>
  );
};
