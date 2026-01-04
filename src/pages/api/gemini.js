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
- Give small replies focused on developer needs.

Here is the list of available tools on CodeAtoms:
Convoy
A cloud-native, open-source webhooks gateway designed to securely ingest, manage, and reliably deliver millions of webhook events with features like retries, rate limiting, and static IPs.
LlamaPReview
An evidence-based, context-aware AI code reviewer that performs fully automated pull request reviews with low noise, severity gating, and zero configuration.
AI Media Studio
A CLI tool that generates videos, images, and music using Google's AI models through simple text prompts.
Software Architect
A developer tool that instantly converts any codebase into an interactive architectural diagram for easier understanding and analysis.
Pythagora
An AI-powered tool that generates automated unit tests for Node.js applications using large language models.
Kint
An advanced PHP debugging and data-dumping tool that provides searchable, structured, and interactive output beyond traditional var_dump.
Devscribe
An all-in-one developer workspace for writing documentation, designing diagrams, running code, testing APIs, and viewing databases.
kubefwd
A command-line utility that bulk-forwards Kubernetes services to a local machine for easier local development.
Tach
A Python tool that visualizes and enforces modular architecture by controlling dependencies and preventing cyclic imports.
PocketMocker
A browser-native visual API mocking tool that lets frontend developers intercept, edit, and mock network requests directly inside the browser.
Brewfile
A tool for bootstrapping a complete macOS development environment using a single Homebrew command.
Murex
A modern, expressive shell designed to be more readable, intuitive, and powerful than traditional UNIX shells.
Xeet
A command-line tool that allows users to post directly to X (formerly Twitter) from the terminal.
Atom
A hackable and highly customizable text editor built on Electron, now officially sunset and deprecated.
MiniSim
A macOS menu bar application for quickly launching and managing iOS and Android emulators without opening full IDEs.
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
