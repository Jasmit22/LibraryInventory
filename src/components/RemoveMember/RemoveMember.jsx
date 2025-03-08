import { useState } from "react";
import "./RemoveMember.css";

function RemoveMember() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="remove-member-container">
      <h1 className="page-title">Remove Member</h1>
      <p>Search for a member to remove from the library system.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or member ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="results-placeholder">
        <p>Member search results will appear here</p>
      </div>

      {selectedMember && (
        <div className="confirmation-dialog">
          <h2>Confirm Removal</h2>
          <p>Are you sure you want to remove this member from the system?</p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel</button>
            <button className="remove-button">Remove Member</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RemoveMember;
