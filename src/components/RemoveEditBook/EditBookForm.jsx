import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";

function EditBookForm({
  selectedBook,
  editFormData,
  handleEditInputChange,
  handleEditSubmit,
  handleDeleteClick,
  handleCloseEditModal,
}) {
  return (
    <div className="edit-modal-content">
      <div className="book-preview">
        <img
          src={selectedBook?.imageUrl}
          alt={selectedBook?.title}
          className="book-preview-image"
        />
      </div>
      <form onSubmit={handleEditSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editFormData.title}
                onChange={handleEditInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={editFormData.author}
                onChange={handleEditInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN:</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={editFormData.isbn}
                onChange={handleEditInputChange}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={editFormData.genre}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={editFormData.type}
                onChange={handleEditInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleEditInputChange}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteClick}
          >
            <FaTrash /> Remove
          </button>
          <div className="right-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCloseEditModal}
            >
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="save-button">
              <FaCheck /> Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBookForm;
