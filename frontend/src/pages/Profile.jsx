import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Pagination } from "../components/Pagination";
import { useInterviews } from "../hooks/useInterviews";
import { Link } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import { Modal } from "../components/Modal";
import { ConfirmDeleteForm } from "../forms/ConfirmDeleteForm";
import { deleteInterviewRequest } from "../api/interviewRequests/interviewRequests";
import { useNotification } from "../context/NotificationContext";

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const { showNotification } = useNotification();
  const { interviews, loading, totalInterviews, interviewsPerPage, reload } =
    useInterviews(true);

  const handleDelete = async (itemId) => {
    try {
      await deleteInterviewRequest(itemId);

      setIsModalOpen(null);
      setItemIdToDelete(null);
      await reload();
      showNotification("Співбесіду успішно видалено", true);

      return;
    } catch (error) {
      console.error("Помилка при видаленні співбесіди", error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen === "Видалити"}
        onClose={() => setIsModalOpen(null)}
      >
        <ConfirmDeleteForm
          onClose={() => setIsModalOpen(null)}
          onDeleteConfirm={handleDelete}
          itemId={itemIdToDelete}
        ></ConfirmDeleteForm>
      </Modal>
      <h2 className="text-3xl font-semibold text-[var(--primary-color)] !mx-5 !mt-8 !mb-4">
        Особистий кабінет
      </h2>
      <div className="mx-5 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg flex">
        <div className="flex flex-col gap-2 min-w-48">
          <Link to="/profile">
            <div className="bg-white text-gray-500 flex text-md gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out">
              Кабінет
            </div>
          </Link>
          <Link to="interviews">
            <div className="bg-white text-gray-500 flex text-md gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out">
              {/* <div>⟵</div> */}
              Співбесіди
            </div>
          </Link>
          <Link to="/">
            <div className="bg-white text-gray-500 flex text-md gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out">
              {/* <div>⟵</div> */}
              Вийти з акаунту
            </div>
          </Link>
        </div>

        <div className="flex-grow">
          <Outlet
            context={{
              isModalOpen,
              setIsModalOpen,
              itemIdToDelete,
              setItemIdToDelete,
              interviews,
              loading,
              totalInterviews,
              interviewsPerPage,
            }}
          ></Outlet>
        </div>
      </div>
    </div>
  );
};
