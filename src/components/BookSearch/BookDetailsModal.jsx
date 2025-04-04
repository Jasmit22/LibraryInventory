import Modal from "../common/Modal/Modal";
import "./BookDetailsModal.css";

function BookDetailsModal({ book, isOpen, onClose }) {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={book.title} size="xlarge">
      <div className="book-details-grid">
        <div className="book-cover-column">
          <div className="book-cover">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="book-detail-image"
            />
          </div>

          <div className="book-status-container">
            <div className="detail-item status-item">
              <span className="detail-label">Status</span>
              <span
                className={`status-badge ${
                  book.isAvailable ? "available" : "unavailable"
                }`}
              >
                {book.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        <div className="book-details">
          <div className="book-main-details">
            <div className="detail-item">
              <span className="detail-label">Author</span>
              <span className="detail-value">{book.author}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">ISBN</span>
              <span className="detail-value">{book.isbn || "N/A"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Genre</span>
              <span className="detail-value">{book.genre || "N/A"}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">{book.type || "N/A"}</span>
            </div>
          </div>

          <div className="inventory-section">
            <h3 className="section-title">Inventory Information</h3>
            <div className="inventory-details">
              <div className="inventory-stat">
                <span className="inventory-label">Total Copies</span>
                <span className="inventory-value">
                  {book.inventory?.totalCopies || 0}
                </span>
              </div>
              <div className="inventory-stat">
                <span className="inventory-label">Available</span>
                <span className="inventory-value">
                  {book.inventory?.availableCopies || 0}
                </span>
              </div>
              <div className="inventory-stat">
                <span className="inventory-label">Checked Out</span>
                <span className="inventory-value">
                  {book.inventory?.checkedOutCopies || 0}
                </span>
              </div>
              <div className="inventory-stat">
                <span className="inventory-label">Waitlist</span>
                <span className="inventory-value">
                  {book.inventory?.waitlistCount || 0}
                </span>
              </div>
            </div>
          </div>

          {book.description && (
            <div className="description-section">
              <h3 className="section-title">Description</h3>
              <p className="book-description">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default BookDetailsModal;
