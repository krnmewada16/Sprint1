import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = ({ setUser, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const loggedInUser = res.data.user;
      if (!loggedInUser) return alert("Login failed. User not found.");

      if (loggedInUser.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(loggedInUser));
        setAdmin && setAdmin(loggedInUser);
        navigate("/admin");
      } else {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser && setUser(loggedInUser);
        navigate("/music");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="form-container">
      <h2 className="gradient-text">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email" // <- updated for HTML5 validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
