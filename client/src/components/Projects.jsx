import { useEffect, useState } from "react";
import ProjectDescription from "./ProjectDescription";
import ProjectCard from "./ProjectCard";
import projects from "../assets/projects.json";
import PageHeader from "./PageHeader";

export default function Projects() {
  const [currProject, setCurrProject] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onHover = (id) => {
    setCurrProject(projects[id]);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const computer = (
    <div>
      <PageHeader title="Projects" />
      <div className="projects-container">
        <ProjectDescription currentProject={currProject} />
        <div className="project-list-container">
          {projects.map((project, i) => {
            return (
              <ProjectCard
                onHover={onHover}
                key={i}
                id={i}
                name={project.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  const mobile = (
    <div>
      <PageHeader title="Projects" />
      <div className="projects-container">
        <div className="project-list-container">
          {projects.map((project, i) => {
            return currProject === project ? (
              <ProjectDescription currentProject={currProject} />
            ) : (
              <ProjectCard
                onHover={onHover}
                key={i}
                id={i}
                name={project.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return size.width > 800 ? computer : mobile;
}
