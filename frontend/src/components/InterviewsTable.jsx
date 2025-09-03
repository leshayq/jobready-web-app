import { DifficultyTag } from "../components/DifficultyTag";
import { DeleteButton } from "./DeleteButton";

export const InterviewsTable = ({ interviews, openModalFunc, isPublic }) => {
  return (
    <table className="min-w-full divide-y divide-gray-100">
      <thead className="bg-gray-50">
        <tr className="text-left">
          <th className="px-4 py-3 text-sm font-medium text-gray-600">Назва</th>
          <th className="px-4 py-3 text-sm font-medium text-gray-600">
            Рівень
          </th>
          <th className="px-4 py-3 text-sm font-medium text-gray-600">Тема</th>
          <th className="px-4 py-3 text-sm font-medium text-gray-600">
            Користувач
          </th>
          <th className="px-4 py-3 text-sm font-medium text-gray-600">Дата</th>
          {!isPublic && (
            <th className="px-4 py-3 text-sm font-medium text-gray-600">Дії</th>
          )}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-100">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <tr
              key={interview.id}
              className="hover:bg-gray-50 transition-colors text-left"
            >
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-800">
                  {interview.title}
                </div>
                <div className="text-xs text-gray-400">№{interview.id}</div>
              </td>

              <td className="px-4 py-3 text-left">
                <DifficultyTag
                  difficulty={interview.difficulty}
                ></DifficultyTag>
              </td>

              <td className="px-4 py-3 text-sm text-gray-700">
                {interview.theme}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {interview.author.username}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {interview.date}
              </td>
              {!isPublic && (
                <td className="px-4 py-3 text-sm text-gray-500">
                  <DeleteButton
                    func={() => openModalFunc(interview.id)}
                    type={"icon"}
                  ></DeleteButton>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={6}
              className="px-4 py-8 text-center text-sm text-gray-400"
            >
              Немає записів
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
