import { useState, useEffect } from "react";
import {
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaBuilding,
  FaBarcode,
  FaBook,
  FaUser,
} from "react-icons/fa";
import Modal from "../common/Modal/Modal";
import "./OrderBookReview.css";

function OrderBookReview() {
  // Show alert when component mounts, but after render
  useEffect(() => {
    // Use setTimeout to delay the alert until after the page renders
    const timer = setTimeout(() => {
      alert("Feature under development, skeleton of implementation shown");
    }, 100);

    // Clean up the timer if component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, []);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  // Load sample requests on component mount
  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      try {
        // Simulate API call to fetch requests
        await new Promise((resolve) => setTimeout(resolve, 150));

        // Sample data for demonstration
        const sampleRequests = [
          {
            id: "req-001",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            isbn: "9780743273565",
            type: "Hardcover",
            requestDate: "2023-07-15T10:30:00Z",
            requestedBy: "Downtown Branch",
            requesterId: "lib2",
            status: "pending",
            urgency: "normal",
            quantity: 1,
            notes: "Needed for book club discussion next month",
            estimatedArrival: "2023-07-22T00:00:00Z",
          },
          {
            id: "req-002",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            isbn: "9780061120084",
            type: "Paperback",
            requestDate: "2023-07-14T14:15:00Z",
            requestedBy: "Westside Library",
            requesterId: "lib3",
            status: "pending",
            urgency: "urgent",
            quantity: 2,
            notes: "All copies at requestor location are damaged",
            estimatedArrival: "2023-07-17T00:00:00Z",
          },
          {
            id: "req-003",
            title: "1984",
            author: "George Orwell",
            isbn: "9780451524935",
            type: "Paperback",
            requestDate: "2023-07-13T09:45:00Z",
            requestedBy: "Eastside Branch",
            requesterId: "lib4",
            status: "pending",
            urgency: "low",
            quantity: 1,
            notes: "",
            estimatedArrival: "2023-07-27T00:00:00Z",
          },
          {
            id: "req-004",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            isbn: "9780141439518",
            type: "Hardcover",
            requestDate: "2023-07-12T16:20:00Z",
            requestedBy: "North County Library",
            requesterId: "lib5",
            status: "approved",
            urgency: "normal",
            quantity: 3,
            notes: "For summer reading program",
            estimatedArrival: "2023-07-19T00:00:00Z",
            approvedDate: "2023-07-13T10:15:00Z",
          },
          {
            id: "req-005",
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            isbn: "9780547928227",
            type: "Hardcover",
            requestDate: "2023-07-11T11:30:00Z",
            requestedBy: "Downtown Branch",
            requesterId: "lib2",
            status: "declined",
            urgency: "urgent",
            quantity: 1,
            notes: "Last copy in circulation",
            declinedDate: "2023-07-12T09:45:00Z",
            declineReason: "All copies currently checked out or on hold",
          },
        ];

        setRequests(sampleRequests);
      } catch (err) {
        setError("Failed to load requests: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Handle request selection
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  // Handle request approval
  const handleApproveRequest = async () => {
    try {
      // In a real app, this would call an API to approve the request
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Update the request status in our local state
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "approved",
              approvedDate: new Date().toISOString(),
            }
          : req
      );

      setRequests(updatedRequests);
      setShowRequestDetails(false);
      setConfirmationType("approved");
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to approve request: " + err.message);
    }
  };

  // Handle request decline
  const handleDeclineRequest = async () => {
    try {
      // In a real app, this would call an API to decline the request
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Update the request status in our local state
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: "declined",
              declinedDate: new Date().toISOString(),
              declineReason: "All copies currently checked out or on hold", // Default reason
            }
          : req
      );

      setRequests(updatedRequests);
      setShowRequestDetails(false);
      setConfirmationType("declined");
      setShowConfirmation(true);
    } catch (err) {
      setError("Failed to decline request: " + err.message);
    }
  };

  // Close confirmation modal
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Get urgency label
  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case "urgent":
        return "Urgent (2-3 days)";
      case "normal":
        return "Normal (5-7 days)";
      case "low":
        return "Low (1-2 weeks)";
      default:
        return "Normal";
    }
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "declined":
        return "status-declined";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="order-book-review-container">
      <h1 className="page-title">Review Book Requests</h1>
      <p className="page-description">
        Review and manage incoming book requests from other library locations
      </p>

      {error && (
        <div className="error-message">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* Requests List */}
      <div className="requests-list-container">
        <h2 className="section-title">Book Requests</h2>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="no-requests">
            <p>No requests found.</p>
          </div>
        ) : (
          <div className="requests-grid">
            {requests.map((request) => (
              <div
                key={request.id}
                className="request-card"
                onClick={() => handleRequestClick(request)}
              >
                <div className="request-header">
                  <h3 className="request-title">{request.title}</h3>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      request.status
                    )}`}
                    title={
                      request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)
                    }
                  >
                    {request.status === "approved" && (
                      <>
                        Approved{" "}
                        <FaCheck size={14} style={{ marginLeft: "5px" }} />
                      </>
                    )}
                    {request.status === "declined" && (
                      <>
                        Declined{" "}
                        <FaTimes size={14} style={{ marginLeft: "5px" }} />
                      </>
                    )}
                    {request.status === "pending" && (
                      <>
                        Pending{" "}
                        <FaCalendarAlt
                          size={14}
                          style={{ marginLeft: "5px" }}
                        />
                      </>
                    )}
                  </span>
                </div>

                <div className="request-details">
                  <p className="request-author">by {request.author}</p>

                  <div className="request-info-row">
                    <div className="request-info-item">
                      <FaBuilding className="info-icon" />
                      <span>{request.requestedBy}</span>
                    </div>

                    <div className="request-info-item">
                      <FaCalendarAlt className="info-icon" />
                      <span>{formatDate(request.requestDate)}</span>
                    </div>
                  </div>

                  <div className="request-info-row">
                    <div className="request-info-item">
                      <span className={`urgency-indicator ${request.urgency}`}>
                        {getUrgencyLabel(request.urgency)}
                      </span>
                    </div>

                    <div className="request-info-item">
                      <span>Qty: {request.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="request-footer">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      <Modal
        isOpen={showRequestDetails}
        onClose={() => setShowRequestDetails(false)}
        title="Request Details"
        size="large"
      >
        {selectedRequest && (
          <div className="request-details-container">
            <div className="request-details-header">
              <h2 className="request-title">{selectedRequest.title}</h2>
              <p className="request-author">by {selectedRequest.author}</p>
            </div>

            <div className="request-details-grid">
              <div className="details-column">
                <h3 className="details-section-title">Book Information</h3>

                <div className="detail-item">
                  <span className="detail-label">
                    <FaBook className="detail-icon" /> Title
                  </span>
                  <span className="detail-value">{selectedRequest.title}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Author</span>
                  <span className="detail-value">{selectedRequest.author}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">
                    <FaBarcode className="detail-icon" /> ISBN
                  </span>
                  <span className="detail-value">{selectedRequest.isbn}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{selectedRequest.type}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Quantity</span>
                  <span className="detail-value">
                    {selectedRequest.quantity}
                  </span>
                </div>
              </div>

              <div className="details-column">
                <h3 className="details-section-title">Request Information</h3>

                <div className="detail-item">
                  <span className="detail-label">
                    <FaUser className="detail-icon" /> Requested By
                  </span>
                  <span className="detail-value">
                    {selectedRequest.requestedBy}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">
                    <FaCalendarAlt className="detail-icon" /> Request Date
                  </span>
                  <span className="detail-value">
                    {formatDate(selectedRequest.requestDate)} at{" "}
                    {formatTime(selectedRequest.requestDate)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Urgency</span>
                  <span
                    className={`detail-value urgency-${selectedRequest.urgency}`}
                  >
                    {getUrgencyLabel(selectedRequest.urgency)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span
                    className={`detail-value status-${selectedRequest.status}`}
                  >
                    {selectedRequest.status.charAt(0).toUpperCase() +
                      selectedRequest.status.slice(1)}
                  </span>
                </div>

                {selectedRequest.approvedDate && (
                  <div className="detail-item">
                    <span className="detail-label">Approved Date</span>
                    <span className="detail-value">
                      {formatDate(selectedRequest.approvedDate)}
                    </span>
                  </div>
                )}

                {selectedRequest.declinedDate && (
                  <div className="detail-item">
                    <span className="detail-label">Declined Date</span>
                    <span className="detail-value">
                      {formatDate(selectedRequest.declinedDate)}
                    </span>
                  </div>
                )}

                {selectedRequest.declineReason && (
                  <div className="detail-item">
                    <span className="detail-label">Decline Reason</span>
                    <span className="detail-value">
                      {selectedRequest.declineReason}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {selectedRequest.notes && (
              <div className="notes-section">
                <h3 className="details-section-title">Notes</h3>
                <p className="notes-content">{selectedRequest.notes}</p>
              </div>
            )}

            {selectedRequest.status === "pending" && (
              <div className="request-actions">
                <button
                  className="decline-button"
                  onClick={handleDeclineRequest}
                >
                  <FaTimes /> Decline Request
                </button>
                <button
                  className="approve-button"
                  onClick={handleApproveRequest}
                >
                  <FaCheck /> Approve Request
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        title={
          confirmationType === "approved"
            ? "Request Approved"
            : "Request Declined"
        }
        size="small"
      >
        <div className="confirmation-content">
          <div className={`confirmation-icon ${confirmationType}`}>
            {confirmationType === "approved" ? <FaCheck /> : <FaTimes />}
          </div>

          <h3 className="confirmation-title">
            Request {confirmationType === "approved" ? "Approved" : "Declined"}{" "}
            Successfully
          </h3>

          <p className="confirmation-message">
            {confirmationType === "approved"
              ? "The book request has been approved and the requesting library has been notified."
              : "The book request has been declined and the requesting library has been notified."}
          </p>

          <div className="confirmation-details">
            <div className="confirmation-detail-item">
              <span className="detail-label">Book:</span>{" "}
              <strong>{selectedRequest?.title}</strong>
            </div>
            <div className="confirmation-detail-item">
              <span className="detail-label">Requested by:</span>{" "}
              <strong>{selectedRequest?.requestedBy}</strong>
            </div>
            <div className="confirmation-detail-item">
              <span className="detail-label">Date:</span>{" "}
              <strong>{formatDate(new Date().toISOString())}</strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="done-button" onClick={handleCloseConfirmation}>
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OrderBookReview;
