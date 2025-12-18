import { useEffect, useState } from "react";
import ProjectDescription from "./ProjectDescription";
import ProjectCard from "./ProjectCard";
import projects from "../assets/projects.json";
import PageHeader from "./PageHeader";

export default function Projects() {
  const [project, setProject] = useState(null);

  const onHover = (id) => {
    setProject(projects[id]);
  };

  return (
    <div>
      <PageHeader title="Projects" />
      <div className="projects-container">
        <ProjectDescription currentProject={project} />
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
}
