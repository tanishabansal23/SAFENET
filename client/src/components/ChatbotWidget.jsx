import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotWidget.css";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessage = { sender: "user", text: userMessage };
    
    // Clear input immediately
    setInput("");
    
    // Add user message
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/api/chatbot", {
        message: userMessage,
      });
      
      console.log("Chatbot response:", res.data);
      
      if (res.data.success && res.data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: res.data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ No response received from AI." },
        ]);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Error getting response. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className={`chatbot-float-btn ${isOpen ? "active" : ""}`}
        onClick={toggleChatbot}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* Chatbot Side Panel */}
      <div className={`chatbot-panel ${isOpen ? "open" : ""}`}>
        <div className="chatbot-panel-header">
          <h3>AI Assistant</h3>
          <button className="close-panel-btn" onClick={toggleChatbot}>
            ✕
          </button>
        </div>

        <div className="chatbot-panel-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <p>👋 Hello! I'm your cybersecurity AI assistant.</p>
              <p>Ask me anything about security, threats, or best practices!</p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`panel-message-bubble ${
                    msg.sender === "user" ? "user-bubble" : "bot-bubble"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                </div>
              ))}
              {isLoading && (
                <div className="panel-message-bubble bot-bubble loading-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="chatbot-panel-input">
          <input
            type="text"
            placeholder="Ask about cybersecurity..."
            className="panel-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="panel-send-btn"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </div>

      {/* Overlay when panel is open */}
      {isOpen && <div className="chatbot-overlay" onClick={toggleChatbot}></div>}
    </>
  );
}

export default ChatbotWidget;
