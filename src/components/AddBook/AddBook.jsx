import { useState } from "react";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import "./AddBook.css";

function AddBook() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    type: "",
    description: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!bookData.title || !bookData.author) {
      setError("Title and Author are required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  // Reset form after successful submission
  const resetForm = () => {
    setBookData({
      title: "",
      author: "",
      genre: "",
      type: "",
      description: "",
    });
    setCoverImage(null);
    setCoverPreview(null);
    setShowConfirmation(false);
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
          <h2>Confirmation</h2>
          <p>
            <strong>Book:</strong> {bookData.title}
            <br />
            <strong>Category:</strong> {bookData.genre || "Not specified"}
            <br />
            <strong>Has been added</strong>
          </p>
          <button className="done-button" onClick={resetForm}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-book-container">
      <h1 className="page-title">ADD BOOK</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-grid">
          <div className="cover-upload-section">
            <div
              className="cover-upload-area"
              onClick={() => document.getElementById("cover-upload").click()}
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Book cover preview"
                  className="cover-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <FaPlus />
                  <p>Cover</p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
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
            {isSubmitting ? "Adding..." : "ADD"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
