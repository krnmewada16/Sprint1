import React from "react";
import "../styles.css"; // Import global CSS

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to MusicWave</h2>
      <p>Discover, listen, and manage your music collection easily!</p>
      <p>Use the navigation above to explore music or login/signup.</p>
      <div style={{ marginTop: "30px" }}>
        <a href="/music" className="button-link">Explore Music</a>
      </div>
    </div>
  );
};

export default Home;
