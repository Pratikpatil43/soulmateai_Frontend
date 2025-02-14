import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSpinner } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccessMessage("You're officially part of soulmateAI! 😘 Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Oops! Something went wrong 😔");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        tokenId: credentialResponse.credential,
      });
      setSuccessMessage("Google login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="698396860481-5q2nuvgjqqbnohldr25387fmm5qs24pb.apps.googleusercontent.com">
      <div className="d-flex justify-content-center align-items-center vh-100" 
        style={{ background: "linear-gradient(to right, #ffb6c1, #ff6f61)" }}>
        <div className="card shadow-lg p-4" style={{ width: "25rem", borderRadius: "15px" }}>
          
          <h2 className="text-center text-white mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Sign Up, Gorgeous! 🌸
          </h2>
          
          <div className="text-center" 
            style={{ fontSize: "3rem", color: "#ff1493", fontWeight: "bold", marginBottom: "20px", fontFamily: "'Pacifico', cursive" }}>
            <span role="img" aria-label="heart">❤️</span> soulmateAI <span role="img" aria-label="heart">❤️</span>
          </div>

          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="what is your full name dear? 😉"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email (So we can be in touch 😉)"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Choose a strong password 💪"
                value={formData.password}
                onChange={handleChange}
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
            <div className="mb-3">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select"
                style={{ borderRadius: "10px" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="btn btn-danger w-100" 
              style={{ borderRadius: "10px", fontSize: "1.1rem" }}
              disabled={loading}
            >
              {loading ? <FaSpinner className="fa-spin" /> : "Sign Up and Join the Fun 💖"}
            </button>
          </form>
          
          <div className="mt-3 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError("Google login failed. Please try again.")}
              className="btn btn-light w-100 mt-2"
            />
          </div>

          <p className="mt-3 text-center text-dark">
            Already have an account? <a href="/" className="text-dark">Login</a> and let's get started!
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
