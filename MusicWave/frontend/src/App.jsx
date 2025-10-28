import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MusicList from "./pages/MusicList";
import UserProfile from "./pages/UserProfile";
import Playlist from "./pages/Playlist";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));
      if (storedUser) setUser(storedUser);
      if (storedAdmin) setAdmin(storedAdmin);
    } catch (err) {
      console.error("Error parsing stored user/admin data:", err);
    }
  }, []);

  return (
    <Router>
      <Header user={user} admin={admin} setUser={setUser} setAdmin={setAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} setAdmin={setAdmin} />} />
        <Route path="/signup" element={<Signup setUser={setUser} setAdmin={setAdmin} />} />
        <Route path="/music" element={<MusicList />} />
        <Route path="/playlist" element={<Playlist user={user} />} />
        <Route path="/admin" element={<AdminDashboard admin={admin} setAdmin={setAdmin} />} />
        <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
