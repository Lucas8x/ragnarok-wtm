import monsters from '../data/monsters.json';

function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);

  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function mulberry32(seed: number) {
  return () => {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function daysSinceEpoch(date = new Date()) {
  const epoch = new Date('2026-01-25');
  const diff = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(epoch.getFullYear(), epoch.getMonth(), epoch.getDate())) /
      (24 * 60 * 60 * 1000),
  );
  return diff;
}

function getDailyWord(date = new Date()) {
  const d = daysSinceEpoch(date);
  const seed = cyrb53(String(d));
  const rnd = mulberry32(seed);

  const idx = Math.floor(rnd() * monsters.length);
  return monsters[idx];
}

[
  new Date('2026-01-25'),
  new Date('2026-01-26'),
  new Date('2026-01-27'),
].forEach((d) => {
  console.log(getDailyWord(d));
});
