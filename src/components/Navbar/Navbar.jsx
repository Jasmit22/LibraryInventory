import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Function to handle login/logout button click
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // If logged in, log out and clear localStorage
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
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
      <div className="navbar-logo">
        <h1 onClick={navigateHome} className="logo-text">
          Calgary Private Library
        </h1>
      </div>
      <div className="navbar-auth">
        <button className="auth-button" onClick={handleAuthClick}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
