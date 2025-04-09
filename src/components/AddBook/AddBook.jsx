import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaCheck,
  FaEdit,
  FaSearch,
  FaBook,
  FaExclamationTriangle,
  FaBarcode,
  FaTag,
  FaUser,
  FaInfoCircle,
  FaBookOpen,
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
  const [isbnError, setIsbnError] = useState("");
  const [addedBook, setAddedBook] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  const [lookupSuccess, setLookupSuccess] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Example valid ISBN
  const validISBN = "9780525559474";

  // Clear success messages after 3 seconds
  useEffect(() => {
    let timer;
    if (lookupSuccess || scanSuccess) {
      timer = setTimeout(() => {
        setLookupSuccess(false);
        setScanSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [lookupSuccess, scanSuccess]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special validation for ISBN field
    if (name === "isbn") {
      // Only allow numbers - filter out non-numeric characters
      const numericValue = value.replace(/\D/g, "");

      // Update the bookData with the filtered value
      setBookData({
        ...bookData,
        [name]: numericValue,
      });
    } else {
      // For other fields, update normally
      setBookData({
        ...bookData,
        [name]: value,
      });
    }
  };

  // Handle ISBN lookup input change
  const handleIsbnLookupChange = (e) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, "");
    setIsbnLookup(numericValue);
  };

  // Handle ISBN lookup
  const handleIsbnLookup = async (e) => {
    e.preventDefault();

    if (!isbnLookup.trim()) {
      setError("Please enter an ISBN to lookup");
      return;
    }

    // Validate ISBN format (only numbers)
    if (!/^\d+$/.test(isbnLookup.trim())) {
      setError("ISBN must contain only numbers");
      return;
    }

    // Check if it matches the valid ISBN
    if (isbnLookup.trim() !== validISBN) {
      setError(`Invalid ISBN. Try using the example: ${validISBN}`);
      return;
    }

    setIsLookingUp(true);
    setError("");
    setLookupSuccess(false);

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
      setLookupSuccess(true);
    } catch (err) {
      setError("Failed to lookup ISBN: " + err.message);
    } finally {
      setIsLookingUp(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for all required fields
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.genre ||
      !bookData.type ||
      !bookData.isbn
    ) {
      setError("All fields except Description are required");
      return;
    }

    // Validate ISBN if provided
    if (bookData.isbn !== validISBN) {
      setError(`Invalid ISBN. Only ${validISBN} is accepted.`);
      return;
    }

    if (isbnError) {
      setError(isbnError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Add default inventory values and handle empty description
      const bookWithInventory = {
        ...bookData,
        description: bookData.description || "", // Ensure empty string if no description
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
    setScanSuccess(false);
    setError("");

    // Simulate scanning process
    setTimeout(() => {
      // Use the valid ISBN
      const sampleBookData = {
        title: "The Quantum Universe",
        author: "Brian Cox & Jeff Forshaw",
        genre: "Science",
        type: "Hardcover",
        description:
          "In The Quantum Universe, Brian Cox and Jeff Forshaw approach the world of quantum mechanics in the same way they did in Why Does E=mc2? and make fundamental scientific principles accessible—and fascinating—to everyone.",
        isbn: validISBN,
      };

      // Populate all fields with sample data
      setBookData(sampleBookData);
      setIsScanning(false);
      setScanSuccess(true);
    }, 1500);
  };

  // Update this function to use a browser alert
  const handleCoverUploadClick = () => {
    // Use a browser alert instead of a custom component
    alert("Your file explorer would open here. Feature under development.");
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
              <span className="detail-label">Title:</span>
              <span className="detail-value">{addedBook.title}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Author:</span>
              <span className="detail-value">{addedBook.author}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Genre:</span>
              <span className="detail-value">
                {addedBook.genre || "Not specified"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Type:</span>
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

      {/* Quick Add Section */}
      <div className="add-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaPlus /> Quick Add
          </h2>
        </div>
        <div className="card-body">
          <div className="quick-add-container">
            {/* ISBN Lookup */}
            <div className="quick-add-method">
              <div className="quick-add-title">
                <FaSearch /> ISBN Lookup
              </div>
              <form onSubmit={handleIsbnLookup} className="isbn-lookup-form">
                <div className="isbn-input-group">
                  <FaSearch className="isbn-search-icon" />
                  <input
                    type="text"
                    value={isbnLookup}
                    onChange={handleIsbnLookupChange}
                    placeholder={`Enter ISBN`}
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
              <div className="isbn-example">
                <small>Valid ISBN example: {validISBN}</small>
              </div>
            </div>

            {/* Barcode Scanner */}
            <div className="quick-add-method">
              <div className="quick-add-title">
                <FaBarcode /> Barcode Scanner
              </div>
              <div className="scan-container">
                <FaBarcode className="scan-icon" />
                <button
                  type="button"
                  className={`scan-button ${
                    isScanning ? "scan-animation" : ""
                  }`}
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan Book"}
                </button>
              </div>
              {scanSuccess && (
                <div className="success-notification">
                  <FaCheck /> Book details successfully scanned
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* Book Details Form */}
      <div className="add-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaBookOpen /> Book Details
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="add-book-form-grid">
              <div
                className="cover-upload-area"
                onClick={handleCoverUploadClick}
              >
                <div className="upload-placeholder">
                  <FaBook className="book-icon" />
                  <p>Upload Cover</p>
                  <p className="small-text">(Click to upload)</p>
                </div>
              </div>

              <div className="book-details-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">
                      <FaBookOpen /> Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={bookData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="author">
                      <FaUser /> Author *
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={bookData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter author"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="genre">
                      <FaTag /> Genre *
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      value={bookData.genre}
                      onChange={handleInputChange}
                      required
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
                      <FaBook /> Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={bookData.type}
                      onChange={handleInputChange}
                      required
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
                    <label htmlFor="isbn">
                      <FaBarcode /> ISBN *
                    </label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={bookData.isbn}
                      onChange={handleInputChange}
                      required
                      placeholder={`Enter ISBN (e.g., ${validISBN})`}
                    />
                    {isbnError && (
                      <div className="field-error">{isbnError}</div>
                    )}
                    <div className="isbn-hint">
                      <small>
                        Only numbers allowed. Valid ISBN: {validISBN}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">
                    <FaInfoCircle /> Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={bookData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter book description"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="add-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
