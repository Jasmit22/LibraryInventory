import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import { addBook } from "../../services/BookService";
import "./AddBook.css";

function AddBook() {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    type: "",
    description: "",
    isbn: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [addedBook, setAddedBook] = useState(null);

  // Handle input changes
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
    if (!bookData.title || !bookData.author) {
      setError("Title and Author are required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Add the book with placeholder image
      const newBook = await addBook({
        ...bookData,
        imageUrl: "/images/books/placeholder.jpg",
      });

      setAddedBook(newBook);
      setIsSubmitting(false);
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to add book: " + err.message);
      setIsSubmitting(false);
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setBookData({
      title: "",
      author: "",
      genre: "",
      type: "",
      description: "",
      isbn: "",
    });
    setShowConfirmation(false);
    setAddedBook(null);
  };

  // Navigate to book search after adding
  const goToBookSearch = () => {
    navigate("/book-search");
  };

  // If showing confirmation screen
  if (showConfirmation) {
    return (
      <div className="add-book-container">
        <h1 className="page-title">Add Book</h1>

        <div className="confirmation-container">
          <div className="confirmation-icon">
            <FaCheck />
          </div>
          <h2>Book Added Successfully</h2>
          <p>
            <strong>Title:</strong> {addedBook.title}
            <br />
            <strong>Author:</strong> {addedBook.author}
            <br />
            <strong>Genre:</strong> {addedBook.genre || "Not specified"}
            <br />
            <strong>Type:</strong> {addedBook.type || "Not specified"}
          </p>
          <div className="confirmation-buttons">
            <button className="done-button" onClick={resetForm}>
              <FaPlus /> Add Another Book
            </button>
            <button className="search-button" onClick={goToBookSearch}>
              Go to Book Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-book-container">
      <h1 className="page-title">Add Book</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-grid">
          <div className="cover-upload-section">
            <div className="cover-upload-area">
              <div className="upload-placeholder">
                <FaPlus />
                <p>Cover</p>
                <p className="small-text">(Placeholder will be used)</p>
              </div>
            </div>
          </div>

          <div className="book-details-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bookData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={bookData.type}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={bookData.genre}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="isbn">ISBN:</label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={bookData.isbn}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={bookData.description}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="add-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <FaPlus className="button-icon" />
                Add Book
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
