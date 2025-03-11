import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Deliveries from "./components/Deliveries/Deliveries";
import BookSearch from "./components/BookSearch/BookSearch";
import AddBook from "./components/AddBook/AddBook";
import RemoveEditBook from "./components/RemoveEditBook/RemoveEditBook";
import MemberSearch from "./components/MemberSearch/MemberSearch";
import AddMember from "./components/AddMember/AddMember";
import RemoveMember from "./components/RemoveMember/RemoveMember";
import HomePage from "./components/HomePage/HomePage";

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
                path="/member-search"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <MemberSearch />
                  )
                }
              />
              <Route
                path="/add-member"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace /> 
                  ) : (
                   <AddMember />
                  )
                }
              />
              <Route
                path="/remove-member"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <RemoveMember />
                  )
                }
              />
              <Route path="/" element={<HomePage />} />
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
