import React, { useEffect } from "react";
import "./Terms.css";

function Terms() {
  // Show popup when component mounts
  useEffect(() => {
    // Use setTimeout to ensure the alert appears after the page renders
    const timer = setTimeout(() => {
      alert(
        "This page is added for completeness and is under development. Text is AI generated."
      );
    }, 100);

    // Clean up the timer if component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <div className="terms-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Calgary Private Library. These Terms of Service govern
            your use of our website and services. By accessing or using the
            Calgary Private Library system, you agree to be bound by these
            Terms.
          </p>
        </section>

        <section>
          <h2>2. Definitions</h2>
          <p>
            <strong>"Library"</strong> refers to Calgary Private Library, its
            staff, administrators, and representatives.
          </p>
          <p>
            <strong>"User"</strong> refers to any individual who accesses or
            uses the Calgary Private Library system.
          </p>
          <p>
            <strong>"Materials"</strong> refers to books, digital content, and
            other resources available through the Library.
          </p>
        </section>

        <section>
          <h2>3. Library Membership</h2>
          <p>
            Membership to Calgary Private Library is subject to approval. The
            Library reserves the right to deny or revoke membership at its
            discretion.
          </p>
          <p>
            Members are responsible for maintaining the confidentiality of their
            account information and for all activities that occur under their
            account.
          </p>
        </section>

        <section>
          <h2>4. Borrowing Materials</h2>
          <p>
            Members may borrow materials in accordance with the Library's
            lending policies. Members are responsible for returning borrowed
            materials by the due date.
          </p>
          <p>
            Late fees may be applied for overdue materials. Damaged or lost
            materials may result in replacement fees.
          </p>
        </section>

        <section>
          <h2>5. Use of Library Services</h2>
          <p>
            The Library's services are provided for personal, non-commercial use
            only. Users agree not to reproduce, duplicate, copy, sell, trade, or
            exploit any portion of the Library's services for commercial
            purposes.
          </p>
        </section>

        <section>
          <h2>6. Prohibited Activities</h2>
          <p>
            Users agree not to engage in any activity that may interfere with
            the proper functioning of the Library system or infringe upon the
            rights of other users.
          </p>
        </section>

        <section>
          <h2>7. Modifications to Terms</h2>
          <p>
            The Library reserves the right to modify these Terms at any time.
            Continued use of the Library's services after such modifications
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2>8. Termination</h2>
          <p>
            The Library reserves the right to terminate or suspend access to its
            services for any user who violates these Terms.
          </p>
        </section>

        <section>
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Library's services are provided "as is" without warranties of
            any kind, either express or implied.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Alberta, Canada.
          </p>
        </section>

        <section>
          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at
            info@calgaryprivatelibrary.ca.
          </p>
        </section>

        <div className="terms-footer">
          <p>Last updated: April 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
