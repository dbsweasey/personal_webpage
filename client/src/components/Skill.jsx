export default function Skill(props) {
  return (
    <div className="skill">
      <div className="skill-badge"></div>
      <p>{props.skill}</p>
    </div>
  );
}
