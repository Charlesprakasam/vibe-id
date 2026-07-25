export interface VibeData {
  archetype: string;
  stats: {
    chaos: number;
    intuition: number;
    energy: number;
    sarcasm: number;
  };
  roast: string;
  secretPower: string;
  redFlag: string;
}

const FALLBACK_VIBES: VibeData[] = [
  {
    archetype: "Chronically Online Overthinker",
    stats: { chaos: 85, intuition: 90, energy: 30, sarcasm: 95 },
    roast: "You probably know the latest TikTok drama better than you know your own relatives. Take a breath and touch some grass.",
    secretPower: "Can find anyone's digital footprint in 3 minutes.",
    redFlag: "Communicates entirely in hyper-specific memes."
  },
  {
    archetype: "Chaotic Good Goblin",
    stats: { chaos: 99, intuition: 60, energy: 85, sarcasm: 70 },
    roast: "You run on pure adrenaline and bad decisions, but somehow it usually works out. Mostly.",
    secretPower: "Creating wildly successful accidents.",
    redFlag: "Has 47 open tabs and no intention of closing them."
  },
  {
    archetype: "Matcha Fueled Perfectionist",
    stats: { chaos: 20, intuition: 85, energy: 75, sarcasm: 60 },
    roast: "Your aesthetic is pristine, but we both know your closet is a disaster zone. It's okay to make a typo sometimes.",
    secretPower: "Color-coding their entire existence.",
    redFlag: "Will judge your font choices."
  },
  {
    archetype: "Mysterious Night Owl",
    stats: { chaos: 60, intuition: 95, energy: 40, sarcasm: 80 },
    roast: "You only thrive between the hours of 2 AM and 5 AM. Daylight is just a suggestion.",
    secretPower: "Knowing things they shouldn't know.",
    redFlag: "Takes 3-5 business days to reply to a text."
  },
  {
    archetype: "Caffeinated Tornado",
    stats: { chaos: 90, intuition: 40, energy: 100, sarcasm: 50 },
    roast: "You've replaced water with pure caffeine. Please slow down, the rest of us can't keep up.",
    secretPower: "Completing a week's worth of work in 2 hours.",
    redFlag: "Bounces legs constantly under the table."
  }
];

export async function generateVibeID(handle: string, speed: string, energy: string, fuel: string): Promise<VibeData> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ handle, speed, energy, fuel })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data as VibeData;
    } else {
      console.warn("Backend failed or not configured, using fallback data.");
    }
  } catch (error) {
    console.error("AI Generation network request failed:", error);
  }

  // Fallback behavior if backend fails (e.g. running locally without Vercel CLI)
  await new Promise(resolve => setTimeout(resolve, 2000));
  return FALLBACK_VIBES[Math.floor(Math.random() * FALLBACK_VIBES.length)];
}

