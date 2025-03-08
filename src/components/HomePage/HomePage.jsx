import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedBooks } from "../../services/BookService";
import "./HomePage.css";

function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      setLoading(true);
      try {
        const books = await getFeaturedBooks(4);
        setFeaturedBooks(books);
      } catch (error) {
        console.error("Error loading featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedBooks();
  }, []);

  const handleBrowseClick = () => {
    navigate("/book-search");
  };

  return (
    <main className="main-content">
      <section className="hero-section">
        <h2>Welcome to Calgary Private Library</h2>
        <p>Discover our exclusive collection of books and resources</p>
        <button className="cta-button" onClick={handleBrowseClick}>
          Browse Catalog
        </button>
      </section>

      <section className="featured-section">
        <h3>Featured Books</h3>
        {loading ? (
          <p className="loading-message">Loading featured books...</p>
        ) : (
          <div className="book-grid">
            {featuredBooks.map((book) => (
              <div key={book.id} className="book-item">
                <div className="book-cover">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-cover-image"
                  />
                </div>
                <div className="book-info">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
