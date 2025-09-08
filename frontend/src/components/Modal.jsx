// Компонент для отображения модального окна
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          className="close-button hover:text-[var(--primary-color)]"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
