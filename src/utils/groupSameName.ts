import monsters from '../data/monsters.json';

export function groupSameName() {
  const equivalentIds = monsters.reduce(
    (acc, mob) => {
      const name = mob.name as string;

      if (!acc[name]) {
        acc[name] = {
          lowestId: mob.id,
          otherIds: [],
        };
        return acc;
      }

      if (mob.id < acc[name].lowestId) {
        acc[name].otherIds.push(acc[name].lowestId);
        acc[name].lowestId = mob.id;
      } else {
        acc[name].otherIds.push(mob.id);
      }

      return acc;
    },
    {} as Record<string, { lowestId: number; otherIds: number[] }>
  );

  for (const name in equivalentIds) {
    if (equivalentIds[name].otherIds.length === 0) {
      delete equivalentIds[name];
    }
  }

  return equivalentIds;
}

//console.log(groupSameName());
