import { useRef, useEffect, useState } from "react";
import "./Marquee.css";

export default function Marquee(props) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.scrollWidth;

    setShouldScroll(textWidth > containerWidth);
  }, [props.text]);

  return (
    <div className="marquee-container" ref={containerRef}>
      <div className={`marquee-content ${shouldScroll ? "scroll" : ""}`}>
        <h2 ref={textRef}>{props.text}</h2>

        {shouldScroll && <h2 className="duplicate">{props.text}</h2>}
      </div>
    </div>
  );
}
