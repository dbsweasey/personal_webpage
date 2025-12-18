export default function ProjectCard(props) {
  return (
    <div
      onMouseEnter={() => {
        props.onHover(props.id);
      }}
      className="project-container"
    >
      <p data-key="project1">{props.name}</p>
    </div>
  );
}
