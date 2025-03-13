import { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaCheck, FaTimes} from "react-icons/fa";
import { getAllMembers } from "../../services/MemberService";
import "./RemoveMember.css";

function RemoveMember() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMembers, setAllMembers] = useState([]); // Store all members
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchResults, setSearchResults] = useState([]); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [removedMemberFirst, setRemovedMemberFirst] = useState("");
  const [removedMemberLast, setRemovedMemberLast] = useState("");

  useEffect(() => {
      const fetchMembers = async () => {
        setLoading(true);
        try {
          const members = await getAllMembers(); // Fetch all members
          setAllMembers(members); // Store fetched members
          setSearchResults(members); // Set initial search results
        } catch (error) {
          console.error("Error fetching members:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMembers();
    }, []); 

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setLoading(true); // Show loading state

    console.log("Search Term:", searchQuery); // Log search query

    try {
      const results = allMembers.filter((member) => {
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        const searchTerm = searchQuery.toLowerCase();

        console.log("Checking member:", member); // Log each member

        return (
          fullName.includes(searchTerm) ||
          member.id.toString().toLowerCase().includes(searchTerm) || // Ensure ID is treated as a string
          member.email.toLowerCase().includes(searchTerm)
        );
      });

      console.log("Search Results:", results); // Log search results

      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle member selection
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsDeleting(true);
  };

  // Handle member deletion
  const handleDeleteConfirm = async () => {
    // In a real app, this would call an API to delete member
    console.log("Deleting member:", selectedMember.id);

    // Simulate successful deletion by removing member from our local state
    const filteredResults = searchResults.filter(
      (member) => member.id !== selectedMember.id
    );

    setSearchResults(filteredResults);
    setIsDeleting(false);
    setRemovedMemberFirst(selectedMember.firstName);
    setRemovedMemberLast(selectedMember.lastName);
    setSelectedMember(null);
    setShowConfirmation(true);
  };


  return (
    <div className="remove-member-container">
      <h1 className="page-title">Remove Member</h1>
      <p>Search for or click on a member to remove from the library system.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or member ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="results-placeholder">
      {loading ? (
          <p>Loading members...</p>
        ) : (
          <>
            {hasSearched && searchResults.length === 0 ? (
              <p>No results found</p> // Display no results message
            ) : (
              <div className="search-results-container">
                <table className="search-results-table">
                  <thead>
                    <tr>
                      <th>Library ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((member) => (
                      <tr key={member.id} onClick={() => handleMemberClick(member)}>
                        <td><strong>{member.id}</strong></td>
                        <td>{member.firstName} {member.lastName}</td>
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

      {/* Delete Confirmation Modal */}
      {isDeleting && selectedMember && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Removal</h2>
            <p>
              Are you sure you want to remove{" "}
              <strong>{selectedMember.firstName}</strong> {" "}
              <strong>{selectedMember.lastName}</strong> from the library system?
            </p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setIsDeleting(false);
                  setIsEditing(true);
                }}
              >
                <FaTimes /> Cancel
              </button>
              <button
                className="delete-confirm-button"
                onClick={handleDeleteConfirm}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation Dialog for Removal */}
      {showConfirmation && (
        <div className="success-confirmation-overlay">
          <div className="success-confirmation">
            <div
              className="close-btn"
              onClick={() => setShowConfirmation(false)}
            >
              ✕
            </div>
            <h2>Member</h2>
            <h3>"{removedMemberFirst} {removedMemberLast}"</h3>
            <p>removed</p>
            <div className="confirmation-icon">
              <div className="checkmark"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RemoveMember;
