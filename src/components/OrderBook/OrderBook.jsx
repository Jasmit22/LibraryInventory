import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaCheck,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaTruck,
  FaBook,
} from "react-icons/fa";
import { lookupBookByISBN } from "../../services/BookService";
import Modal from "../common/Modal/Modal";
import "./OrderBook.css";

function OrderBook() {
  const [isbnLookup, setIsbnLookup] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupSuccess, setLookupSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    type: "",
    imageUrl: "",
    quantity: 1,
    supplier: "",
    expectedArrival: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderedBook, setOrderedBook] = useState(null);

  // Handle ISBN lookup
  const handleIsbnLookup = async (e) => {
    e.preventDefault();

    if (!isbnLookup.trim()) {
      setError("Please enter an ISBN to lookup");
      return;
    }

    setIsLookingUp(true);
    setError("");
    setLookupSuccess(false);

    try {
      const bookInfo = await lookupBookByISBN(isbnLookup.trim());

      // Populate the form with the book data
      setBookData({
        ...bookData,
        title: bookInfo.title,
        author: bookInfo.author,
        genre: bookInfo.genre || "",
        type: bookInfo.type || "",
        isbn: bookInfo.isbn || isbnLookup.trim(),
        imageUrl: bookInfo.imageUrl || "",
      });

      setIsbnLookup("");
      setLookupSuccess(true);
    } catch (err) {
      setError("Failed to lookup ISBN: " + err.message);
    } finally {
      setIsLookingUp(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.supplier ||
      !bookData.expectedArrival
    ) {
      setError(
        "Title, Author, Supplier, and Expected Arrival Date are required fields"
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call to order book
      // In a real app, you would call an API endpoint to place the order
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newOrder = {
        ...bookData,
        id: Date.now(), // Generate a temporary ID
        orderDate: new Date().toISOString(),
        status: "Ordered",
        origin: bookData.supplier,
      };

      setOrderedBook(newOrder);
      setIsSubmitting(false);
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to place order: " + (err.message || "Unknown error"));
      setIsSubmitting(false);
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setBookData({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      type: "",
      imageUrl: "",
      quantity: 1,
      supplier: "",
      expectedArrival: "",
      notes: "",
    });
    setShowConfirmation(false);
    setOrderedBook(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Close confirmation modal
  const closeConfirmation = () => {
    setShowConfirmation(false);
    resetForm();
  };

  return (
    <div className="order-book-container">
      <h1 className="page-title">Order Book</h1>
      <p className="page-description">
        Order new books for the library collection
      </p>

      {/* ISBN Lookup Section */}
      <div className="order-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaSearch /> ISBN Lookup
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleIsbnLookup} className="isbn-lookup-form">
            <div className="isbn-input-group">
              <FaSearch className="isbn-search-icon" />
              <input
                type="text"
                value={isbnLookup}
                onChange={(e) => setIsbnLookup(e.target.value)}
                placeholder="Enter ISBN to lookup book details"
                className="isbn-input"
              />
            </div>
            <button
              type="submit"
              className="isbn-lookup-button"
              disabled={isLookingUp}
            >
              {isLookingUp ? (
                <>
                  <span className="spinner"></span>
                  Looking...
                </>
              ) : (
                "Lookup"
              )}
            </button>
          </form>
          {lookupSuccess && (
            <div className="success-notification">
              <FaCheck /> Book details successfully populated
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* Order Form */}
      <div className="order-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaPlus /> Order Details
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-grid">
              {/* Book Cover Preview */}
              <div className="cover-preview-section">
                <div className="cover-preview">
                  {bookData.imageUrl ? (
                    <img
                      src={bookData.imageUrl}
                      alt={bookData.title || "Book cover"}
                      className="cover-image"
                    />
                  ) : (
                    <div className="no-cover">
                      <FaBook className="no-cover-icon" />
                      <span>No Cover</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-fields-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={bookData.title}
                      onChange={handleInputChange}
                      placeholder="Book title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Author *</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={bookData.author}
                      onChange={handleInputChange}
                      placeholder="Book author"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={bookData.isbn}
                      onChange={handleInputChange}
                      placeholder="ISBN"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input
                      type="text"
                      id="genre"
                      name="genre"
                      value={bookData.genre}
                      onChange={handleInputChange}
                      placeholder="Book genre"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                      id="type"
                      name="type"
                      value={bookData.type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select type</option>
                      <option value="Hardcover">Hardcover</option>
                      <option value="Paperback">Paperback</option>
                      <option value="E-book">E-book</option>
                      <option value="Audiobook">Audiobook</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity *</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={bookData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="supplier">Supplier *</label>
                    <input
                      type="text"
                      id="supplier"
                      name="supplier"
                      value={bookData.supplier}
                      onChange={handleInputChange}
                      placeholder="Supplier name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expectedArrival">
                      Expected Arrival Date *
                    </label>
                    <input
                      type="date"
                      id="expectedArrival"
                      name="expectedArrival"
                      value={bookData.expectedArrival}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes about this order"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <FaTruck /> Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        title="Order Placed Successfully"
        size="medium"
      >
        <div className="order-confirmation">
          <div className="confirmation-icon">
            <FaCheck />
          </div>
          <h3 className="confirmation-title">Book Order Placed</h3>
          <p className="confirmation-message">
            Your order has been successfully placed and will be tracked in the
            Deliveries section.
          </p>

          <div className="order-details-grid">
            <div className="order-image-container">
              {orderedBook?.imageUrl ? (
                <img
                  src={orderedBook.imageUrl}
                  alt={orderedBook.title}
                  className="order-image"
                />
              ) : (
                <div className="no-image-placeholder">
                  <FaBook />
                </div>
              )}
            </div>
            <div className="order-info">
              <h4 className="book-title">{orderedBook?.title}</h4>
              <p className="book-author">by {orderedBook?.author}</p>

              <div className="order-detail-item">
                <FaTruck className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Supplier:</span>
                  <span className="detail-value">{orderedBook?.supplier}</span>
                </div>
              </div>

              <div className="order-detail-item">
                <FaCalendarAlt className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Expected Arrival:</span>
                  <span className="detail-value">
                    {orderedBook?.expectedArrival
                      ? formatDate(orderedBook.expectedArrival)
                      : "Not specified"}
                  </span>
                </div>
              </div>

              <div className="order-detail-item">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">
                  {orderedBook?.quantity} copies
                </span>
              </div>

              {orderedBook?.genre && (
                <div className="order-detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{orderedBook.genre}</span>
                </div>
              )}

              {orderedBook?.type && (
                <div className="order-detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{orderedBook.type}</span>
                </div>
              )}
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="primary-button" onClick={closeConfirmation}>
              Place Another Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OrderBook;
