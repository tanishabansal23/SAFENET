import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // important

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    try {
      const res = await axios.post("http://localhost:3001/api/chatbot", {
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
    <div className="chatbot-page min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        Cybersecurity AI Assistant
      </h1>

      <div className="chatbot-container w-full max-w-2xl bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col h-[70vh]">
        <div className="chatbot-messages flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-cyan-600 self-end text-right ml-auto user-bubble"
                  : "bg-gray-700 text-left bot-bubble"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
        </div>

        <div className="chatbot-input flex">
          <input
            type="text"
            placeholder="Ask about cybersecurity..."
            className="flex-1 p-3 rounded-l-lg bg-gray-700 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-cyan-500 px-6 rounded-r-lg hover:bg-cyan-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
