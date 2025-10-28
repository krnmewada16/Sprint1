import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Header = ({ user, admin, setUser, setAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    if (setUser) setUser(null);
    if (setAdmin) setAdmin(null);
    navigate("/");
  };

  return (
    <header>
      <h1>MusicWave</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/music">Music</Link>

        {admin?.role === "admin" && (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <span style={{ color: "#ff6f61", fontWeight: "500" }}>
              Welcome, {admin.username}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {user && (!admin || admin.role !== "admin") && (
          <>
            <span style={{ color: "#ff6f61", fontWeight: "500" }}>
              Welcome, {user.username}
            </span>
            <Link to="/playlist">Your Playlists</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!user && !admin && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
