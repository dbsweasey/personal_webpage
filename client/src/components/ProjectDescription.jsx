import { X } from "lucide-react";

export default function ProjectDescription(props) {
  const defaultImage = "/favicon.png";
  let project = props.currentProject;
  if (!project) {
    project = {
      name: "Select a project to see its description",
      img: defaultImage,
      desc: "",
      actions: []
    };
  }
  console.log(project.actions)
  return (
    <div className="description-container">
      {props.onClose && (
        <button className="description-close" onClick={props.onClose} aria-label="Close project">
          <X size={18} />
        </button>
      )}
      <div>
        <h2 style={{ marginTop: "10px", marginLeft: "50px", float: "left" }}>
          {project.name}
        </h2>
        <img
          className="project-img"
          src={project.img || defaultImage}
          alt={project.name}
        />
        <p style={{ clear: "left" }}>{project.desc}</p>
      </div>
      <div className="project-actions-container">
        {project.actions.map((a) => {
          // "page" actions switch to a page within the site; "url" actions open an external link
          if (a.page) {
            return (
              <button key={a.action} onClick={() => props.onPageChange(a.page)} className="project-action">{a.action}</button>
            )
          }
          return (
            <a key={a.action} href={a.url} target="_blank" className="project-action">{a.action}</a>
          )
        })}
      </div>
    </div>
  );
}
