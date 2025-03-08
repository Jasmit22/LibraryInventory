import "./Deliveries.css";

function Deliveries() {
  // Sample data for incoming and outgoing deliveries
  const incomingDeliveries = [
    {
      id: 1,
      title: "Book 1",
      author: "Author Name",
      origin: "Publisher A",
      expectedArrival: "2023-12-15",
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author Name",
      origin: "Publisher B",
      expectedArrival: "2023-12-16",
    },
    {
      id: 3,
      title: "Book 3",
      author: "Author Name",
      origin: "Publisher C",
      expectedArrival: "2023-12-17",
    },
  ];

  const outgoingDeliveries = [
    {
      id: 4,
      title: "Book 1",
      author: "Author Name",
      destination: "Member A",
      expectedArrival: "2023-12-15",
    },
    {
      id: 5,
      title: "Book 2",
      author: "Author Name",
      destination: "Member B",
      expectedArrival: "2023-12-16",
    },
    {
      id: 6,
      title: "Book 3",
      author: "Author Name",
      destination: "Member C",
      expectedArrival: "2023-12-17",
    },
  ];

  return (
    <div className="deliveries-container">
      <h1 className="deliveries-title">DELIVERIES</h1>

      <div className="deliveries-grid">
        <div className="deliveries-column">
          <h2 className="column-title">INCOMING</h2>
          <div className="delivery-items">
            {incomingDeliveries.map((delivery) => (
              <div key={delivery.id} className="delivery-item">
                <div className="book-image-placeholder"></div>
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
                    {delivery.expectedArrival}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="deliveries-column">
          <h2 className="column-title">OUTGOING</h2>
          <div className="delivery-items">
            {outgoingDeliveries.map((delivery) => (
              <div key={delivery.id} className="delivery-item">
                <div className="book-image-placeholder"></div>
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
                    {delivery.expectedArrival}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deliveries;
