import { ARCHETYPES, ROASTS, SECRET_POWERS, RED_FLAGS } from './vibesDB';

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

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export async function generateVibeID(_handle: string, speed: string, energy: string, _fuel: string): Promise<VibeData> {
  // Simulate network delay to keep the suspense of the loading screen
  await new Promise(resolve => setTimeout(resolve, 2800));

  // Base stats influenced by their dropdown choices
  let chaos = getRandomInt(40, 60);
  let energyStat = getRandomInt(40, 60);
  let intuition = getRandomInt(40, 80);
  let sarcasm = getRandomInt(50, 90);

  // Adjust based on speed
  if (speed.toLowerCase().includes('unhinged') || speed.toLowerCase().includes('fast')) {
    chaos += getRandomInt(20, 40);
  } else if (speed.toLowerCase().includes('slow') || speed.toLowerCase().includes('chill')) {
    chaos -= getRandomInt(20, 30);
  }

  // Adjust based on energy
  if (energy.toLowerCase().includes('high') || energy.toLowerCase().includes('crack')) {
    energyStat += getRandomInt(30, 40);
  } else if (energy.toLowerCase().includes('low') || energy.toLowerCase().includes('sleep')) {
    energyStat -= getRandomInt(20, 30);
  }

  // Ensure stats stay within 1-100 bounds
  const clamp = (val: number) => Math.max(1, Math.min(100, val));

  return {
    archetype: getRandomItem(ARCHETYPES),
    stats: {
      chaos: clamp(chaos),
      intuition: clamp(intuition),
      energy: clamp(energyStat),
      sarcasm: clamp(sarcasm)
    },
    roast: getRandomItem(ROASTS),
    secretPower: getRandomItem(SECRET_POWERS),
    redFlag: getRandomItem(RED_FLAGS)
  };
}
