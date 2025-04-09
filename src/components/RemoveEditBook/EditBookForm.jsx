import { FaTrash, FaCheck, FaTimes, FaTag, FaBook } from "react-icons/fa";

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
              <label htmlFor="genre">
                <FaTag /> Genre:
              </label>
              <select
                id="genre"
                name="genre"
                value={editFormData.genre}
                onChange={handleEditInputChange}
              >
                <option value="">Select genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Children">Children</option>
                <option value="Young Adult">Young Adult</option>
                <option value="Classic">Classic</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Science">Science</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">
                <FaBook /> Type:
              </label>
              <select
                id="type"
                name="type"
                value={editFormData.type}
                onChange={handleEditInputChange}
              >
                <option value="">Select type</option>
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="E-book">E-book</option>
                <option value="Audiobook">Audiobook</option>
              </select>
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
