import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Twin from "./components/Twin";
import Stars from "./components/Stars";
import Intro from "./components/Intro";
import Footer from "./components/Footer";

const STARS_ENABLED_KEY = "starsEnabled";
const INTRO_ENABLED_KEY = "introEnabled";

function readStoredFlag(key) {
  try {
    return localStorage.getItem(key) !== "false";
  } catch {
    return true;
  }
}

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [intro, setIntro] = useState(false);
  const [starsEnabled, setStarsEnabled] = useState(() =>
    readStoredFlag(STARS_ENABLED_KEY)
  );
  const [introEnabled, setIntroEnabled] = useState(() =>
    readStoredFlag(INTRO_ENABLED_KEY)
  );

  useEffect(() => {
    // Disabling the intro means there's nothing left to play - mark the
    // sequence as permanently finished so re-enabling later never replays it.
    if (!introEnabled) {
      setIntro(true);
      return;
    }

    if (intro) return;

    const introTimeout = setTimeout(() => setIntro(true), 5000);
    return () => {
      clearTimeout(introTimeout);
    };
  }, [introEnabled, intro]);

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const toggleStoredFlag = (setter, key) => {
    setter((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(key, String(next));
      } catch {
        // localStorage unavailable (private browsing, etc.) - toggle still works for this session
      }
      return next;
    });
  };

  const handleToggleStars = () => toggleStoredFlag(setStarsEnabled, STARS_ENABLED_KEY);
  const handleToggleIntro = () => toggleStoredFlag(setIntroEnabled, INTRO_ENABLED_KEY);

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return (
          <Home intro={intro} introEnabled={introEnabled} starsEnabled={starsEnabled} />
        );
      case "About":
        return <About />;
      case "Projects":
        return <Projects />;
      case "Twin":
        return <Twin />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {introEnabled && !intro && <Intro />}
      <div id="main">
        {starsEnabled && <Stars />}
        <Navbar
          onPageChange={handlePageChange}
          activePage={activePage}
          starsEnabled={starsEnabled}
          introEnabled={introEnabled}
          onToggleStars={handleToggleStars}
          onToggleIntro={handleToggleIntro}
        />
        {renderPage()}
        {activePage !== "Home" && <Footer />}
      </div>
    </div>
  );
}

export default App;
