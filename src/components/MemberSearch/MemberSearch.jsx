import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllMembers} from "../../services/MemberService";
import "./MemberSearch.css";

function MemberSearch() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [allMembers, setAllMembers] = useState([]); // Store all members
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

  return (
    <div className="member-search-container">
      <h1 className="page-title">Member Search</h1>
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
                      <tr key={member.id}>
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
    </div>
  );
}

export default MemberSearch;
