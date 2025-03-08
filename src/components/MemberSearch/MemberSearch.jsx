import { useState } from "react";
import "./MemberSearch.css";

function MemberSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="member-search-container">
      <h1 className="page-title">Member Search</h1>
      <p>Search for library members by name, ID, or email.</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <div className="results-placeholder">
        <p>Member search results will appear here</p>
      </div>
    </div>
  );
}

export default MemberSearch;
