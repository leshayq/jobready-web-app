import { useEffect, useState } from "react";
import { findAllInterviewRequests } from "../api/interviewRequests/interviewRequests";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Хук для получения списка собеседований с возможностью фильтрации по пользователю
export const useInterviews = (onlyUser = false) => {
  const [interviews, setInterviews] = useState([]);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const interviewsPerPage = 2;

  const [searchParams, setSearchParams] = useSearchParams();

  const load = async () => {
    setLoading(true);
    let response;

    const pageValue = parseInt(searchParams.get("page") || "1", 10);

    try {
      if (!onlyUser) {
        response = await findAllInterviewRequests(pageValue, interviewsPerPage);
        setInterviews(response.data.data.items);
        setTotalInterviews(response.data.data.pagination.total);
      } else {
        if (isAuthenticated) {
          response = await findAllInterviewRequests(
            pageValue,
            interviewsPerPage,
            user.id
          );
          setInterviews(response?.data?.data?.items ?? []);
          setTotalInterviews(response?.data?.data?.pagination?.total ?? 0);
        }
      }
    } catch (error) {
      console.error("Помилка при отриманні списку співбесід", error);
      setInterviews([]);
      setTotalInterviews(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [searchParams]);

  return {
    interviews,
    loading,
    totalInterviews,
    interviewsPerPage,
    reload: load,
  };
};
