import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const AdminDashboard = ({ admin, setAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (admin && admin.role === "admin") {
      fetchMusic();
      fetchUsers();
    }
  }, [admin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      setAdmin(res.data.admin);
      fetchMusic();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  const fetchMusic = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/music");
      setMusicList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { "x-admin-email": admin.email },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !artist) return alert("Provide title, artist, and file");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);
    formData.append("uploadedBy", admin.id);

    try {
      await axios.post("http://localhost:5000/api/admin/music", formData, {
        headers: { "x-admin-email": admin.email },
      });
      fetchMusic();
      setTitle("");
      setArtist("");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const handleDeleteMusic = async (id) => {
    if (!window.confirm("Delete this music?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/music/${id}`, {
        headers: { "x-admin-email": admin.email },
      });
      fetchMusic();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { "x-admin-email": admin.email },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (!admin || admin.role !== "admin") {
    return (
      <div className="admin-dashboard">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
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
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button
        onClick={() => {
          localStorage.removeItem("admin");
          setAdmin(null);
        }}
        style={{ marginBottom: "20px" }}
      >
        Logout
      </button>

      {/* Upload Music Form */}
      <h3>Upload New Music</h3>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".mp3,.wav"
          required
        />
        <button type="submit">Upload Music</button>
      </form>

      {/* Music Table */}
      <h3>Existing Music</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {musicList.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#bbb" }}>No music uploaded yet</td>
            </tr>
          ) : (
            musicList.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.title}</td>
                <td>{m.artist}</td>
                <td>
                  <button onClick={() => handleDeleteMusic(m.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Users Table */}
      <h3>Registered Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#bbb" }}>No users registered yet</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
