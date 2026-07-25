import { GoogleGenAI } from '@google/genai';

export async function onRequestPost(context: any) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Use the Cloudflare environment variable
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    return new Response(JSON.stringify({ error: 'Missing API Key on server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { handle, speed, energy, fuel } = body;

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
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("AI Generation failed:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
