function EditConfirmation({ editedBookTitle, editChanges }) {
  return (
    <div className="success-confirmation">
      <h3>"{editedBookTitle}"</h3>
      <p>updated</p>
      {editChanges.length > 0 && (
        <div className="changes-list">
          <p className="changes-title">Changes made:</p>
          <ul>
            {editChanges.map((change, index) => (
              <li key={index}>
                <strong>{change.field}:</strong> {change.from} → {change.to}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="confirmation-icon">
        <div className="checkmark"></div>
      </div>
    </div>
  );
}

export default EditConfirmation;
