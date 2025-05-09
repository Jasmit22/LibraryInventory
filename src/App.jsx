import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Deliveries from "./components/Deliveries/Deliveries";
import OrderBook from "./components/OrderBook/OrderBook";
import BookSearch from "./components/BookSearch/BookSearch";
import AddBook from "./components/AddBook/AddBook";
import RemoveEditBook from "./components/RemoveEditBook/RemoveEditBook";
import ViewMember from "./components/ViewMember/ViewMember";
import HomePage from "./components/HomePage/HomePage";
import KeyboardShortcuts from "./components/KeyboardShortcuts/KeyboardShortcuts";
import OrderBookReview from "./components/OrderBookReview/OrderBookReview";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div className="library-app">
        {/* Navbar Component with login state */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div
          className={`content-container ${isLoggedIn ? "sidebar-visible" : ""}`}
        >
          {/* Sidebar Component */}
          <Sidebar isLoggedIn={isLoggedIn} />

          {/* Keyboard Shortcuts Component */}
          {isLoggedIn && <KeyboardShortcuts />}

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
                path="/order-book"
                element={
                  !isLoggedIn ? <Navigate to="/login" replace /> : <OrderBook />
                }
              />
              <Route
                path="/order-book-review"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <OrderBookReview />
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
                path="/remove-edit-book"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <RemoveEditBook />
                  )
                }
              />
              <Route
                path="/view-member"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <ViewMember />
                  )
                }
              />
              {/* New routes for Terms and Privacy */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>

        {/* Footer Component */}
        <Footer isLoggedIn={isLoggedIn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
