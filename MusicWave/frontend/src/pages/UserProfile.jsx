import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const UserProfile = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/users/profile/${user.id}`)
      .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(err => console.error("Profile fetch error:", err));
  }, [user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return alert("Fill both fields");
    try {
      const res = await axios.put("http://localhost:5000/api/users/change-password", {
        userId: user.id,
        oldPassword,
        newPassword,
      });
      alert(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error changing password");
    }
  };

  if (!user) return <div className="form-container">Please login to view your profile</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="gradient-text">User Profile</h2>
        <div className="profile-info">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>

        <h3 className="gradient-text">Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
