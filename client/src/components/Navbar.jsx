import Navbutton from "./Navbutton";
import ContactBtn from "./ContactBtn";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const [navbarShow, setNavbarShow] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    const start = () => {
      const navbarTimeout = setTimeout(() => setNavbarShow(true), 3500);

      return () => {
        clearTimeout(navbarTimeout);
      };
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start);
    }

    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <div id="top" className={navbarShow ? "show animation" : ""}>
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
      </div>

      <div className="contact-container">
        <ContactBtn name="linkedin" />
        <ContactBtn name="github" />
        <ContactBtn name="email" />
      </div>
    </div>
  );
}
