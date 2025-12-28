import picofme from "../assets/picofme.PNG";
import PageHeader from "./PageHeader";
import Spotify from "./Spotify";
import Skills from "./Skills.jsx";
import bio from "../assets/bio.js";
import resume from "/David_Sweasey_Resume.pdf";

export default function About() {
  return (
    <div>
      <PageHeader title="About" />
      <div className="body-container">
        <div className="content-container">
          <div className="img-container">
            <img src={picofme} />
          </div>
          <Skills />
          <div className="spotify-container">
            <Spotify />
          </div>
        </div>
        <div className="text-container">
          {bio.map((item, index) => (
            <div>
              <p key={index}>{item.paragraph}</p>
              {index + 1 < bio.length && <br></br>}
            </div>
          ))}
          <br></br>
          <a href={resume} target="_blank" className="resume-link">
            {">"} Click here for my Resume
          </a>
          <div className="resume-link-underline"></div>
        </div>
      </div>
    </div>
  );
}
