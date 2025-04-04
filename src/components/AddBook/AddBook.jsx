import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaCheck,
  FaEdit,
  FaSearch,
  FaBook,
  FaExclamationTriangle,
  FaBarcode,
} from "react-icons/fa";
import { addBook, lookupBookByISBN } from "../../services/BookService";
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
  const [isbnLookup, setIsbnLookup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [addedBook, setAddedBook] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  // Handle ISBN lookup
  const handleIsbnLookup = async (e) => {
    e.preventDefault();

    if (!isbnLookup.trim()) {
      setError("Please enter an ISBN to lookup");
      return;
    }

    setIsLookingUp(true);
    setError("");

    try {
      const bookInfo = await lookupBookByISBN(isbnLookup.trim());

      // Populate the form with the book data
      setBookData({
        title: bookInfo.title,
        author: bookInfo.author,
        genre: bookInfo.genre || "",
        type: bookInfo.type || "",
        description: bookInfo.description || "",
        isbn: bookInfo.isbn || isbnLookup.trim(),
      });

      setIsbnLookup("");
    } catch (err) {
      setError("Failed to lookup ISBN: " + err.message);
    } finally {
      setIsLookingUp(false);
    }
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
      // Add default inventory values
      const bookWithInventory = {
        ...bookData,
        isAvailable: true,
        inventory: {
          totalCopies: 3,
          availableCopies: 3,
          checkedOutCopies: 0,
          waitlistCount: 0,
          lastCheckedOut: null,
        },
      };

      const newBook = await addBook(bookWithInventory);

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

  // Return to editing the added book
  const keepEditing = () => {
    // Set the form data to the added book's data
    setBookData({
      title: addedBook.title,
      author: addedBook.author,
      genre: addedBook.genre || "",
      type: addedBook.type || "",
      description: addedBook.description || "",
      isbn: addedBook.isbn || "",
    });
    // Hide confirmation screen
    setShowConfirmation(false);
  };

  // Add this function to simulate scanning
  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning process
    setTimeout(() => {
      // Generate a random ISBN
      const randomISBN =
        "978" +
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join(
          ""
        );

      // Create sample book data
      const sampleBookData = {
        title: "The Quantum Universe",
        author: "Brian Cox & Jeff Forshaw",
        genre: "Science",
        type: "Hardcover",
        description:
          "In The Quantum Universe, Brian Cox and Jeff Forshaw approach the world of quantum mechanics in the same way they did in Why Does E=mc2? and make fundamental scientific principles accessible—and fascinating—to everyone.",
        isbn: randomISBN,
      };

      // Populate all fields with sample data
      setBookData(sampleBookData);
      setIsScanning(false);
    }, 1500);
  };

  // Add this function after your other handler functions (around line 176)
  const handleCoverUploadClick = () => {
    setShowUploadMessage(true);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setShowUploadMessage(false);
    }, 3000);
  };

  // Add this component after your other handler functions
  const FileExplorerMessage = () => {
    return (
      <div className="file-explorer-message">
        Your file explorer would open here. Feature under development.
      </div>
    );
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
          <div className="confirmation-details">
            <div className="detail-item">
              <span className="detail-label">Title</span>
              <span className="detail-value">{addedBook.title}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Author</span>
              <span className="detail-value">{addedBook.author}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Genre</span>
              <span className="detail-value">
                {addedBook.genre || "Not specified"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">
                {addedBook.type || "Not specified"}
              </span>
            </div>
          </div>
          <div className="confirmation-buttons">
            <button className="edit-button" onClick={keepEditing}>
              <FaEdit /> Keep Editing
            </button>
            <button className="done-button" onClick={resetForm}>
              <FaPlus /> Add Another Book
            </button>
            <button className="search-button" onClick={goToBookSearch}>
              <FaSearch /> Go to Book Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-book-container">
      <h1 className="page-title">Add Book</h1>

      {/* ISBN Lookup Section */}
      <div className="isbn-lookup-section">
        <h2 className="section-title">Add by ISBN</h2>
        <form onSubmit={handleIsbnLookup} className="isbn-lookup-form">
          <div className="isbn-input-wrapper">
            <FaSearch className="isbn-search-icon" />
            <input
              type="text"
              value={isbnLookup}
              onChange={(e) => setIsbnLookup(e.target.value)}
              placeholder="Enter ISBN to auto-fill book details"
              className="isbn-input"
            />
            <button
              type="submit"
              className="isbn-lookup-button"
              disabled={isLookingUp}
            >
              {isLookingUp ? (
                <>
                  <span className="spinner"></span>
                  Looking up...
                </>
              ) : (
                "Lookup"
              )}
            </button>
          </div>
          <button
            type="button"
            className={`scan-button ${isScanning ? "scan-animation" : ""}`}
            onClick={handleScan}
            disabled={isScanning}
          >
            <FaBarcode />
            {isScanning ? "Scanning..." : "Scan Book"}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-grid">
          <div className="cover-upload-section">
            <div className="cover-upload-area" onClick={handleCoverUploadClick}>
              <div className="upload-placeholder">
                <FaBook className="book-icon" />
                <p>Upload Cover</p>
                <p className="small-text">(Click to upload)</p>
              </div>
            </div>
            {showUploadMessage && <FileExplorerMessage />}
          </div>

          <div className="book-details-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bookData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter book title"
                />
              </div>

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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter author name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={bookData.genre}
                  onChange={handleInputChange}
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
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={bookData.isbn}
                  onChange={handleInputChange}
                  placeholder="Enter ISBN (optional)"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={bookData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter book description"
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
