import { GoogleGenAI } from "@google/genai";

// 🧠 Knowledge / Context
const knowledge = `
You are View AI, an assistant for CodeAtoms, a developer tools marketplace.

Your job:
- Help users discover the right developer tools
- Suggest tools based on use-case, stack, and preferences
- Be concise, practical, and developer-focused

Rules:
- Do not hallucinate tools that do not exist.
`;

// 🔑 Multiple Gemini API keys (fallback order)
const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
  process.env.GEMINI_API_KEY4,
].filter(Boolean);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ reply: "Messages are required." });
    }

    // ✅ Inject knowledge first
    const contents = [
      {
        role: "model",
        parts: [{ text: knowledge }],
      },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    let lastError = null;

    // 🔁 Try each API key until success
    for (const key of GEMINI_KEYS) {
      try {
        const ai = new GoogleGenAI({ apiKey: key });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
        });

        if (response?.text) {
          return res.status(200).json({
            reply: response.text,
          });
        }
      } catch (err) {
        lastError = err;
        console.error("Gemini key failed, trying next...");
        continue;
      }
    }

    // ❌ All APIs failed
    console.error("All Gemini APIs failed:", lastError);
    return res.status(500).json({
      reply: "AI is currently overloaded. Please try again shortly.",
    });

  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      reply: "AI failed to respond.",
    });
  }
}
