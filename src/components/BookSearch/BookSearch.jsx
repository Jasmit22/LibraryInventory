import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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

      <div className="search-results-container">
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
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedBook && (
        <div className="book-details-modal">
          <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <div className="book-details-grid">
              <div className="book-cover">
                <img
                  src={selectedBook.imageUrl}
                  alt={selectedBook.title}
                  className="book-detail-image"
                />
              </div>
              <div className="book-details">
                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>ISBN:</strong> {selectedBook.isbn || "N/A"}
                </p>
                <p>
                  <strong>Genre:</strong> {selectedBook.genre || "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {selectedBook.type || "N/A"}
                </p>
                {selectedBook.description && (
                  <p>
                    <strong>Description:</strong> {selectedBook.description}
                  </p>
                )}
                <p>
                  <strong>Status:</strong> Available
                </p>
                <div className="book-actions">
                  <button className="action-button">Reserve</button>
                  <button className="action-button">Check Out</button>
                </div>
              </div>
            </div>
            <button
              className="close-modal-button"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSearch;
