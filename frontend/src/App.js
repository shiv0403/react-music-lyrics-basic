import React, { useState } from "react";
import "./App.css";
import axios from "./axios";

function App() {
  const [available, setAvailable] = useState(0);
  const [song, setsong] = useState("");
  const [artist, setartist] = useState("");
  const [lyrics, setlyrics] = useState("");

  const handleSong = (e) => {
    setsong(e.target.value);
  };

  const handleArtist = (e) => {
    setartist(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlyrics(await axios.get(`/${song}&${artist}`));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="songName"
          placeholder="song name"
          onChange={handleSong}
        />
        <input
          type="text"
          name="artistName"
          placeholder="artist name"
          onChange={handleArtist}
        />
        <button>Get lyrics</button>
      </form>

      <div className="app_lyrics">{lyrics}</div>
    </div>
  );
}

export default App;

// 1e1f22ab46674c90529e1a35be559d02
