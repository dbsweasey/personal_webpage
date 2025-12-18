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
        style={{
          float: "right",
          width: "200px",
          height: "200px",
          margin: "10px",
          borderRadius: "50%",
        }}
        src={project.img || defaultImage}
        alt={project.name}
      />
      <div style={{ clear: "left" }}>{project.desc}</div>
    </div>
  );
}
