import { useState, useEffect } from "react";
import {
  FaSearch,
  FaTimes,
  FaUser,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import { getAllMembers } from "../../services/MemberService";
import "./ViewMember.css";

function ViewMember() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const members = await getAllMembers();

        // Sort members by ID initially
        const sortedMembers = [...members].sort((a, b) => a.id - b.id);

        setAllMembers(members);
        setSearchResults(sortedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = allMembers.filter((member) => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        const searchTerm = searchQuery.toLowerCase();

        return (
          fullName.includes(searchTerm) ||
          member.id.toString().toLowerCase().includes(searchTerm) ||
          member.email.toLowerCase().includes(searchTerm)
        );
      });

      // Sort the filtered results according to current sort settings
      const sortedResults = [...results].sort((a, b) => {
        let valueA, valueB;

        if (sortField === "name") {
          valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
          valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
        } else {
          valueA = a[sortField] ? String(a[sortField]).toLowerCase() : "";
          valueB = b[sortField] ? String(b[sortField]).toLowerCase() : "";
        }

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });

      setSearchResults(sortedResults);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleSort = (field) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";

    setSortField(field);
    setSortDirection(newDirection);

    const sortedResults = [...searchResults].sort((a, b) => {
      let valueA, valueB;

      if (field === "name") {
        valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
        valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else {
        valueA = a[field] ? String(a[field]).toLowerCase() : "";
        valueB = b[field] ? String(b[field]).toLowerCase() : "";
      }

      if (valueA < valueB) return newDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSearchResults(sortedResults);
  };

  return (
    <div className="member-search-container">
      <h1 className="page-title">Member Directory</h1>
      <p className="page-description">
        Search for library members by name, ID, or email
      </p>

      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>

      <div className="results-placeholder">
        {loading ? (
          <div className="loading-message">
            <FaUser size={30} style={{ marginBottom: "1rem", opacity: 0.3 }} />
            <p>Loading members...</p>
          </div>
        ) : (
          <>
            {hasSearched && searchResults.length === 0 ? (
              <div className="no-results-message">
                <p>No members found matching your search criteria</p>
              </div>
            ) : (
              <div className="search-results-container">
                <table className="search-results-table">
                  <thead>
                    <tr>
                      <th
                        onClick={() => handleSort("id")}
                        className="sortable-header"
                      >
                        Library ID
                        {sortField === "id" && (
                          <span className="sort-indicator">
                            {sortDirection === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("name")}
                        className="sortable-header"
                      >
                        Name
                        {sortField === "name" && (
                          <span className="sort-indicator">
                            {sortDirection === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("email")}
                        className="sortable-header"
                      >
                        Email
                        {sortField === "email" && (
                          <span className="sort-indicator">
                            {sortDirection === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("phone")}
                        className="sortable-header"
                      >
                        Phone
                        {sortField === "phone" && (
                          <span className="sort-indicator">
                            {sortDirection === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => handleSort("address")}
                        className="sortable-header"
                      >
                        Address
                        {sortField === "address" && (
                          <span className="sort-indicator">
                            {sortDirection === "asc" ? " ▲" : " ▼"}
                          </span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((member) => (
                      <tr
                        key={member.id}
                        onClick={() => handleMemberClick(member)}
                      >
                        <td>
                          <strong>{member.id}</strong>
                        </td>
                        <td>
                          {member.firstName} {member.lastName}
                        </td>
                        <td>{member.email}</td>
                        <td>{member.phone || "-"}</td>
                        <td>{member.address || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          className="member-details-modal"
          onClick={() => setSelectedMember(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Member Details</h2>
              <button
                className="close-modal-button"
                onClick={() => setSelectedMember(null)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="member-details-grid">
              <div className="member-details">
                <div className="member-details-column">
                  <h2>Personal Information</h2>

                  <div className="detail-item">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Member ID</span>
                    <span className="detail-value">{selectedMember.id}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{selectedMember.email}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">
                      {selectedMember.phone || (
                        <span className="empty-state">Not provided</span>
                      )}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">
                      {selectedMember.address || (
                        <span className="empty-state">Not provided</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="loans-column">
                  <h2>
                    <FaBook style={{ marginRight: "0.5rem" }} />
                    Currently Borrowed
                  </h2>

                  {!selectedMember.isBorrowing ? (
                    <span className="empty-state">
                      No books currently borrowed
                    </span>
                  ) : (
                    <>
                      <div className="book-cover">
                        <img
                          src={selectedMember.borrowed?.imageUrl}
                          alt={selectedMember.borrowed?.title}
                          className="book-detail-image"
                        />
                      </div>

                      <div className="book-details">
                        <div className="detail-item">
                          <span className="detail-label">Title</span>
                          <span className="detail-value">
                            {selectedMember.borrowed?.title}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">Author</span>
                          <span className="detail-value">
                            {selectedMember.borrowed?.author}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">ISBN</span>
                          <span className="detail-value">
                            {selectedMember.borrowed?.isbn}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">Due Date</span>
                          <span className="detail-value status-available">
                            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                            {selectedMember.borrowed?.status}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="loans-column">
                  <h2>
                    <FaBook style={{ marginRight: "0.5rem" }} />
                    On Hold
                  </h2>

                  {!selectedMember.isHolding ? (
                    <span className="empty-state">
                      No books currently on hold
                    </span>
                  ) : (
                    <>
                      <div className="book-cover">
                        <img
                          src={selectedMember.holds?.imageUrl}
                          alt={selectedMember.holds?.title}
                          className="book-detail-image"
                        />
                      </div>

                      <div className="book-details">
                        <div className="detail-item">
                          <span className="detail-label">Title</span>
                          <span className="detail-value">
                            {selectedMember.holds?.title}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">Author</span>
                          <span className="detail-value">
                            {selectedMember.holds?.author}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">ISBN</span>
                          <span className="detail-value">
                            {selectedMember.holds?.isbn}
                          </span>
                        </div>

                        <div className="detail-item">
                          <span className="detail-label">Wait Time</span>
                          <span className="detail-value status-unavailable">
                            <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                            {selectedMember.holds?.status}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMember;
