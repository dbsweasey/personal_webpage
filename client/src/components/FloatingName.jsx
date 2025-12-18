import { useState, useEffect, useRef } from "react";
import floatingNameText from "../assets/floatingNameText.json";

export default function FloatingName(props) {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (props.intro) {
      setShowName(true);
      return;
    }

    const nameTimeout = setTimeout(() => setShowName(true), 4000);

    return () => clearTimeout(nameTimeout);
  }, []);

  return (
    <div id="name" className={showName ? "name-anim" : ""}>
      <h3>{floatingNameText.name}</h3>
      <p>{floatingNameText.titles.join(", ")}</p>
    </div>
  );
}
