import type { ComparasionIndicator, Monster } from '$src/@types';
import { filteredDuplicateMonsters } from '.';

type ComparePropertiesResult = {
  attemptData: Monster | undefined;
  level: ComparasionIndicator;
  hp: ComparasionIndicator;
  race: ComparasionIndicator;
  size: ComparasionIndicator;
  element: ComparasionIndicator;
};

function getIndicator(a?: number, b?: number): ComparasionIndicator {
  if (a === undefined || b === undefined) {
    return '=';
  }
  if (b > a) {
    return '>';
  }
  if (b < a) {
    return '<';
  }
  return '=';
}

const sizeOrder = ['Small', 'Medium', 'Large'] as Monster['size'][];

function getMonster(id: number | string) {
  return filteredDuplicateMonsters.find((i) => String(i.id) === String(id));
}

export function compareProperties(
  attemptID: number | string,
  targetID: number | string
): ComparePropertiesResult {
  const attempt = getMonster(attemptID);
  const target = getMonster(targetID);

  return {
    attemptData: attempt as Monster | undefined,
    level: getIndicator(attempt?.level, target?.level),
    hp: getIndicator(attempt?.hp, target?.hp),
    race: attempt?.race === target?.race,
    element: attempt?.element === target?.element,
    size: getIndicator(
      sizeOrder.indexOf(attempt?.size as Monster['size']),
      sizeOrder.indexOf(target?.size as Monster['size'])
    ),
  };
}
