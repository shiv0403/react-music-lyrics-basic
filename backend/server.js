const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;

async function getLyrics(song, artist) {
  const new_song = song.split(" ");
  var final_song = "";
  for (var i = 0; i < new_song.length - 1; ++i) {
    final_song += new_song[i] + "%20";
  }

  final_song += new_song[new_song.length - 1];
  const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${final_song}&q_artist=${artist}&apikey=1e1f22ab46674c90529e1a35be559d02`;
  const req = await fetch(url);
  const data = req.json();
  console.log(data);
  return data;
}

app.get("/", (req, res) => {
  res.send("This is home route!");
});

app.get("/:song&:artist", (req, res) => {
  const song = req.params.song;
  const artist = req.params.artist;
  getLyrics(song, artist).then((data) => {
    res.send(data.message.body.lyrics.lyrics_body);
  });
});

app.listen(port, () => {
  console.log("Server is running!");
});
