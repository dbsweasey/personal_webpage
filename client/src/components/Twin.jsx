import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { SendHorizontal } from "lucide-react";

import PageHeader from "./PageHeader";
import TwinMessage from "./TwinMessage";
import "./Twin.css"
import TypingIndicator from "./TypingIndicator";

export default function Twin() {
  const URL = import.meta.env.VITE_AGENT_URL || "";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [agentTyping, setAgentTyping] = useState(false);

  const textareaRef = useRef(null);
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  const connect = async () => {
    try {
      const response = await fetch(`${URL}/`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Could not connect to agent service. Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.history) {
        setMessages(data.history.map(msg => ({
          role: msg.role,
          body: msg.content,
          timestamp: getCurrentFormattedTime(msg.timestamp)
        })));
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }
    scroll("instant");
  }

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [message])

  const handleKeyDown = (e) => {
    if (agentTyping) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleComposerClick = (e) => {
    if (agentTyping) return;
    if (e.target.closest("button")) return;

    textareaRef.current?.focus();
  }

  const scroll = (method = "smooth") => {
    bottomRef.current?.scrollIntoView({
      behavior: method
    });
  }

  useEffect(() => {
    const chat = chatRef.current;

    if (!chat) return;

    /* Hassle for longer messages, may remove */

    // const distFromBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight;
    // if (distFromBottom < 800) {
    //   scroll();
    // }
    
    scroll();
  }, [messages]);

  const getCurrentFormattedTime = (utcTime = null) => {
    const now = utcTime ? new Date(utcTime) : new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return formatter.format(now);
  }

  const handleSubmit = async () => {
    if (agentTyping) return;
    if (!message.trim()) {
      setMessage("");
      return;
    }
    
    // Need to get current time
    setMessages(prev => [
      ...prev,
      {
        "role": "user",
        "body": message,
        "timestamp": getCurrentFormattedTime()
      }
    ]);
    setAgentTyping(true);
    setMessage("");

    requestAnimationFrame(() => {
      scroll();
    })

    try {
      const response = await fetch(`${URL}/chat`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({message: message})
      });

      if (!response.ok) {
        setAgentTyping(false);
        setMessages(prev => [
          ...prev,
          {
            "role": "twin",
            "body": "Sorry, I could not connect to the agent service. Please try again later.",
            "timestamp": getCurrentFormattedTime()
          }
        ]);
        throw new Error(`Could not connect to agent service. Status: ${response.status}`);
      }
      const data = await response.json();
      setAgentTyping(false);
      setMessages(prev => [
        ...prev,
        {
          "role": "twin",
          "body": data.message,
          "timestamp": getCurrentFormattedTime()
        }
      ]);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  }

  useEffect(() => {
    connect();
  }, [])

  return (
    <div className="twin-page">
      <PageHeader title="Digital Twin" />
      <div className="container">
        <div ref={chatRef} className="convo-container">
          <div className="convo-inner">
            {/* Chat messages will populate here */}
            {messages.map((m, i) => {
              return <TwinMessage key={i} role={m.role} body={m.body} timestamp={m.timestamp} />
            })}
            {agentTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        </div>
        <div className="composer-container">
          <div className={`composer ${agentTyping ? "is-disabled": ""}`} onClick={agentTyping ? undefined: handleComposerClick}>
            <textarea 
              id="composer-input" 
              placeholder={agentTyping ? "Agent is typing..." : "Message..."}
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={agentTyping}
              readOnly={agentTyping}
              aria-disabled={agentTyping}
            />
            <button className="btn-send" onClick={handleSubmit} disabled={agentTyping} aria-disabled={agentTyping}>
              <SendHorizontal />
            </button>
          </div>
          <div className="composer-text">
            <span className="key">ENTER</span> to send | <span className="key">SHIFT</span> + <span className="key">ENTER</span> for newline
          </div>
        </div>
      </div>
    </div>
  )
}