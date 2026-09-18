import { useState, useEffect, useRef } from "react";
import floatingNameText from "../assets/floatingNameText.json";

export default function FloatingName(props) {
  const [showName, setShowName] = useState(false);
  const [animClass, setAnimClass] = useState("");
  // Tracks whether the name has already been revealed once, so the fly-in
  // entrance never replays after the first time (toggling the intro or the
  // stars later just switches the resting/hover class). Only read/written
  // inside effects, never during render.
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (props.intro) {
      setShowName(true);
      return;
    }

    const nameTimeout = setTimeout(() => setShowName(true), 4000);

    return () => clearTimeout(nameTimeout);
  }, [props.intro]);

  useEffect(() => {
    if (!showName) {
      setAnimClass("");
      return;
    }

    // The floating/hover bob is part of the ambient stars effect, not the
    // one-time intro sequence - it can be toggled independently at any time.
    if (hasRevealedRef.current) {
      setAnimClass(props.starsEnabled ? "name-hover" : "name-static");
      return;
    }

    hasRevealedRef.current = true;
    if (props.introEnabled && props.starsEnabled) {
      setAnimClass("name-anim");
    } else if (props.introEnabled) {
      setAnimClass("name-fly-in");
    } else if (props.starsEnabled) {
      setAnimClass("name-hover");
    } else {
      setAnimClass("name-static");
    }
  }, [showName, props.introEnabled, props.starsEnabled]);

  return (
    <div id="name" className={animClass}>
      <h3>{floatingNameText.name}</h3>
      <p>{floatingNameText.titles.join(", ")}</p>
    </div>
  );
}
