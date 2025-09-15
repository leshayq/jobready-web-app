import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DifficultyTag } from "../components/DifficultyTag";
import { useAuth } from "../context/AuthContext";
import { useInterviews } from "../hooks/useInterviews";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { InterviewsTable } from "../components/InterviewsTable";

export const Interviews = () => {
  const { interviews, loading, totalInterviews, interviewsPerPage, error } =
    useInterviews();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {loading && <Loader></Loader>}
      <div className="mx-5 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold text-[var(--primary-color)]">
            Заплановані співбесіди
          </h2>

          {isAuthenticated ? (
            <Link
              to={"/interviews/new"}
              className="p-3 rounded-full !bg-[var(--primary-color)] text-white shadow-md 
         hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <InterviewsTable
            interviews={interviews}
            isPublic={true}
          ></InterviewsTable>
        </div>
        {error && (
          <p className="text-red-600 font-bold text-sm mt-2">{error}</p>
        )}
      </div>

      <Pagination
        itemsPerPage={interviewsPerPage}
        totalItems={totalInterviews}
      ></Pagination>
    </div>
  );
};
