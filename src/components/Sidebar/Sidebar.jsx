import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ isLoggedIn }) {
  const [expandedSections, setExpandedSections] = useState({
    inventory: true,
    users: true,
    delivery: true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Only show sidebar when logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {isMobile && (
        <button className="hamburger-button" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div
        className={`sidebar ${isMobile ? "mobile" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-section">
          <div
            className="sidebar-header"
            onClick={() => toggleSection("inventory")}
          >
            <h3>Inventory {expandedSections.inventory ? "▼" : "▶"}</h3>
          </div>
          {expandedSections.inventory && (
            <ul className="sidebar-menu">
              <li>
                <Link
                  to="/book-search"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/book-search" ? "active" : ""
                  }
                >
                  Book Search
                </Link>
              </li>
              <li>
                <Link
                  to="/add-book"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={location.pathname === "/add-book" ? "active" : ""}
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  to="/remove-edit-book"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/remove-edit-book" ? "active" : ""
                  }
                >
                  Remove/Edit Book
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="sidebar-section">
          <div
            className="sidebar-header"
            onClick={() => toggleSection("users")}
          >
            <h3>Manage Users {expandedSections.users ? "▼" : "▶"}</h3>
          </div>
          {expandedSections.users && (
            <ul className="sidebar-menu">
              <li>
                <Link
                  to="/member-search"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/member-search" ? "active" : ""
                  }
                >
                  Member Search
                </Link>
              </li>
              <li>
                <Link
                  to="/add-member"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/add-member" ? "active" : ""
                  }
                >
                  Add Member
                </Link>
              </li>
              <li>
                <Link
                  to="/remove-member"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/remove-member" ? "active" : ""
                  }
                >
                  Remove Member
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="sidebar-section">
          <div
            className="sidebar-header"
            onClick={() => toggleSection("delivery")}
          >
            <h3>Delivery {expandedSections.delivery ? "▼" : "▶"}</h3>
          </div>
          {expandedSections.delivery && (
            <ul className="sidebar-menu">
              <li>
                <Link
                  to="/deliveries"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={
                    location.pathname === "/deliveries" ? "active" : ""
                  }
                >
                  View Incoming/Outgoing Deliveries
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;
