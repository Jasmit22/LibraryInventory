// This service simulates API calls to a backend
// In a real app, these would be actual API calls

let booksData = null;

// Load books from JSON file
const loadBooks = async () => {
  if (booksData) return booksData;

  try {
    const response = await fetch("/data/books.json");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    booksData = await response.json();
    return booksData;
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

// Get all books
export const getAllBooks = async () => {
  return await loadBooks();
};

// Add a new book
export const addBook = async (newBook) => {
  const books = await loadBooks();

  // Generate a new ID
  const maxId =
    books.length > 0 ? Math.max(...books.map((book) => book.id)) : 0;
  const bookWithId = {
    ...newBook,
    id: maxId + 1,
    // Always use placeholder image
    imageUrl: "/images/books/placeholder.jpg",
  };

  // Add to our in-memory data
  books.push(bookWithId);
  booksData = books;

  // In a real app, this would be an API call to save the book
  console.log("Book added:", bookWithId);

  return bookWithId;
};

// Search books
export const searchBooks = async (query) => {
  const books = await loadBooks();

  if (!query) return books;

  const lowerQuery = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      (book.isbn && book.isbn.includes(query)) ||
      (book.genre && book.genre.toLowerCase().includes(lowerQuery))
  );
};

// Get featured books (random selection)
export const getFeaturedBooks = async (count = 4) => {
  const books = await loadBooks();
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get incoming deliveries (books with origin and expected arrival)
export const getIncomingDeliveries = async () => {
  const books = await loadBooks();
  return books.filter(
    (book) => book.expectedArrival && book.origin && !book.destination
  );
};

// Get outgoing deliveries (books with destination and expected arrival)
export const getOutgoingDeliveries = async () => {
  const books = await loadBooks();
  return books.filter(
    (book) => book.expectedArrival && book.destination && !book.origin
  );
};

// Lookup book by ISBN
export const lookupBookByISBN = async (isbn) => {
  try {
    const response = await fetch("/data/isbn-lookup.json");
    if (!response.ok) {
      throw new Error("Failed to fetch ISBN data");
    }
    const data = await response.json();

    // Return the book data for the ISBN or the default if not found
    return data[isbn] || data["default"];
  } catch (error) {
    console.error("Error looking up ISBN:", error);
    // Return the default book as fallback
    return {
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      type: "Hardcover",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
      isbn: "9780525559474",
    };
  }
};
