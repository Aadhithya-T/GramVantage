import React, { useState } from "react";
import api from "../config/axios";
import SignupForm from "./SignupForm";

const LoginPage = () => {
  console.log("LoginPage rendered");
  const [authMode, setAuthMode] = useState("login");
  const [activeTab, setActiveTab] = useState("citizen");
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (
      activeTab !== "citizen" &&
      (formData.code.length !== 5 || !/^\d+$/.test(formData.code))
    ) {
      setError("Please enter a valid 5-digit Organization Code");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    console.log("FORM SUBMITTED");
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let endpoint = "";
      let payload = {};

      if (activeTab === "citizen") {
        payload = { mobile: formData.mobile, password: formData.password };
      } else {
        payload = { code: formData.code, password: formData.password };
      }

      endpoint = `/api/login/${activeTab}`;
      console.log("Endpoint:", endpoint);
      console.log("Payload:", payload);
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.user.userType);

      switch (data.user.userType) {
        case "citizen":
          window.location.href = "/dashboard/citizen";
          break;
        case "official":
          window.location.href = "/dashboard/official";
          break;
        case "ngo":
          window.location.href = "/dashboard/ngo";
          break;
        default:
          window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Operation failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="app-name">GramVantage</h1>
      </div>
      <div className="login-card">
        <div className="auth-toggle">
          {authMode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                className="toggle-button"
                onClick={() => {
                  setAuthMode("signup");
                  setError("");
                }}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button
                className="toggle-button"
                onClick={() => {
                  setAuthMode("login");
                  setError("");
                }}
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {authMode === "login" ? (
          <>
            <div className="tab-container">
              <button
                className={activeTab === "citizen" ? "active-tab" : "tab"}
                onClick={() => {
                  setActiveTab("citizen");
                  setError("");
                }}
              >
                Citizen Login
              </button>
              <button
                className={activeTab === "official" ? "active-tab" : "tab"}
                onClick={() => {
                  setActiveTab("official");
                  setError("");
                }}
              >
                Official Login
              </button>
              <button
                className={activeTab === "ngo" ? "active-tab" : "tab"}
                onClick={() => {
                  setActiveTab("ngo");
                  setError("");
                }}
              >
                NGO Login
              </button>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="login-error">{error}</div>}
              {activeTab === "citizen" ? (
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="login-input"
                  required
                />
              ) : (
                <input
                  type="text"
                  name="code"
                  placeholder="5-Digit Organization Code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="login-input"
                  maxLength={5}
                  pattern="\d{5}"
                  title="Please enter a valid 5-digit organization code"
                  required
                />
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
                required
              />
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
};
export default LoginPage;
