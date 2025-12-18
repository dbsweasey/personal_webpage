import React, { useState, useEffect } from "react";
import Marquee from "./Marquee";
import notPlaying from "../assets/not-playing.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PORT = import.meta.env.VITE_API_PORT || "none";

let url = BASE_URL;
if (PORT === "none") {
  console.log("In PROD, no port needed");
  url += `:${PORT}`;
}

const spotifyEndpoint = `${url}/currently-playing`;

export default function Spotify() {
  const [track, setTrack] = useState(null);

  const fetchTrack = async () => {
    console.log("Fetching currently playing track...");
    try {
      const res = await fetch(spotifyEndpoint);
      const data = await res.json();
      if (data.playing) setTrack(data.track);
      else setTrack(null);
    } catch (err) {
      console.log("Error fetching track:", err);
    }
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  let trackInfo = {
    name: "Check back later to see what I am listening to.",
    artists: "",
    albumImage: notPlaying,
  };
  if (track) {
    trackInfo = {
      name: track.name,
      artists: track.artists,
      albumImage: track.albumImage,
    };
  }

  return (
    <div className="now-playing">
      <h1>- Now Playing -</h1>
      <div
        style={{
          padding: 0,
          margin: 0,
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={trackInfo.albumImage} alt={trackInfo.name} />
      </div>
      <Marquee text={trackInfo.name} />
      <p>{trackInfo.artists}</p>
    </div>
  );
}
