import React, { useRef } from "react";
import "../styles.css";

const MusicPlayer = ({ music }) => {
  const audioRef = useRef(null);

  const getAudioSrc = () => {
    if (!music || !music.file_path) return "";
    let path = music.file_path.replace(/^backend\//, "");
    if (!path.startsWith("/")) path = "/" + path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={getAudioSrc()}
        controls
      />
    </div>
  );
};

export default MusicPlayer;
