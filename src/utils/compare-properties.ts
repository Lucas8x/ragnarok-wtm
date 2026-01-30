import type { ComparasionIndicator, Monster } from '$src/@types';
import monsters from '$src/data/monsters2.json';

type ComparePropertiesResult = {
  attemptData?: Monster;
  level: ComparasionIndicator;
  hp: ComparasionIndicator;
  race: ComparasionIndicator;
  size: ComparasionIndicator;
  element: ComparasionIndicator;
};

function getIndicator(a?: number, b?: number): ComparasionIndicator {
  if (a === undefined || b === undefined) return '=';

  if (b > a) return '>';
  if (b < a) return '<';
  return '=';
}

// sizes
const sizeOrder = ['Small', 'Medium', 'Large'] as Monster['size'][];

export function compareProperties(
  attemptID: number | string,
  targetID: number | string,
): ComparePropertiesResult {
  const attempt = monsters[attemptID as keyof typeof monsters] as Monster;
  const target = monsters[targetID as keyof typeof monsters] as Monster;

  console.log(attempt, target);

  return {
    attemptData: attempt,
    level: getIndicator(attempt?.level, target?.level),
    hp: getIndicator(attempt?.hp, target?.hp),
    race: attempt?.race === target?.race,
    element: attempt?.element === target?.element,
    size: getIndicator(
      sizeOrder.indexOf(attempt?.size),
      sizeOrder.indexOf(target?.size),
    ),
  };
}
