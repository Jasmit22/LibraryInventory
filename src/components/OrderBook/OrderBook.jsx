import { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaCheck,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaBarcode,
} from "react-icons/fa";
import Modal from "../common/Modal/Modal";
import "./OrderBook.css";

function OrderBook() {
  // Show alert when component mounts, but after render
  useEffect(() => {
    // Use setTimeout to delay the alert until after the page renders
    const timer = setTimeout(() => {
      alert("Feature under development, skeleton of implementation shown");
    }, 100);

    // Clean up the timer if component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, []);

  const [isbnLookup, setIsbnLookup] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupSuccess, setLookupSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    type: "",
    imageUrl: "",
    quantity: 1,
    requestReason: "",
    urgency: "normal",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [requestedBook, setRequestedBook] = useState(null);

  // Sample library locations
  const libraryLocations = [
    {
      id: "lib1",
      name: "Main Branch",
      address: "123 Main St",
      distance: "0 miles (Current)",
    },
    {
      id: "lib2",
      name: "Downtown Branch",
      address: "456 Center Ave",
      distance: "3.2 miles",
    },
    {
      id: "lib3",
      name: "Westside Library",
      address: "789 West Blvd",
      distance: "5.8 miles",
    },
    {
      id: "lib4",
      name: "Eastside Branch",
      address: "321 East St",
      distance: "4.5 miles",
    },
    {
      id: "lib5",
      name: "North County Library",
      address: "555 North Rd",
      distance: "8.7 miles",
    },
  ];

  // Valid ISBN for Charlotte's Web
  const validISBN = "9780064400558"; // Charlotte's Web by E.B. White

  // Handle ISBN lookup input change - only allow numeric characters
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

    setIsLookingUp(true);
    setError("");
    setLookupSuccess(false);

    // Only accept this specific ISBN for the demo
    if (isbnLookup.trim() !== validISBN) {
      setError(
        `Invalid ISBN. Only ${validISBN} is accepted for demo purposes.`
      );
      setIsLookingUp(false);
      return;
    }

    try {
      // For Charlotte's Web, we'll hardcode the response
      const bookInfo = {
        title: "Charlotte's Web",
        author: "E.B. White",
        type: "Paperback",
        isbn: validISBN,
        imageUrl: "/images/books/charlottes-web.jpg",
        description:
          "A classic children's novel about a pig named Wilbur and his friendship with a barn spider named Charlotte.",
      };

      // Populate the form with the book data
      setBookData({
        ...bookData,
        title: bookInfo.title,
        author: bookInfo.author,
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

  // Handle library selection
  const handleLibraryChange = (e) => {
    setSelectedLibrary(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!bookData.title || !bookData.author || !selectedLibrary) {
      setError("Title, Author, and Library Location are required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call to request book
      // In a real app, you would call an API endpoint to place the request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find the selected library details
      const libraryDetails = libraryLocations.find(
        (lib) => lib.id === selectedLibrary
      );

      const newRequest = {
        ...bookData,
        id: Date.now(), // Generate a temporary ID
        requestDate: new Date().toISOString(),
        status: "Pending",
        sourceLibrary: libraryDetails.name,
        sourceLibraryId: selectedLibrary,
        estimatedArrival: calculateEstimatedArrival(bookData.urgency),
      };

      setRequestedBook(newRequest);
      setIsSubmitting(false);
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to place request: " + (err.message || "Unknown error"));
      setIsSubmitting(false);
    }
  };

  // Calculate estimated arrival based on urgency
  const calculateEstimatedArrival = (urgency) => {
    const today = new Date();
    let daysToAdd = 7; // Default for normal urgency

    if (urgency === "urgent") {
      daysToAdd = 3;
    } else if (urgency === "low") {
      daysToAdd = 14;
    }

    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + daysToAdd);
    return estimatedDate.toISOString();
  };

  // Reset form after successful submission
  const resetForm = () => {
    setBookData({
      title: "",
      author: "",
      isbn: "",
      type: "",
      imageUrl: "",
      quantity: 1,
      requestReason: "",
      urgency: "normal",
      notes: "",
    });
    setSelectedLibrary("");
    setShowConfirmation(false);
    setRequestedBook(null);
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
        Request books from other library locations in our network
      </p>

      {/* Library Selection Section */}
      <div className="order-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaBuilding /> Select Library Location
          </h2>
        </div>
        <div className="card-body">
          <div className="library-selection">
            <p className="selection-instruction">
              Select a library to request a book from:
            </p>
            <div className="library-grid">
              {libraryLocations.map((library) => (
                <div
                  key={library.id}
                  className={`library-card ${
                    selectedLibrary === library.id ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={library.id}
                    name="libraryLocation"
                    value={library.id}
                    checked={selectedLibrary === library.id}
                    onChange={handleLibraryChange}
                    className="library-radio"
                  />
                  <label htmlFor={library.id} className="library-label">
                    <div className="library-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="library-info">
                      <h3 className="library-name">{library.name}</h3>
                      <p className="library-address">{library.address}</p>
                      <span className="library-distance">
                        {library.distance}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                onChange={handleIsbnLookupChange}
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
          <div className="isbn-example">
            <small>Valid ISBN example: {validISBN} (Charlotte's Web)</small>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* Request Form */}
      <div className="order-book-card">
        <div className="card-header">
          <h2 className="section-title">
            <FaPlus /> Request Details
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="order-form">
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
                  <label htmlFor="isbn">
                    <FaBarcode /> ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={bookData.isbn}
                    onChange={handleInputChange}
                    placeholder="ISBN"
                    readOnly
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
                  <label htmlFor="requestReason">Request Reason</label>
                  <select
                    id="requestReason"
                    name="requestReason"
                    value={bookData.requestReason}
                    onChange={handleInputChange}
                  >
                    <option value="">Select reason</option>
                    <option value="Not available at my location">
                      Not available at my location
                    </option>
                    <option value="All copies checked out">
                      All copies checked out
                    </option>
                    <option value="Research purposes">Research purposes</option>
                    <option value="Book club">Book club</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="urgency">Urgency</label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={bookData.urgency}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low (1-2 weeks)</option>
                    <option value="normal">Normal (5-7 days)</option>
                    <option value="urgent">Urgent (2-3 days)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
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

              <div className="form-group full-width">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={bookData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about this request"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || !selectedLibrary}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <FaExchangeAlt /> Submit Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        title="Book Request Submitted"
        size="medium"
      >
        <div className="order-confirmation">
          <div className="confirmation-icon">
            <FaCheck />
          </div>
          <h3 className="confirmation-title">Request Successfully Submitted</h3>
          <p className="confirmation-message">
            Your request has been successfully submitted and will be processed
            by the source library.
          </p>

          <div className="confirmation-details">
            <div className="book-details-header">
              <h4 className="book-title">{requestedBook?.title}</h4>
              <p className="book-author">by {requestedBook?.author}</p>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <FaBuilding className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Source Library</span>
                  <span className="detail-value">
                    {requestedBook?.sourceLibrary}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Estimated Arrival</span>
                  <span className="detail-value">
                    {requestedBook?.estimatedArrival
                      ? formatDate(requestedBook.estimatedArrival)
                      : "Not specified"}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-content">
                  <span className="detail-label">Quantity</span>
                  <span className="detail-value">
                    {requestedBook?.quantity}{" "}
                    {requestedBook?.quantity > 1 ? "copies" : "copy"}
                  </span>
                </div>
              </div>

              {requestedBook?.type && (
                <div className="detail-item">
                  <div className="detail-content">
                    <span className="detail-label">Type</span>
                    <span className="detail-value">{requestedBook.type}</span>
                  </div>
                </div>
              )}

              {requestedBook?.requestReason && (
                <div className="detail-item">
                  <div className="detail-content">
                    <span className="detail-label">Request Reason</span>
                    <span className="detail-value">
                      {requestedBook.requestReason}
                    </span>
                  </div>
                </div>
              )}

              {requestedBook?.urgency && (
                <div className="detail-item">
                  <div className="detail-content">
                    <span className="detail-label">Urgency</span>
                    <span className="detail-value">
                      {requestedBook.urgency === "urgent"
                        ? "Urgent (2-3 days)"
                        : requestedBook.urgency === "normal"
                        ? "Normal (5-7 days)"
                        : "Low (1-2 weeks)"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="primary-button" onClick={closeConfirmation}>
              Submit Another Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OrderBook;
