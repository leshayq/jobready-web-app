import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { StackOverflowCard } from "../components/StackOverflowCard";

const BASE_URL =
  "https://api.stackexchange.com/2.3/search?pagesize=100&order=desc&sort=activity&site=stackoverflow";

export const StackOverflow = () => {
  const [search, setSearch] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleSearch = async (query) => {
    if (query === "") {
      // alert("Введите запрос");
      setQuestions([]);
    } else {
      const response = await fetch(`${BASE_URL}&intitle=${query}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuestions(data.items);
      console.log(data.items);
    }
  };

  useEffect(() => {
    document.title = "Stack Overflow";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto mb-6 flex gap-5 items-center">
        <input
          type="text"
          placeholder="Пошук"
          className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="cursor-pointer" onClick={() => handleSearch(search)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q) => (
          <StackOverflowCard question={q}></StackOverflowCard>
        ))}
      </div>
    </div>
  );
};
