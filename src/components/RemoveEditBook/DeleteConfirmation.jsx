import { FaTrash, FaTimes } from "react-icons/fa";

function DeleteConfirmation({
  selectedBook,
  handleCloseDeleteModal,
  handleDeleteConfirm,
}) {
  return (
    <div className="delete-modal-content">
      <p>
        Are you sure you want to remove <strong>{selectedBook?.title}</strong>{" "}
        by <strong>{selectedBook?.author}</strong> from the library system?
      </p>
      <p className="warning-text">This action cannot be undone.</p>
      <div className="modal-actions">
        <button className="cancel-button" onClick={handleCloseDeleteModal}>
          <FaTimes /> Cancel
        </button>
        <button className="delete-confirm-button" onClick={handleDeleteConfirm}>
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
