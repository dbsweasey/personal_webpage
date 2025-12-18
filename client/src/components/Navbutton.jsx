export default function Navbutton(props) {
  return (
    <button
      onClick={() => {
        props.click(props.name);
      }}
      className="elevated-button"
    >
      {props.name}
    </button>
  );
}
