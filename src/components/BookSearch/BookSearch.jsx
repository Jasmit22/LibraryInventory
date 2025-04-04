import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllBooks, searchBooks } from "../../services/BookService";
import BookDetailsModal from "./BookDetailsModal";
import "./BookSearch.css";

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="book-search-container">
      <h1 className="page-title">Book Search</h1>
      <p className="page-description">
        Search for books by title, author, ISBN, or genre
      </p>

      <form onSubmit={handleSearch} className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ISBN, genre, title, author"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch className="search-button-icon" />
          </button>
        </div>
      </form>

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

      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default BookSearch;
