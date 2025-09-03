export const DifficultyTag = ({ difficulty }) => {
  return (
    <div>
      {difficulty === "Junior" && (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Junior
        </span>
      )}
      {difficulty === "Middle" && (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          Middle
        </span>
      )}
      {difficulty === "Senior" && (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
          Senior
        </span>
      )}
    </div>
  );
};
