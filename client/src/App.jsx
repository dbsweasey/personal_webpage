import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Stars from "./components/Stars";
import Intro from "./components/Intro";
import Footer from "./components/Footer";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const introTimeout = setTimeout(() => setIntro(true), 5000);
    return () => {
      clearTimeout(introTimeout);
    };
  }, []);

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home intro={intro} />;
      case "About":
        return <About />;
      case "Projects":
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {!intro && <Intro />}
      <div id="main">
        <Stars />
        <Navbar onPageChange={handlePageChange} activePage={activePage} />
        {renderPage()}
        {activePage !== "Home" && <Footer />}
      </div>
    </div>
  );
}

export default App;
