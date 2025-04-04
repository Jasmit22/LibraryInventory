import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getAllMembers} from "../../services/MemberService";
import "./ViewMember.css";

function ViewMember() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [allMembers, setAllMembers] = useState([]); // Store all members
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchResults, setSearchResults] = useState([]); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [loading, setLoading] = useState(true);

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
}

  return (
    <div className="member-search-container">
      <h1 className="page-title">View Member</h1>
      <p>Search for library members by name, ID, or email.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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

      {/* View Member Modal */}
      {selectedMember && (
        <div className="member-details-modal">
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
                  <div className="detail-item">
                    <h2>{selectedMember.firstName + " " + selectedMember.lastName}</h2>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Member ID:</span>
                    <span className="detail-value">{selectedMember.id}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedMember.email}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedMember.phone || "N/A"}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{selectedMember.address || "N/A"}</span>
                  </div>
                </div>

                <div className="loans-column">
                  <h2>Borrowed</h2>
                  <span className="detail-value">{selectedMember.isBorrowing ? null : "No books borrowed."}</span>
                  <div className="book-cover">
                    <img
                    src={selectedMember.borrowed?.imageUrl}
                    alt={selectedMember.borrowed?.title}
                    className="book-detail-image"
                    />
                </div>
                <div className="book-details">
                  <div className="detail-item">
                    <span className="detail-label">Title:</span>
                    <span className="detail-value">{selectedMember.borrowed?.title || null}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Author:</span>
                    <span className="detail-value">{selectedMember.borrowed?.author || null}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">ISBN:</span>
                    <span className="detail-value">
                      {selectedMember.borrowed?.isbn || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Genre:</span>
                    <span className="detail-value">
                      {selectedMember.borrowed?.genre || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">
                      {selectedMember.borrowed?.type || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    {selectedMember.borrowed?.status || null}
                  </div>
                </div> 
              </div>           

                <div className="loans-column">
                  <h2>Holds</h2>
                  <span className="detail-value">{selectedMember.isHolding ? null : "No books on hold."}</span>
                  <div className="book-cover">
                    <img
                    src={selectedMember.holds?.imageUrl || null}
                    alt={selectedMember.holds?.title || null}
                    className="book-detail-image"
                    />
                  </div>
                <div className="book-details">
                  <div className="detail-item">
                    <span className="detail-label">Title:</span>
                    <span className="detail-value">{selectedMember.holds?.title || null}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Author:</span>
                    <span className="detail-value">{selectedMember.holds?.author || null}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">ISBN:</span>
                    <span className="detail-value">
                      {selectedMember.holds?.isbn || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Genre:</span>
                    <span className="detail-value">
                      {selectedMember.holds?.genre || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">
                      {selectedMember.holds?.type || null}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    {selectedMember.holds?.status || null}
                  </div>
                </div> 
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
