import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //reset password
  const [showResetModal, setShowResetModal] = useState(false); 
  const [resetEmail, setResetEmail] = useState('');             
  const [resetSuccess, setResetSuccess] = useState(false);     
  const [resetError, setResetError] = useState('');

  //dummy info. if user types this in as a password, prompt will show
  const validUser = {
    password: "incorrect",
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    //validation -- errors show up if fields are not filled
    if (!username && !password) {
      setError("Please enter your username and password.");
    } else if (!username) {
      setError("Please enter your username.");
    } else if (!password) {
      setError("Please enter your password.");
    } else if (password == validUser.password) {
      setError("Invalid Username or Password.");
    } else {
      setError(""); 
      onLogin(true);
      navigate("/"); 
    }
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="login-form-wrapper">
        <h2>Login to Calgary Private Library</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error && e.target.value.trim() && password) {
                  setError(""); //if there is an error, it is cleared when the user begins typing
                }
              }}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error && e.target.value.trim() && username) {
                  setError(""); //if there is an error, it will go away if user begins typing
                }
              }}
              placeholder="Enter your password"
            />
            <p
              className="forgot-password"
              onClick={() => setShowResetModal(true)}
            >
              Forgot your password?
            </p>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        {showResetModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              {!resetSuccess ? (
                <>
                  <h2 className="modal-title">Forgot Your Password?</h2>
                  <p className="modal-subtitle">
                    Enter your email address and we will send you instructions to reset your password.
                  </p>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value); 
                      if (resetError) setResetError(''); //goes away if user begins typing again
                    }}
                    className="modal-input"
                  />

                  {resetError && (
                    <p className="modal-error">{resetError}</p>
                  )}

                  <button
                    className="modal-submit"
                    onClick={() => {
                      if (!resetEmail.trim()) {
                        setResetError('Please enter your email address.');
                      } else {
                        setResetSuccess(true);
                        setResetError('');
                      }
                    }}
                  >
                    Continue
                  </button>
                  <p className="modal-link" onClick={() => setShowResetModal(false)}>
                    Back to the Platform
                  </p>
                </>
              ) : (
                <>
                  <h2 className="modal-title">Check Your Email</h2>
                  <p className="modal-subtitle">
                    If an account exists for <span className="highlighted-email">{resetEmail}</span>, we've sent a password reset link to that address.
                  </p>
                  <button
                    className="modal-submit"
                    onClick={() => {
                      setShowResetModal(false);
                      setResetEmail('');
                      setResetSuccess(false);
                    }}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default Login;
