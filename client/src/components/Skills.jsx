import skills from "../assets/skills.json";
import Skill from "./Skill";

export default function Skills() {
  return (
    <div className="skills-container">
      {skills.map((skill, index) => {
        return <Skill skill={skill} key={index} />;
      })}
    </div>
  );
}
