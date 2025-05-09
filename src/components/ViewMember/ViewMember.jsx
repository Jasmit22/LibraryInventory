import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUser,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { getAllMembers } from "../../services/MemberService";
import Modal from "../common/Modal/Modal";
import MemberDetailsContent from "./MemberDetailsContent";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (field) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";

    setSortField(field);
    setSortDirection(newDirection);

    const sortedResults = [...searchResults].sort((a, b) => {
      let valueA, valueB;

      // Special handling for ID field - sort numerically
      if (field === "id") {
        valueA = a.id;
        valueB = b.id;
        return newDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Special handling for name field
      if (field === "name") {
        valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
        valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else {
        valueA = a[field] ? String(a[field]).toLowerCase() : "";
        valueB = b[field] ? String(b[field]).toLowerCase() : "";
      }

      // For boolean fields like hasOverdue
      if (typeof valueA === "boolean") {
        return newDirection === "asc"
          ? valueA === valueB
            ? 0
            : valueA
            ? 1
            : -1
          : valueA === valueB
          ? 0
          : valueA
          ? -1
          : 1;
      }

      // String comparison for other fields
      if (valueA < valueB) return newDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSearchResults(sortedResults);
  };

  // Helper function to render sort icon
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="sort-icon" />;
    }
    return sortDirection === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
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
                        <div className="header-content">
                          <span>Library ID</span>
                          {renderSortIcon("id")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("name")}
                        className="sortable-header"
                      >
                        <div className="header-content">
                          <span>Name</span>
                          {renderSortIcon("name")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("email")}
                        className="sortable-header"
                      >
                        <div className="header-content">
                          <span>Email</span>
                          {renderSortIcon("email")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("phone")}
                        className="sortable-header"
                      >
                        <div className="header-content">
                          <span>Phone</span>
                          {renderSortIcon("phone")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("address")}
                        className="sortable-header"
                      >
                        <div className="header-content">
                          <span>Address</span>
                          {renderSortIcon("address")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("hasOverdue")}
                        className="sortable-header"
                      >
                        <div className="header-content">
                          <span>Has Overdue</span>
                          {renderSortIcon("hasOverdue")}
                        </div>
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
                        <td className="overdue-status-cell">
                          {member.hasOverdue ? (
                            <div className="overdue-indicator overdue">
                              <FaExclamationCircle />
                              <span>Yes</span>
                            </div>
                          ) : (
                            <div className="overdue-indicator no-overdue">
                              <FaCheckCircle />
                              <span>No</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Member Details Modal - Using common Modal component */}
      <Modal
        isOpen={isModalOpen && selectedMember !== null}
        onClose={handleCloseModal}
        title="Member Details"
        size="xlarge"
      >
        {selectedMember && <MemberDetailsContent member={selectedMember} />}
      </Modal>
    </div>
  );
}

export default ViewMember;
