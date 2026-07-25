import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing Gemini API Key");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const BATCH_SIZE = 50;
const TOTAL_NEEDED = 300;
const BATCHES = Math.ceil(TOTAL_NEEDED / BATCH_SIZE);

async function generateBatch(batchNum) {
  const prompt = `
    Generate a JSON array of exactly ${BATCH_SIZE} unique "Vibe ID" objects.
    
    TONE: Sparkling, innovative, crazy, interesting, funny, and witty.
    RESTRICTION: Do NOT be overly direct or hurtful. Keep the roasts lighthearted, relatable, and fun. No mean-spirited or deeply offensive content. 

    Each object MUST have this exact structure:
    {
      "archetype": "A creative, slightly roasting but fun title (e.g., 'Chronically Online Overthinker', 'Matcha Fueled Perfectionist')",
      "stats": {
        "chaos": number (1-100),
        "intuition": number (1-100),
        "energy": number (1-100),
        "sarcasm": number (1-100)
      },
      "roast": "A witty, 2-sentence roast/compliment hybrid",
      "secretPower": "A funny, highly specific hyper-skill (1 short sentence)",
      "redFlag": "A funny, highly specific harmless bad habit (1 short sentence)"
    }
    
    Output strictly as a JSON array (no markdown code blocks, just raw JSON).
  `;

  console.log(`Generating batch ${batchNum}/${BATCHES}...`);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response.text) {
      throw new Error("Empty response");
    }

    const data = JSON.parse(response.text);
    if (!Array.isArray(data)) {
      throw new Error("Response was not an array");
    }
    return data;
  } catch (error) {
    console.error(`Error in batch ${batchNum}:`, error);
    return [];
  }
}

async function main() {
  let allVibes = [];
  
  for (let i = 1; i <= BATCHES; i++) {
    const batch = await generateBatch(i);
    allVibes = allVibes.concat(batch);
    
    // Slight delay to avoid rate limits
    if (i < BATCHES) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`Generated ${allVibes.length} vibes successfully.`);

  // Ensure directory exists
  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'vibes.json');
  fs.writeFileSync(outputPath, JSON.stringify(allVibes, null, 2));
  console.log(`Saved to ${outputPath}`);
}

main();
