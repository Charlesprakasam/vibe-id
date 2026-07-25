import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Support VITE_GEMINI_API_KEY (from local .env) or GEMINI_API_KEY (from Vercel dashboard)
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    return res.status(500).json({ error: 'Missing API Key on server' });
  }

  try {
    // Vercel automatically parses JSON bodies
    const { handle, speed, energy, fuel } = req.body;

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Act as an edgy, slightly unhinged internet psychic.
      Generate a "Vibe ID" for a user based on these inputs:
      - Name/Handle: ${handle}
      - Vibe Speed: ${speed}
      - Energy Level: ${energy}
      - Fuel: ${fuel}

      Output MUST be valid JSON matching this exact structure, with no markdown formatting around it:
      {
        "archetype": "A creative, slightly roasting title (e.g., 'Chronically Online Overthinker')",
        "stats": {
          "chaos": number (1-100),
          "intuition": number (1-100),
          "energy": number (1-100),
          "sarcasm": number (1-100)
        },
        "roast": "A witty, 2-sentence roast/compliment hybrid based on their inputs",
        "secretPower": "A funny, highly specific hyper-skill (1 short sentence)",
        "redFlag": "A funny, highly specific bad habit (1 short sentence)"
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    if (!response.text) {
        throw new Error("Empty response from AI");
    }
    
    const parsed = JSON.parse(response.text);
    return res.status(200).json(parsed);

  } catch (error: any) {
    console.error("AI Generation failed:", error);
    return res.status(500).json({ error: error.message });
  }
}
