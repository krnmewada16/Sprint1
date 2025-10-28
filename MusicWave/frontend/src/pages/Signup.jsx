import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Signup = ({ setUser, setAdmin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", { username, email, password });
      alert(res.data.message);

      // Auto-login after signup
      const loginRes = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const loggedInUser = loginRes.data.user;
      if (!loggedInUser) return alert("Signup succeeded but auto-login failed.");

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
      alert(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="form-container">
      <h2 className="gradient-text">Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
