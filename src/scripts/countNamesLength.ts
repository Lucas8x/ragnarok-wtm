import { monsterWithIgnoreFilter } from '$src/utils';

const names = monsterWithIgnoreFilter.map((monster) => monster.name);

const lengthsCount: Record<number | string, number> = {};

for (const name of names) {
  const { length } = name;

  if (lengthsCount[length]) {
    lengthsCount[length] += 1;
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
