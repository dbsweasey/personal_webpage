import picofme from "../assets/picofme.PNG";
import "./Twin.css";

export default function TypingIndicator() {
  return (
    <div className="msg msg--twin">
      <div className="role-icon">
        <img src={picofme}/>
      </div>
      <div className="msg-body">
        <div className="metadata">
          <span className="role-name">Twin</span>
        </div>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}