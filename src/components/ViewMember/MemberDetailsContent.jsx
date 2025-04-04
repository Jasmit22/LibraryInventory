import { FaBook, FaCalendarAlt } from "react-icons/fa";

function MemberDetailsContent({ member }) {
  return (
    <div className="member-details-grid">
      <div className="member-details">
        <div className="member-details-column">
          <h2>Personal Information</h2>

          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">
              {member.firstName} {member.lastName}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Member ID</span>
            <span className="detail-value">{member.id}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{member.email}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Phone</span>
            <span className="detail-value">
              {member.phone || (
                <span className="empty-state">Not provided</span>
              )}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Address</span>
            <span className="detail-value">
              {member.address || (
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

          {!member.isBorrowing ? (
            <span className="empty-state">No books currently borrowed</span>
          ) : (
            <div className="book-loan-details">
              <div className="book-cover">
                <img
                  src={member.borrowed?.imageUrl}
                  alt={member.borrowed?.title}
                  className="book-detail-image"
                />
              </div>

              <div className="book-details">
                <div className="detail-item">
                  <span className="detail-label">Title</span>
                  <span className="detail-value">{member.borrowed?.title}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Author</span>
                  <span className="detail-value">
                    {member.borrowed?.author}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">ISBN</span>
                  <span className="detail-value">{member.borrowed?.isbn}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Due Date</span>
                  <span className="detail-value status-available">
                    <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                    {member.borrowed?.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="loans-column">
          <h2>
            <FaBook style={{ marginRight: "0.5rem" }} />
            On Hold
          </h2>

          {!member.isHolding ? (
            <span className="empty-state">No books currently on hold</span>
          ) : (
            <div className="book-loan-details">
              <div className="book-cover">
                <img
                  src={member.holds?.imageUrl}
                  alt={member.holds?.title}
                  className="book-detail-image"
                />
              </div>

              <div className="book-details">
                <div className="detail-item">
                  <span className="detail-label">Title</span>
                  <span className="detail-value">{member.holds?.title}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Author</span>
                  <span className="detail-value">{member.holds?.author}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">ISBN</span>
                  <span className="detail-value">{member.holds?.isbn}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Wait Time</span>
                  <span className="detail-value status-unavailable">
                    <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                    {member.holds?.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsContent;
