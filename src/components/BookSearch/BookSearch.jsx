import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
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

  // New state for filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    availability: "",
    type: "",
  });

  // Load books on initial render
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const books = await getAllBooks();
        // Show new books initially instead of random ones
        // Sort books by most recent (assuming newer books have higher IDs)
        const newBooks = [...books].sort((a, b) => b.id - a.id).slice(0, 8);
        setSearchResults(newBooks);
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
      // Apply filters to search results
      const filteredResults = applyFilters(results);
      setSearchResults(filteredResults);
      setHasSearched(true);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // New function to apply filters
  const applyFilters = (books) => {
    return books.filter((book) => {
      // Filter by genre if selected
      if (filters.genre && book.genre !== filters.genre) {
        return false;
      }

      // Filter by availability if selected
      if (filters.availability === "available" && !book.isAvailable) {
        return false;
      }
      if (filters.availability === "unavailable" && book.isAvailable) {
        return false;
      }

      // Filter by type if selected
      if (filters.type && book.type !== filters.type) {
        return false;
      }

      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Apply filters without changing search query
  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      const filteredResults = applyFilters(results);
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset all filters
  const handleResetFilters = async () => {
    setFilters({
      genre: "",
      availability: "",
      type: "",
    });

    // Re-run search with cleared filters
    setLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error resetting filters:", error);
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
          <button
            type="button"
            className={`filter-button ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="filter-button-icon" />
          </button>
        </div>
      </form>

      {/* Filter section - moved outside the form for better separation */}
      {showFilters && (
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
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
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Hardcover">Hardcover</option>
              <option value="Paperback">Paperback</option>
              <option value="E-book">E-book</option>
              <option value="Audiobook">Audiobook</option>
            </select>
          </div>

          <div className="filter-actions">
            <button
              type="button"
              className="reset-filters-button"
              onClick={handleResetFilters}
            >
              Reset
            </button>
            <button
              type="button"
              className="apply-filters-button"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

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
              {hasSearched ? "Search Results" : "New Books"}
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
