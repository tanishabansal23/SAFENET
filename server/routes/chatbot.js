const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Message is required" });
  }

  try {
    // 🧠 Send request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a professional cybersecurity assistant.

Rules:
1️⃣ Detect user expertise automatically:
   - If the question is basic (like "What is phishing?"), use beginner-friendly tone.
   - If it’s technical (like "Explain SQL injection mitigation"), use detailed and advanced language.

2️⃣ Always reply in pure HTML format using this structure:
<h2>🔒 Summary</h2>
<p>Short 2–3 line overview of the concept.</p>

<h3>🧠 Details</h3>
<ul>
  <li>Key point 1</li>
  <li>Key point 2</li>
  <li>Technical or practical aspect</li>
</ul>

<h3>💡 Tip</h3>
<p>Short, practical security tip.</p>

❌ Do NOT include markdown or "**bold**" syntax.
❌ Do NOT repeat instructions.
Question: ${message}
                `,
              },
            ],
          },
        ],
      }
    );

    let aiResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    // ✅ Clean & format AI response
    aiResponse = formatAIResponse(aiResponse);

    res.json({ success: true, reply: aiResponse });
  } catch (error) {
    console.error(
      "Error communicating with Gemini API:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ success: false, message: "Error fetching response from AI" });
  }
});

// util.js (or inside your router file)
function stripCodeFences(text) {
  if (!text || typeof text !== "string") return text || "";
  // Remove starting ``` or ```html (with optional spaces/newlines) and ending ```
  return text
    .replace(/^\s*```(?:html)?\s*/i, "") // remove leading ``` or ```html
    .replace(/\s*```\s*$/i, "") // remove trailing ```
    .trim();
}

// 🧹 Helper function to sanitize & style the response
function formatAIResponse(text) {
  text = stripCodeFences(text);
  if (!text) return "<p>No response from AI.</p>";

  let formatted = text
    // Convert section headers to proper HTML
    .replace(/🔒\s*Summary/gi, "<h2>🔒 Summary</h2>")
    .replace(/🧠\s*Details/gi, "<h3>🧠 Details</h3>")
    .replace(/💡\s*Tip/gi, "<h3>💡 Tip</h3>")

    // Convert common bullet-like lines into <li>
    .replace(/(?:^|\n)[-–•]\s*(.*)/g, "<li>$1</li>")

    // Convert double newlines into paragraph breaks
    .replace(/\n{2,}/g, "</p><p>");

  // Wrap loose <li> elements inside <ul>
  formatted = formatted.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");

  // Wrap entire message
  return `
    <div style="
      font-family: 'Segoe UI', sans-serif;
      line-height: 1.6;
      font-size: 15px;
      color: #e0f2fe;
    ">
      <p>${formatted}</p>
    </div>
  `;
}

module.exports = router;
