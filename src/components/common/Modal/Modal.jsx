import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./Modal.css";

function Modal({ isOpen, onClose, title, children, size = "medium" }) {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Handle modal visibility with animation timing
  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      setIsVisible(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this to your CSS transition duration
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "modal-overlay-visible" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`modal-container modal-${size} ${
          isOpen ? "modal-container-visible" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
