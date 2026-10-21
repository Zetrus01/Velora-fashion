import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.post("/api/ai-stylist", async (req, res) => {
    try {
      const { prompt, occasion, preferences } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `You are Lunora's expert fashion concierge and stylist. The user is asking for styling advice or outfit recommendations based on:
Occasion: ${occasion || "General"}
User prompt/preferences: ${prompt || preferences || "Elegant minimalist everyday look"}

Provide a sophisticated, concise styling advice response (under 120 words) detailing which pieces from our luxury collection or high-end minimalist styling tips would suit them best. Tone should be luxurious, warm, and expert.`,
      });
      res.json({ advice: response.text || "Elevate your wardrobe with effortless tailoring and neutral monochrome layering." });
    } catch (err: any) {
      console.error("AI Stylist error:", err);
      res.json({ advice: "Pair a structured linen blazer with our fluid wide-leg trousers for an understated yet impeccably polished silhouette." });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
