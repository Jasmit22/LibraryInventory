import { useState, useEffect } from "react";
import {
  FaSearch,
  FaArrowRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  getIncomingDeliveries,
  getOutgoingDeliveries,
} from "../../services/BookService";
import "./Deliveries.css";

function Deliveries() {
  const [incomingDeliveries, setIncomingDeliveries] = useState([]);
  const [outgoingDeliveries, setOutgoingDeliveries] = useState([]);
  const [filteredIncoming, setFilteredIncoming] = useState([]);
  const [filteredOutgoing, setFilteredOutgoing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const incoming = await getIncomingDeliveries();
        const outgoing = await getOutgoingDeliveries();

        setIncomingDeliveries(incoming);
        setOutgoingDeliveries(outgoing);
        setFilteredIncoming(incoming);
        setFilteredOutgoing(outgoing);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();

    if (query.trim() === "") {
      setFilteredIncoming(incomingDeliveries);
      setFilteredOutgoing(outgoingDeliveries);
    } else {
      const filteredIncoming = incomingDeliveries.filter(
        (delivery) =>
          delivery.title.toLowerCase().includes(query) ||
          delivery.author.toLowerCase().includes(query) ||
          delivery.origin.toLowerCase().includes(query) ||
          (delivery.genre && delivery.genre.toLowerCase().includes(query)) ||
          (delivery.status && delivery.status.toLowerCase().includes(query))
      );

      const filteredOutgoing = outgoingDeliveries.filter(
        (delivery) =>
          delivery.title.toLowerCase().includes(query) ||
          delivery.author.toLowerCase().includes(query) ||
          delivery.destination.toLowerCase().includes(query) ||
          (delivery.genre && delivery.genre.toLowerCase().includes(query)) ||
          (delivery.status && delivery.status.toLowerCase().includes(query))
      );

      setFilteredIncoming(filteredIncoming);
      setFilteredOutgoing(filteredOutgoing);
    }
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    if (!status) return "";

    switch (status.toLowerCase()) {
      case "arrived":
      case "delivered":
        return "status-success";
      case "delayed":
        return "status-warning";
      case "on schedule":
      case "in transit":
        return "status-info";
      default:
        return "";
    }
  };

  return (
    <div className="deliveries-container">
      <h1 className="deliveries-title">Deliveries</h1>
      <p className="page-description">
        Track incoming and outgoing book deliveries
      </p>

      {/* Search Bar - Updated to match BookSearch exactly */}
      <form onSubmit={handleSearch} className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, author, origin/destination, genre or status"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch className="search-button-icon" />
          </button>
        </div>
      </form>

      {loading ? (
        <p className="loading-message">Loading deliveries...</p>
      ) : (
        <div className="deliveries-grid">
          <div className="deliveries-column">
            <h2 className="column-title">INCOMING</h2>
            <div className="delivery-items">
              {filteredIncoming.length === 0 ? (
                <p className="no-deliveries">
                  {searchQuery
                    ? "No matching incoming deliveries found."
                    : "No incoming deliveries at this time."}
                </p>
              ) : (
                filteredIncoming.map((delivery) => (
                  <div key={delivery.id} className="delivery-item">
                    <div className="delivery-type-indicator incoming">
                      <span>INCOMING</span>
                    </div>
                    <div className="book-image-container">
                      <img
                        src={delivery.imageUrl}
                        alt={delivery.title}
                        className="book-image"
                      />
                    </div>
                    <div className="delivery-details">
                      <div className="delivery-header">
                        <p className="delivery-title">
                          <strong>{delivery.title}</strong>
                        </p>
                        <span
                          className={`status-badge ${getStatusBadgeClass(
                            delivery.status
                          )}`}
                        >
                          {delivery.status || "On Schedule"}
                        </span>
                      </div>
                      <p>
                        <strong>Author:</strong> {delivery.author}
                      </p>

                      {/* Origin-Destination Section */}
                      <div className="delivery-route">
                        <div className="route-point origin">
                          <FaMapMarkerAlt className="route-icon" />
                          <div className="route-info">
                            <span className="route-label">From:</span>
                            <span className="route-value">
                              {delivery.origin}
                            </span>
                          </div>
                        </div>
                        <div className="route-arrow">
                          <FaArrowRight />
                        </div>
                        <div className="route-point destination">
                          <FaMapMarkerAlt className="route-icon" />
                          <div className="route-info">
                            <span className="route-label">To:</span>
                            <span className="route-value">Library</span>
                          </div>
                        </div>
                      </div>

                      <div className="delivery-date">
                        <FaCalendarAlt className="date-icon" />
                        <div className="date-info">
                          <span className="date-label">Expected Arrival:</span>
                          <span className="date-value">
                            {formatDate(delivery.expectedArrival)}
                          </span>
                        </div>
                      </div>

                      {delivery.genre && (
                        <p>
                          <strong>Genre:</strong> {delivery.genre}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="deliveries-column">
            <h2 className="column-title">OUTGOING</h2>
            <div className="delivery-items">
              {filteredOutgoing.length === 0 ? (
                <p className="no-deliveries">
                  {searchQuery
                    ? "No matching outgoing deliveries found."
                    : "No outgoing deliveries at this time."}
                </p>
              ) : (
                filteredOutgoing.map((delivery) => (
                  <div key={delivery.id} className="delivery-item">
                    <div className="delivery-type-indicator outgoing">
                      <span>OUTGOING</span>
                    </div>
                    <div className="book-image-container">
                      <img
                        src={delivery.imageUrl}
                        alt={delivery.title}
                        className="book-image"
                      />
                    </div>
                    <div className="delivery-details">
                      <div className="delivery-header">
                        <p className="delivery-title">
                          <strong>{delivery.title}</strong>
                        </p>
                        <span
                          className={`status-badge ${getStatusBadgeClass(
                            delivery.status
                          )}`}
                        >
                          {delivery.status || "In Transit"}
                        </span>
                      </div>
                      <p>
                        <strong>Author:</strong> {delivery.author}
                      </p>

                      {/* Origin-Destination Section */}
                      <div className="delivery-route">
                        <div className="route-point origin">
                          <FaMapMarkerAlt className="route-icon" />
                          <div className="route-info">
                            <span className="route-label">From:</span>
                            <span className="route-value">Library</span>
                          </div>
                        </div>
                        <div className="route-arrow">
                          <FaArrowRight />
                        </div>
                        <div className="route-point destination">
                          <FaMapMarkerAlt className="route-icon" />
                          <div className="route-info">
                            <span className="route-label">To:</span>
                            <span className="route-value">
                              {delivery.destination}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="delivery-date">
                        <FaCalendarAlt className="date-icon" />
                        <div className="date-info">
                          <span className="date-label">Expected Arrival:</span>
                          <span className="date-value">
                            {formatDate(delivery.expectedArrival)}
                          </span>
                        </div>
                      </div>

                      {delivery.genre && (
                        <p>
                          <strong>Genre:</strong> {delivery.genre}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deliveries;
