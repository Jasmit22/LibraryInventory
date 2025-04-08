import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedBooks } from "../../services/BookService";
import { FaArrowRight, FaSearch, FaUsers, FaKeyboard } from "react-icons/fa";
import BookDetailsModal from "../BookSearch/BookDetailsModal";
import "./HomePage.css";

function HomePage() {
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const loadNewBooks = async () => {
      setLoading(true);
      try {
        // We're still using getFeaturedBooks but will display them as "New Books"
        const books = await getFeaturedBooks(6);
        setNewBooks(books);
      } catch (error) {
        console.error("Error loading new books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewBooks();
  }, []);

  const handleBookSearchClick = () => {
    navigate("/book-search");
  };

  const handleViewMembersClick = () => {
    navigate("/view-member");
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  

  return (
    <main className="home-content">
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Calgary Private Library</h1>
            <p className="hero-subtitle">
              Manage your library's collection and members with ease
            </p>
            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={handleBookSearchClick}
              >
                <FaSearch className="button-icon" />
                Book Search
              </button>
              <button
                className="secondary-button"
                onClick={handleViewMembersClick}
              >
                <FaUsers className="button-icon" />
                View Members
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="new-books-section">
        <div className="section-header">
          <h2>New Books</h2>
          <button className="view-all-button" onClick={handleBookSearchClick}>
            View All <FaArrowRight />
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading new books...</p>
          </div>
        ) : (
          <div className="books-showcase">
            {newBooks.map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => handleBookClick(book)}
              >
                <div className="book-cover-container">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-cover-image"
                  />
                  <div className="book-hover-info">
                    <span className="view-details">View Details</span>
                  </div>
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <span
                    className={`book-status ${
                      book.isAvailable ? "available" : "unavailable"
                    }`}
                  >
                    {book.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="keyboard-shortcuts-section">
        <div className="section-header">
          <h2>Keyboard Shortcuts</h2>
          <div className="view-all-button">
            <FaKeyboard /> Quick Navigation
          </div>
        </div>

        <p>
          Press <strong>Alt</strong> (or <strong>Option ⌥</strong> on Mac) + the
          following keys for quick navigation:
        </p>

        <div className="shortcuts-grid">
          <div className="shortcut-card">
            <div className="shortcut-key">Alt + A</div>
            <p className="shortcut-description">
              Add a new book to the library
            </p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + S</div>
            <p className="shortcut-description">
              Search for books in the library
            </p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + R/E</div>
            <p className="shortcut-description">Remove or edit books</p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + M</div>
            <p className="shortcut-description">View library members</p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + D</div>
            <p className="shortcut-description">Manage book deliveries</p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + O</div>
            <p className="shortcut-description">Order new books</p>
          </div>

          <div className="shortcut-card">
            <div className="shortcut-key">Alt + L</div>
            <p className="shortcut-description">Return to home page</p>
          </div>
        </div>
      </section>
      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

    </main>
  );
}

export default HomePage;
