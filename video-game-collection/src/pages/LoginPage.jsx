import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const isValid =
    email.trim() !== "" &&
    password.trim() !== "";

  async function handleLogin(event) {
    event.preventDefault();

    if (!isValid) return;

    setServerError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message);
        return;
      }

      setUser(data.user);
      navigate("/owned");

    } catch (error) {
      console.error("Login error:", error.message);
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            autoFocus
            onChange={(event) => {
              setEmail(event.target.value);
              setServerError("");
            }}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setServerError("");
            }}
            placeholder="Enter your password"
          />
        </div>

        {serverError && (
          <p className="error-text">{serverError}</p>
        )}

        <button type="submit" disabled={!isValid}>
          Login
        </button>

        <div className="form-group">
          <span>
            Don't have an account? <Link to="/register">Create one</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;