import { useEffect, useState } from "react";
import "./Intro.css";
import Explode from "./Explode";

export default function Intro() {
  const whiteStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "white",
    zIndex: 99,
    transition: "opacity 4s ease",
  };

  const introStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "radial-gradient(circle, #000000, white)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    transition: "opacity 2s ease",
  };

  const [white, setWhite] = useState(true);
  const [intro, setIntro] = useState(true);
  const [textState, setTextState] = useState("start");
  useEffect(() => {
    const start = () => {
      // Initial white fade out
      setWhite(false);

      // Name fade in
      const showTextTimeout = setTimeout(() => setTextState("show"), 500);
      // Name explode!
      const explodeTextTimeout = setTimeout(
        () => setTextState("explode"),
        2500
      );

      // Intro fade out
      const introTimeout = setTimeout(() => setIntro(false), 2500);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start);
    }

    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <div style={{ ...introStyle, opacity: intro ? 1 : 0 }}>
      <div style={{ ...whiteStyle, opacity: white ? 1 : 0 }}></div>
      {textState === "explode" && <Explode />}
      <div className={`intro-text ${textState}`}>David B Sweasey</div>
    </div>
  );
}
