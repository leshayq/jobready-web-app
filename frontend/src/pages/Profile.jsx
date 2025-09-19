import { useState } from "react";
import { useInterviews } from "../hooks/useInterviews";
import { Outlet, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { ConfirmDeleteForm } from "../forms/ConfirmDeleteForm";
import { deleteInterviewRequest } from "../api/interviewRequests/interviewRequests";
import { useNotification } from "../context/NotificationContext";
import { ProfileNavButton } from "../components/buttons/ProfileNavButton";
import { logoutUser } from "../api/auth/logout";

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    try {
      const response = logoutUser();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Помилка при спробі виходу з акаунту", error);
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
      <h2 className="text-3xl font-semibold text-[var(--primary-color)] !mx-5 !mt-8 !mb-4 text-center sm:text-left">
        Особистий кабінет
      </h2>
      <div className="mx-5 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg block sm:flex">
        <div className="flex flex-col items-center sm:items-start gap-2 min-w-48">
          <ProfileNavButton text="Кабінет" link={"/profile"}></ProfileNavButton>
          <ProfileNavButton
            text="Співбесіди"
            link={"interviews"}
          ></ProfileNavButton>
          <button
            className="bg-white !font-medium cursor-pointer text-gray-500 flex text-md gap-3 p-2.5 rounded-2xl hover:bg-gray-100 hover:text-[var(--primary-color)] transition-colors duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Вийти з акаунту
          </button>
        </div>

        <div className="flex-grow min-w-0">
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
