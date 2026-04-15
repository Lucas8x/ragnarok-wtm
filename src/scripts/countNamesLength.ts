import monsters from '$src/data/monsters.json';

const names = monsters.map((monster) => monster.name);

const lengthsCount: Record<number | string, number> = {};

for (const name of names) {
  const length = name.length;

  if (lengthsCount[length]) {
    lengthsCount[length]++;
  } else {
    lengthsCount[length] = 1;
  }

  if (name.includes('-')) {
    lengthsCount.hyphen = (lengthsCount.hyphen || 0) + 1;

    if (name.split('-').length > 2) {
      lengthsCount.doubleHyphens = (lengthsCount.doubleHyphens || 0) + 1;
    }
  }
}

console.table(
  Object.entries(lengthsCount).map(([length, count]) => ({
    length,
    count,
  }))
);
