import { DeleteButton } from "../components/DeleteButton";

export const ConfirmDeleteForm = ({ onClose, onDeleteConfirm, itemId }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-2">
        <h2 className="text-xl font-semibold text-gray-800 text-center !mb-6">
          Підтвердіть видалення
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Ви дійсно хочете видалити цей елемент? Цю дію не можна буде скасувати.
        </p>

        <div className="flex justify-end gap-3 mt-10">
          <button
            className="bg-gray-200 px-4 py-2 rounded-xl text-gray-900 transition cursor-pointer"
            onClick={onClose}
          >
            Відмінити
          </button>
          <DeleteButton
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow"
            func={() => onDeleteConfirm(itemId)}
            type={"full"}
          >
            Видалити
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};
