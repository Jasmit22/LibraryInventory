import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { searchBooks, getAllBooks } from "../../services/BookService";
import Modal from "../common/Modal/Modal";
import EditBookForm from "./EditBookForm";
import DeleteConfirmation from "./DeleteConfirmation";
import RemovalConfirmation from "./RemovalConfirmation";
import EditConfirmation from "./EditConfirmation";
import "./RemoveEditBook.css";

function RemoveEditBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    genre: "",
    type: "",
    description: "",
    isbn: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [removedBookTitle, setRemovedBookTitle] = useState("");
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [editedBookTitle, setEditedBookTitle] = useState("");
  const [editChanges, setEditChanges] = useState([]);

  // Load some books on initial render
  useEffect(() => {
    const fetchInitialBooks = async () => {
      setLoading(true);
      try {
        const books = await getAllBooks();
        setSearchResults(books);
      } catch (error) {
        console.error("Error fetching initial books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle book selection
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setEditFormData({
      title: book.title,
      author: book.author,
      genre: book.genre || "",
      type: book.type || "",
      description: book.description || "",
      isbn: book.isbn || "",
    });
    setIsEditing(true);
  };

  // Handle input changes in edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // In a real app, this would call an API to update the book
    console.log("Updating book:", selectedBook.id, editFormData);

    // Track what fields were changed with before and after values
    const changes = [];
    if (selectedBook.title !== editFormData.title) {
      changes.push({
        field: "Title",
        from: selectedBook.title,
        to: editFormData.title,
      });
    }
    if (selectedBook.author !== editFormData.author) {
      changes.push({
        field: "Author",
        from: selectedBook.author,
        to: editFormData.author,
      });
    }
    if (selectedBook.genre !== editFormData.genre) {
      changes.push({
        field: "Genre",
        from: selectedBook.genre || "None",
        to: editFormData.genre || "None",
      });
    }
    if (selectedBook.type !== editFormData.type) {
      changes.push({
        field: "Type",
        from: selectedBook.type || "None",
        to: editFormData.type || "None",
      });
    }
    if (selectedBook.description !== editFormData.description) {
      changes.push({
        field: "Description",
        from: selectedBook.description
          ? selectedBook.description.length > 30
            ? selectedBook.description.substring(0, 30) + "..."
            : selectedBook.description
          : "None",
        to: editFormData.description
          ? editFormData.description.length > 30
            ? editFormData.description.substring(0, 30) + "..."
            : editFormData.description
          : "None",
      });
    }
    if (selectedBook.isbn !== editFormData.isbn) {
      changes.push({
        field: "ISBN",
        from: selectedBook.isbn || "None",
        to: editFormData.isbn || "None",
      });
    }

    // Simulate successful update by updating the book in our local state
    const updatedResults = searchResults.map((book) =>
      book.id === selectedBook.id ? { ...book, ...editFormData } : book
    );

    setSearchResults(updatedResults);
    setIsEditing(false);
    setEditedBookTitle(editFormData.title);
    setEditChanges(changes);
    setSelectedBook(null);

    // Show success confirmation
    setShowEditConfirmation(true);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    setIsEditing(false);
    setIsDeleting(true);
  };

  // Handle book deletion
  const handleDeleteConfirm = async () => {
    // In a real app, this would call an API to delete the book
    console.log("Deleting book:", selectedBook.id);

    // Simulate successful deletion by removing the book from our local state
    const filteredResults = searchResults.filter(
      (book) => book.id !== selectedBook.id
    );

    setSearchResults(filteredResults);
    setIsDeleting(false);
    setRemovedBookTitle(selectedBook.title);
    setSelectedBook(null);
    setShowConfirmation(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditing(false);
    setSelectedBook(null);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleting(false);
    setIsEditing(true);
  };

  return (
    <div className="remove-edit-book-container">
      <h1 className="page-title">Remove/Edit Book</h1>
      <p className="page-description">
        Click on a book to edit or remove it from the library system.
      </p>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
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
      </div>

      <div className="search-results">
        {loading ? (
          <div className="loading-message">
            <p>Loading books...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="no-results">
            <p>No books found. Try a different search term.</p>
          </div>
        ) : (
          <>
            <h2 className="results-heading">
              {hasSearched ? "Search Results" : "Library Books"}
            </h2>
            <div className="books-grid">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  className="book-card"
                  onClick={() => handleBookClick(book)}
                >
                  <div className="book-cover">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="book-thumbnail"
                    />
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    {book.genre && <p className="book-genre">{book.genre}</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Book Modal - Using common Modal component */}
      <Modal
        isOpen={isEditing && selectedBook !== null}
        onClose={handleCloseEditModal}
        title="Edit Book"
        size="large"
      >
        <EditBookForm
          selectedBook={selectedBook}
          editFormData={editFormData}
          handleEditInputChange={handleEditInputChange}
          handleEditSubmit={handleEditSubmit}
          handleDeleteClick={handleDeleteClick}
          handleCloseEditModal={handleCloseEditModal}
        />
      </Modal>

      {/* Delete Confirmation Modal - Using common Modal component */}
      <Modal
        isOpen={isDeleting && selectedBook !== null}
        onClose={handleCloseDeleteModal}
        title="Confirm Removal"
        size="small"
      >
        <DeleteConfirmation
          selectedBook={selectedBook}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </Modal>

      {/* Success Confirmation Dialog for Removal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Book Removed"
        size="small"
      >
        <RemovalConfirmation removedBookTitle={removedBookTitle} />
      </Modal>

      {/* Success Confirmation Dialog for Edit */}
      <Modal
        isOpen={showEditConfirmation}
        onClose={() => setShowEditConfirmation(false)}
        title="Change Successful"
        size="small"
      >
        <EditConfirmation
          editedBookTitle={editedBookTitle}
          editChanges={editChanges}
        />
      </Modal>
    </div>
  );
}

export default RemoveEditBook;
