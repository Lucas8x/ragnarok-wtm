import monsters from '$src/data/monsters2.json';

export function compareProperties(attemptID: number, targetID: number) {
  const attempt = monsters[attemptID];
  const target = monsters[targetID];

  return {
    attemptData: attempt,
    greaterLevel: target?.level > attempt?.level,
    greaterHP: target?.hp > attempt?.hp,
    race: attempt?.race === target?.race,
    element: attempt?.element === target?.element,
    size: attempt?.size === target?.size,
  };
}
