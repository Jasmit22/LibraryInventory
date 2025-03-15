import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getAllBooks, searchBooks } from "../../services/BookService";
import "./BookSearch.css";

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load books on initial render
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const books = await getAllBooks();
        // Show some random books initially
        const shuffled = [...books].sort(() => 0.5 - Math.random());
        setSearchResults(shuffled.slice(0, 8));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
      setHasSearched(true);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="book-search-container">
      <h1 className="page-title">Book Search</h1>

      <div className="search-bar-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ISBN, genre, title, author"
              className="search-input"
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div>
        {loading ? (
          <p className="loading-message">Loading books...</p>
        ) : hasSearched && searchResults.length === 0 ? (
          <p className="no-results">
            No books found matching your search criteria.
          </p>
        ) : (
          <>
            <h2 className="results-heading">
              {hasSearched ? "Search Results" : "Featured Books"}
            </h2>
            <div className="results-grid">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  className={`book-result-item ${
                    selectedBook?.id === book.id ? "selected" : ""
                  }`}
                  onClick={() => handleBookClick(book)}
                >
                  <div className="book-image-container">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="book-image"
                    />
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <span
                      className={`availability-badge ${
                        book.isAvailable ? "available" : "unavailable"
                      }`}
                    >
                      {book.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedBook && (
        <div
          className="book-details-modal"
          onClick={() => setSelectedBook(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedBook.title}</h2>
              <button
                className="close-modal-button"
                onClick={() => setSelectedBook(null)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="book-details-grid">
              <div className="book-cover">
                <img
                  src={selectedBook.imageUrl}
                  alt={selectedBook.title}
                  className="book-detail-image"
                />
              </div>
              <div className="book-details">
                <div className="detail-item">
                  <span className="detail-label">Author:</span>
                  <span className="detail-value">{selectedBook.author}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">ISBN:</span>
                  <span className="detail-value">
                    {selectedBook.isbn || "N/A"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">
                    {selectedBook.genre || "N/A"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">
                    {selectedBook.type || "N/A"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value ${
                      selectedBook.isAvailable
                        ? "status-available"
                        : "status-unavailable"
                    }`}
                  >
                    {selectedBook.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Inventory:</span>
                  <div className="inventory-details">
                    <div className="inventory-stat">
                      <span className="inventory-label">Total Copies:</span>
                      <span className="inventory-value">
                        {selectedBook.inventory?.totalCopies || 0}
                      </span>
                    </div>
                    <div className="inventory-stat">
                      <span className="inventory-label">Available:</span>
                      <span className="inventory-value">
                        {selectedBook.inventory?.availableCopies || 0}
                      </span>
                    </div>
                    <div className="inventory-stat">
                      <span className="inventory-label">Checked Out:</span>
                      <span className="inventory-value">
                        {selectedBook.inventory?.checkedOutCopies || 0}
                      </span>
                    </div>
                    <div className="inventory-stat">
                      <span className="inventory-label">Waitlist:</span>
                      <span className="inventory-value">
                        {selectedBook.inventory?.waitlistCount || 0}
                      </span>
                    </div>
                    <div className="inventory-stat">
                      <span className="inventory-label">Last Checked Out:</span>
                      <span className="inventory-value">
                        {selectedBook.inventory?.lastCheckedOut || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedBook.description && (
                  <div className="detail-item description">
                    <span className="detail-label">Description:</span>
                    <p className="detail-value">{selectedBook.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSearch;
