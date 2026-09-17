import ReactMarkdown from "react-markdown";
import "./Twin.css"
import picofme from "../assets/picofme.PNG";
import { User } from "lucide-react";

export default function TwinMessage({role, timestamp, body}) {
  if (role === "user") {
    return (
      <div className="msg msg--user">
        <div className="msg-body">
          <div className="metadata">
             <span className="timestamp">{timestamp}</span><span style={{marginLeft: "1rem"}}className="role-name">You</span>
          </div>
          <div className="msg-bubble">
            <p>{body}</p>
          </div>
        </div>
        <div className="role-icon">
          <User />
        </div>
      </div>
    )
  }
  if (role === "twin") {
    return (
      <div className="msg msg--twin">
        <div className="role-icon">
          <img src={picofme}/>
        </div>
        <div className="msg-body">
          <div className="metadata">
            <span className="role-name">Twin</span>   <span className="timestamp">{timestamp}</span>
          </div>
          <div className="msg-bubble">
            <ReactMarkdown>
              {body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }

}