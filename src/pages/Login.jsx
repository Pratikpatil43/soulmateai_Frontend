import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  // New state for success message
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      sessionStorage.setItem("token", res.data.token);
      setSuccessMessage("Login successful! Redirecting...");  // Set success message
      setTimeout(() => {
        navigate("/chat");  // Redirect after success message
      }, 1500);  // Delay for 1.5 seconds to show the success message
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setSuccessMessage("");  // Clear success message on error
    } finally {
      setLoading(false); // Reset loading when request finishes (success or failure)
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
      style={{ background: "linear-gradient(to right, #ffb6c1, #ff6f61)" }}>
      <div className="card shadow-lg p-4" style={{ width: "25rem", borderRadius: "15px" }}>
        <h2 className="text-center text-white mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>Login</h2>
        
        {/* SoulmateAI Text with Heart Icon */}
        <div 
          className="text-center" 
          style={{
            fontSize: "3rem", 
            color: "#ff1493", 
            fontWeight: "bold", 
            marginBottom: "20px",
            fontFamily: "'Pacifico', cursive"
          }}
        >
          <span role="img" aria-label="heart">❤️</span> soulmateAI <span role="img" aria-label="heart">❤️</span>
        </div>

        {/* Success message */}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}

        {/* Error message */}
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password 💪"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              style={{ borderRadius: "10px" }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
              style={{ cursor: "pointer" }}
            >
              <span role="img" aria-label="eye">
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </button>
          </div>
          <button 
            type="submit" 
            className="btn btn-danger w-100" 
            style={{ borderRadius: "10px", fontSize: "1.1rem" }}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Spinner animation="border" size="sm" />  // Show spinner while loading
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-3 text-center text-dark">
          Don't have an account? <a href="/signup" className="mt-3 text-center text-dark">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
