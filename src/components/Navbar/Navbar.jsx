import { useNavigate } from "react-router-dom";
import { FaBook, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Function to handle login/logout button click
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // If logged in, log out and clear localStorage
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("loginStateChanged"));
    } else {
      // If not logged in, navigate to login page
      navigate("/login");
    }
  };

  // Function to navigate to home
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={navigateHome}>
        <FaBook className="logo-icon" />
        <h1 className="logo-text">Calgary Private Library</h1>
      </div>
      <div className="navbar-auth">
        <button className="auth-button" onClick={handleAuthClick}>
          {isLoggedIn ? (
            <>
              <FaSignOutAlt className="auth-icon" />
              <span>Log Out</span>
            </>
          ) : (
            <>
              <FaSignInAlt className="auth-icon" />
              <span>Log In</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
