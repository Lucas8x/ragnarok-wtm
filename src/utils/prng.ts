/** biome-ignore-all lint/suspicious/noBitwiseOperators: <valid use> */
import { dayjs } from '$src/utils/dayjs';
import monsters from '../data/monsters.json';

function cyrb53(str: string, seed = 0) {
  let h1 = 0xde_ad_be_ef ^ seed;
  let h2 = 0x41_c6_ce_57 ^ seed;

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2_654_435_761);
    h2 = Math.imul(h2 ^ ch, 1_597_334_677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2_246_822_507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3_266_489_909);

  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2_246_822_507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3_266_489_909);

  return 4_294_967_296 * (2_097_151 & h2) + (h1 >>> 0);
}

function mulberry32(seed: number) {
  return () => {
    let t = seed + 0x6d_2b_79_f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function daysSinceEpoch(date = dayjs.utc()) {
  const epoch = dayjs.utc('2026-01-25');

  /* const diff = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(epoch.getFullYear(), epoch.getMonth(), epoch.getDate())) /
      (24 * 60 * 60 * 1000),
  );
  return diff;*/

  return date.startOf('day').diff(epoch.startOf('day'), 'day');
}

export function getDailyMonsterID(date = dayjs.utc()) {
  const d = daysSinceEpoch(date);
  const seed = cyrb53(String(d));
  const rnd = mulberry32(seed);

  const idx = Math.floor(rnd() * monsters.length);
  return monsters[idx].id;
}

/* [...Array(20)].forEach((i, index) => {
  console.log(getDailyMonsterID(dayjs.utc().subtract(index, 'day')));
}); */
