import monsters from '../data/monsters.json';

export function groupSimilarMonster() {
  const equivalentIds = monsters.reduce(
    (acc, mob) => {
      const name = mob.name as string;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(mob.id);
      return acc;
    },
    {} as Record<string, number[]>,
  );

  return equivalentIds;
}
