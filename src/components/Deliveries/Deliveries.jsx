import { useState, useEffect } from "react";
import {
  getIncomingDeliveries,
  getOutgoingDeliveries,
} from "../../services/BookService";
import "./Deliveries.css";

function Deliveries() {
  const [incomingDeliveries, setIncomingDeliveries] = useState([]);
  const [outgoingDeliveries, setOutgoingDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const incoming = await getIncomingDeliveries();
        const outgoing = await getOutgoingDeliveries();

        setIncomingDeliveries(incoming);
        setOutgoingDeliveries(outgoing);
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

  return (
    <div className="deliveries-container">
      <h1 className="deliveries-title">Deliveries</h1>

      {loading ? (
        <p className="loading-message">Loading deliveries...</p>
      ) : (
        <div className="deliveries-grid">
          <div className="deliveries-column">
            <h2 className="column-title">INCOMING</h2>
            <div className="delivery-items">
              {incomingDeliveries.length === 0 ? (
                <p className="no-deliveries">
                  No incoming deliveries at this time.
                </p>
              ) : (
                incomingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="delivery-item">
                    <div className="book-image-container">
                      <img
                        src={delivery.imageUrl}
                        alt={delivery.title}
                        className="book-image"
                      />
                    </div>
                    <div className="delivery-details">
                      <p>
                        <strong>Title:</strong> {delivery.title}
                      </p>
                      <p>
                        <strong>Author:</strong> {delivery.author}
                      </p>
                      <p>
                        <strong>Origin:</strong> {delivery.origin}
                      </p>
                      <p>
                        <strong>Expected Arrival:</strong>{" "}
                        {formatDate(delivery.expectedArrival)}
                      </p>
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
              {outgoingDeliveries.length === 0 ? (
                <p className="no-deliveries">
                  No outgoing deliveries at this time.
                </p>
              ) : (
                outgoingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="delivery-item">
                    <div className="book-image-container">
                      <img
                        src={delivery.imageUrl}
                        alt={delivery.title}
                        className="book-image"
                      />
                    </div>
                    <div className="delivery-details">
                      <p>
                        <strong>Title:</strong> {delivery.title}
                      </p>
                      <p>
                        <strong>Author:</strong> {delivery.author}
                      </p>
                      <p>
                        <strong>Destination:</strong> {delivery.destination}
                      </p>
                      <p>
                        <strong>Expected Arrival:</strong>{" "}
                        {formatDate(delivery.expectedArrival)}
                      </p>
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
