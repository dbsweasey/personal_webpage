import React, { useState, useEffect } from "react";
import Marquee from "./Marquee";
import notPlaying from "../assets/not-playing.png";

const backendURL = import.meta.env.VITE_API_BASE_URL;
const port = 8080;
const spotifyEndpoint = `${backendURL}/currently-playing`;

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
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Horizon",
        textWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center", margin: 0, marginTop: "20px" }}>
        - Now Playing -
      </h1>
      <div
        style={{
          padding: 0,
          margin: 0,
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={trackInfo.albumImage}
          alt={trackInfo.name}
          style={{
            margin: 0,
            borderRadius: "10px",
            boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.438)",
            width: "60%",
            height: "60%",
          }}
        />
      </div>
      <Marquee text={trackInfo.name} />
      <p
        style={{
          margin: "10px 20px 10px 20px",
          fontFamily: "Courier New, Courier, monospace",
        }}
      >
        {trackInfo.artists}
      </p>
    </div>
  );
}
