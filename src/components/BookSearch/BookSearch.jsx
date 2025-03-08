import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./BookSearch.css";

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Expanded mock data for demonstration
  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      genre: "Classic",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      genre: "Fiction",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      genre: "Dystopian",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      genre: "Romance",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      genre: "Fantasy",
    },
    {
      id: 6,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      isbn: "9780590353427",
      genre: "Fantasy",
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769488",
      genre: "Fiction",
    },
    {
      id: 8,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      isbn: "9780618640157",
      genre: "Fantasy",
    },
    {
      id: 9,
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "9780060850524",
      genre: "Dystopian",
    },
    {
      id: 10,
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "9780062315007",
      genre: "Fiction",
    },
    {
      id: 11,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      isbn: "9780439023481",
      genre: "Dystopian",
    },
    {
      id: 12,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      isbn: "9780307474278",
      genre: "Thriller",
    },
  ];

  // Load random books on initial render
  useEffect(() => {
    displayRandomBooks();
  }, []);

  // Function to display random books
  const displayRandomBooks = () => {
    // Shuffle the array and take the first 8 books
    const shuffled = [...mockBooks].sort(() => 0.5 - Math.random());
    setSearchResults(shuffled.slice(0, 8));
    setHasSearched(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      // If search query is empty, show random books
      displayRandomBooks();
      return;
    }

    // Filter books based on search query (case insensitive)
    const results = mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setHasSearched(true);
    setSelectedBook(null);
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
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ISBN, genre, title, author"
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="search-results-container">
        {hasSearched && searchResults.length === 0 ? (
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
                  <div className="book-image-placeholder"></div>
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
                <div className="book-image-placeholder large"></div>
              </div>
              <div className="book-details">
                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>ISBN:</strong> {selectedBook.isbn}
                </p>
                <p>
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
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
