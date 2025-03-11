import { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";
import { addMember } from "../../services/MemberService";
import "./AddMember.css";
import { useNavigate } from "react-router-dom";

function AddMember() {
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [addedMember, setAddedMember] = useState(null);


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!memberData.firstName || !memberData.lastName) {
      setError("First and last name are required fields");
      return;
    }
    else if (!email) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Add member with inputted information
      const newMember = await addMember({
        ...memberData,
      });

      setAddedMember(newMember);
      setIsSubmitting(false);
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to add member: " + err.message);
      setIsSubmitting(false);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setMemberData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    })
    setShowConfirmation(false);
    setAddedMember(null);
  };

  // Navigate to member search after adding
  const goToMemberSearch = () => {
    navigate("/member-search");
  }

  // If showing confirmation screen
  if (showConfirmation) {
    return (
      <div className="add-member-container">
        <h1 className="page-title">Add Member</h1>

        <div className="confirmation-container">
          <div className="confirmation-icon">
            <FaCheck />
            </div>
            <h2>Member Added Successfully</h2>
            <p>
              <strong>First Name:</strong> {addedMember.firstName}
              <br />
              <strong>Last Name:</strong> {addedMember.lastName}
              <br />
              <strong>Email:</strong> {addedMember.email}
              <br />
             <strong>Phone:</strong> {addedMember.phone || "Not specified"}
             <br />
             <strong>Address:</strong> {addedMember.address || "Not specified"}
            </p>
          <div className="confirmation-buttons">
            <button className="done-button" onClick={resetForm}>
              <FaPlus /> Add Another Member
            </button>
            <button className="search-button" onClick={goToMemberSearch}>
              Go to Member Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-member-container">
      <h1 className="page-title">Add Member</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-member-form">
        <div classname="form-grid">
          <div classname="member-details-section">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={memberData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={memberData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={memberData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={memberData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
             <textarea
                id="address"
                name="address"
               value={memberData.address}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="add-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Adding...
              </>
            ) : (
              <>
                <FaPlus className="button-icon" />
                Add Member
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
