import { useInterviews } from "../hooks/useInterviews";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { InterviewsTable } from "../components/InterviewsTable";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { useOutletContext } from "react-router-dom";

export const ProfileInterviews = () => {
  const {
    setIsModalOpen,
    setItemIdToDelete,
    interviews,
    loading,
    totalInterviews,
    interviewsPerPage,
  } = useOutletContext();

  if (loading) {
    return <Loader></Loader>;
  }

  const openModalFunc = (itemId) => {
    setItemIdToDelete(itemId);
    setIsModalOpen("Видалити");
  };

  return (
    <div className="overflow-x-auto">
      <p className="px-3 py-3 text-gray-500 text-md">Ваші співбесіди</p>
      <InterviewsTable
        interviews={interviews}
        openModalFunc={openModalFunc}
        isPublic={false}
      ></InterviewsTable>
      <Pagination
        itemsPerPage={interviewsPerPage}
        totalItems={totalInterviews}
      ></Pagination>
    </div>
  );
};
