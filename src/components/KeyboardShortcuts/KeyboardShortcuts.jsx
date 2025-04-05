import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Alt/Option key (metaKey is Command on Mac)
      if (event.altKey) {
        // For Mac, Option+key combinations often produce special characters
        // So we need to check both the key and keyCode

        // Map keyCodes to our navigation paths
        const keyCodeMap = {
          65: "/add-book", // A
          83: "/book-search", // S
          82: "/remove-edit-book", // R
          69: "/remove-edit-book", // E
          77: "/view-member", // M
          68: "/deliveries", // D
          79: "/order-book", // O
          76: "/", // L (for Landing/Home page)
        };

        if (keyCodeMap[event.keyCode]) {
          event.preventDefault();
          navigate(keyCodeMap[event.keyCode]);
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // This component doesn't render anything
  return null;
}

export default KeyboardShortcuts;
