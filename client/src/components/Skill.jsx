export default function Skill(props) {
  const skillStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.227)",
    borderRadius: "50px",
    maxHeight: "30px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };
  const purpleCircle = {
    background: "linear-gradient(135deg, #e74545, #772c71, #331972, #1c83a0)",
    borderRadius: "50%",
    flex: "1",
    height: "20px",
    width: "20px",
  };

  return (
    <div style={skillStyle}>
      <div style={purpleCircle}></div>
      <p>{props.skill}</p>
    </div>
  );
}
