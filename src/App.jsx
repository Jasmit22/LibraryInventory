import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="library-app">
        {/* Navbar Component with login state */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Routes */}
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

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2023 Calgary Private Library. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
