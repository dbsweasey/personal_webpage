import Navbutton from "./Navbutton";
import ContactBtn from "./ContactBtn";
import OptionToggleBtn from "./OptionToggleBtn";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MotionPhotosOffIcon from "@mui/icons-material/MotionPhotosOff";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  // Once shown, stays shown - re-toggling the intro should never hide it again.
  // Lazily initialized so a disabled-on-load render never paints the
  // collapsed state at all (avoiding the #top transform transition).
  const [navbarShow, setNavbarShow] = useState(() => !props.introEnabled);
  // The entrance glow only ever plays once, on the real timed reveal.
  const [playGlow, setPlayGlow] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    // Intro disabled: reveal instantly, no glow, no delay.
    if (!props.introEnabled) {
      setNavbarShow(true);
      return;
    }

    // Already shown (whether from a prior instant reveal or the timer) -
    // nothing left to schedule.
    if (navbarShow) return;

    let navbarTimeout;
    const start = () => {
      navbarTimeout = setTimeout(() => {
        setNavbarShow(true);
        setPlayGlow(true);
      }, 3500);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start);
    }

    return () => {
      window.removeEventListener("load", start);
      clearTimeout(navbarTimeout);
    };
  }, [props.introEnabled, navbarShow]);

  const navClass = [navbarShow ? "show" : "", playGlow ? "animation" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div id="top" className={navClass}>
      <div className="nav-container">
        <Navbutton
          click={() => {
            props.onPageChange(
              currentPage === "Projects" ? "Home" : "Projects"
            );
            setCurrentPage(currentPage === "Projects" ? "Home" : "Projects");
          }}
          name={currentPage === "Projects" ? "Home" : "Projects"}
        ></Navbutton>
        <Navbutton
          click={() => {
            props.onPageChange(currentPage === "About" ? "Home" : "About");
            setCurrentPage(currentPage === "About" ? "Home" : "About");
          }}
          name={currentPage === "About" ? "Home" : "About"}
        ></Navbutton>
        <Navbutton
          click={() => {
            props.onPageChange(currentPage === "Twin" ? "Home" : "Twin");
            setCurrentPage(currentPage === "Twin" ? "Home" : "Twin")
          }}
          name={currentPage === "Twin" ? "Home" : "Twin"}
        ></Navbutton>
      </div>

      <div className="contact-container">
        <ContactBtn name="linkedin" />
        <ContactBtn name="github" />
        <ContactBtn name="email" />
      </div>

      <div className="options-group">
        <OptionToggleBtn
          enabled={props.starsEnabled}
          onClick={props.onToggleStars}
          onIcon={StarIcon}
          offIcon={StarBorderIcon}
          label={
            props.starsEnabled
              ? "Disable background stars"
              : "Enable background stars"
          }
        />
        <OptionToggleBtn
          enabled={props.introEnabled}
          onClick={props.onToggleIntro}
          onIcon={AutoAwesomeIcon}
          offIcon={MotionPhotosOffIcon}
          label={
            props.introEnabled
              ? "Disable intro animation"
              : "Enable intro animation"
          }
        />
      </div>
    </div>
  );
}
