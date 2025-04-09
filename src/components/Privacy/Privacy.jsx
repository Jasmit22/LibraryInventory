import React, { useEffect } from "react";
import "./Privacy.css";

function Privacy() {
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
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Calgary Private Library ("we", "our", or "us") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our library services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We may collect personal information that you provide directly to us,
            including:
          </p>
          <ul>
            <li>
              Contact information (name, email address, phone number, mailing
              address)
            </li>
            <li>Account credentials (username and password)</li>
            <li>Borrowing history and preferences</li>
            <li>Payment information for fees or donations</li>
          </ul>
          <p>
            We may also automatically collect certain information about your
            device and how you interact with our services, including:
          </p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and settings</li>
            <li>Usage data and browsing history within our system</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our library services</li>
            <li>Process transactions and manage your account</li>
            <li>
              Send notifications about your account, borrowed materials, and
              library events
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and other
              illegal activities
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing of Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>
              Other library branches within our network for interlibrary loans
            </li>
            <li>
              Law enforcement or other governmental authorities as required by
              law
            </li>
          </ul>
          <p>
            We will not sell or rent your personal information to third parties
            for marketing purposes.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, and destruction.
          </p>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing of your personal information</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you are a parent or guardian and believe that your child has
            provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@calgaryprivatelibrary.ca.
          </p>
        </section>

        <div className="privacy-footer">
          <p>Last updated: April 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
