import { useSearchParams } from "react-router-dom";

// Компонент для отображения пагинации
export const Pagination = ({ itemsPerPage, totalItems }) => {
  const pageNumbers = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const totalPages = Math.ceil((totalItems || 0) / itemsPerPage);
  if (totalPages <= 1) return null;

  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  const goToPage = (n) => {
    const params = Object.fromEntries([...searchParams]);
    params.page = String(n);
    setSearchParams(params);
  };

  return (
    <div className="w-full flex items-center justify-center p-5">
      <ul className="flex gap-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => goToPage(number)}
              className={`
            w-10 h-10 flex items-center justify-center rounded-full border cursor-pointer
            transition-colors duration-200
            ${
              currentPage === number
                ? "text-white"
                : "text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
            }
          `}
              style={
                currentPage === number
                  ? { backgroundColor: "var(--primary-color)" }
                  : {}
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
