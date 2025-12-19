export default function ProjectDescription(props) {
  const defaultImage = "/favicon.png";
  let project = props.currentProject;
  if (!project) {
    project = {
      name: "Select a project to see its description",
      img: defaultImage,
      desc: "",
    };
  }
  return (
    <div className="description-container">
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
  );
}
