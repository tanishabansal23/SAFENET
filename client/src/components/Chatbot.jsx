import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./Chatbot.css";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    try {
      const res = await axios.post("/api/chatbot", {
        message: input,
      });
      const aiReply = res.data.reply;
      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error getting response. Try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <Layout>
      <div className="chatbot-page">
        <h1 className="chatbot-title">Cybersecurity AI Assistant</h1>

        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message-bubble ${
                  msg.sender === "user" ? "user-bubble" : "bot-bubble"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about cybersecurity..."
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="chat-send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chatbot;
