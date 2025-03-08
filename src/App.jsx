import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Deliveries from "./components/Deliveries/Deliveries";
import BookSearch from "./components/BookSearch/BookSearch";
import AddBook from "./components/AddBook/AddBook";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="library-app">
        {/* Navbar Component with login state */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="content-container">
          {/* Sidebar Component */}
          <Sidebar isLoggedIn={isLoggedIn} />

          {/* Routes */}
          <div className="main-wrapper">
            <Routes>
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login onLogin={setIsLoggedIn} />
                  )
                }
              />
              <Route
                path="/deliveries"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Deliveries />
                  )
                }
              />
              <Route
                path="/book-search"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <BookSearch />
                  )
                }
              />
              <Route
                path="/add-book"
                element={
                  !isLoggedIn ? <Navigate to="/login" replace /> : <AddBook />
                }
              />
              <Route
                path="/"
                element={
                  <main className="main-content">
                    <section className="hero-section">
                      <h2>Welcome to Calgary Private Library</h2>
                      <p>
                        Discover our exclusive collection of books and resources
                      </p>
                      <button className="cta-button">Browse Catalog</button>
                    </section>

                    <section className="featured-section">
                      <h3>Featured Books</h3>
                      <div className="book-grid">
                        {/* Placeholder for book items */}
                        <div className="book-item">Book 1</div>
                        <div className="book-item">Book 2</div>
                        <div className="book-item">Book 3</div>
                        <div className="book-item">Book 4</div>
                      </div>
                    </section>
                  </main>
                }
              />
            </Routes>
          </div>
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
