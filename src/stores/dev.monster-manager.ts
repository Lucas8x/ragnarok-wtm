import { PersistedState } from 'runed';

export const ignoreStore = new PersistedState<number[]>(
  'dev_ignore.monsters',
  [],
  {
    storage: 'local',
    syncTabs: true,
  }
);

export function ignoreMonster(id: number) {
  if (ignoreStore.current.includes(id)) {
    return false;
  }
  ignoreStore.current.push(id);
  return true;
}

export function restoreMonster(id: number) {
  ignoreStore.current = ignoreStore.current.filter(
    (ignoredId) => ignoredId !== id
  );
}
