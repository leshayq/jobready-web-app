import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FilterButton } from "../components/FilterButton";
import { QuestionCard } from "../components/QuestionCard";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { findAllTags } from "../api/tags/tags";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { useQuestions } from "../hooks/useQuestions";

export const Questions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterButtons, setFilterButtons] = useState([]);
  const [search, setSearch] = useState("");
  const { questions, loading, totalQuestions, questionsPerPage } =
    useQuestions();

  const handleFilter = async (filter) => {
    if (filter === "Всі") {
      setSearchParams({ page: 1 });
      return;
    } else {
      setSearchParams({ page: 1, tag: filter });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    setSearchParams({ page: 1, search: query });
  };

  useEffect(() => {
    const load = async () => {
      const filterButtons = await findAllTags();

      setFilterButtons(filterButtons.data.data);
    };

    load();
  }, []);

  useEffect(() => {
    document.title = "Питання";
  }, []);

  return (
    <section className="mx-5">
      <div className="flex gap-3 flex-wrap mt-5">
        <FilterButton title="Всі" onFilter={handleFilter}></FilterButton>
        {filterButtons.map((fb) => (
          <FilterButton
            title={fb.title}
            key={fb.id}
            onFilter={handleFilter}
          ></FilterButton>
        ))}
      </div>

      <div className="flex items-center mt-5">
        <div class="flex items-center w-80 pr-3 gap-2 bg-gray-200 h-[46px] rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Пошук питань"
            class="w-full h-full pl-4 rounded-full outline-none placeholder-gray-600 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            onClick={() => handleSearch(search)}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="22"
              height="22"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </button>
        </div>

        <button
          className="!ml-3 bg-gray-200 p-3 rounded-full cursor-pointer"
          onClick={() => {
            setSearch("");
            handleSearch("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#6B7280"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {loading && <Loader></Loader>}
      {!loading && (
        <div className="grid gap-4 mt-4 grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {questions.map((q) => {
            return <QuestionCard question={q} key={q.id}></QuestionCard>;
          })}
        </div>
      )}

      <Pagination
        itemsPerPage={questionsPerPage}
        totalItems={totalQuestions}
      ></Pagination>
    </section>
  );
};
