function RemovalConfirmation({ removedBookTitle }) {
  return (
    <div className="success-confirmation">
      <h3>"{removedBookTitle}"</h3>
      <p>removed</p>
      <div className="confirmation-icon">
        <div className="checkmark"></div>
      </div>
    </div>
  );
}

export default RemovalConfirmation;
