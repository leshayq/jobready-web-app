import { useEffect, useState } from "react";
import {
  findAllQuestions,
  findByTag,
  findByTitle,
} from "../api/questions/questions";
import { useSearchParams } from "react-router-dom";
import { findAllTags } from "../api/tags/tags";

// Хук для получения списка вопросов с возможностью фильтрации по тегу или поиску по названию
export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [filterButtons, setFilterButtons] = useState([]);
  const [loading, setLoading] = useState(true);

  const questionsPerPage = 2;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const filterButtons = await findAllTags();

        setFilterButtons(filterButtons?.data?.data ?? []);
      } catch (error) {
        console.error("Помилка при отриманні списку тегів", error);
        setFilterButtons([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const searchValue = searchParams.get("search") || "";
      const pageValue = parseInt(searchParams.get("page") || "1", 10);
      const tagValue = searchParams.get("tag") || "";

      let response;
      try {
        if (tagValue) {
          response = await findByTag(pageValue, tagValue, questionsPerPage);
        } else if (searchValue) {
          response = await findByTitle(
            pageValue,
            searchValue,
            questionsPerPage
          );
        } else {
          response = await findAllQuestions(pageValue, questionsPerPage);
        }
        setQuestions(response?.data?.data?.items ?? []);
        setTotalQuestions(response?.data?.data?.pagination?.total ?? 0);
      } catch (error) {
        console.error("Помилка при отриманні списку питань", error);
        setQuestions([]);
        setTotalQuestions(0);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [searchParams]);

  return {
    questions,
    loading,
    totalQuestions,
    questionsPerPage,
    filterButtons,
  };
};
