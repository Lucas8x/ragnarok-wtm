import { PersistedState } from 'runed';

export const ignoreStore = new PersistedState<number[]>(
  'dev_ignore.monsters',
  [],
  {
    storage: 'local',
    syncTabs: true,
  }
);

export function toggleMonster(id: number) {
  if (ignoreStore.current.includes(id)) {
    ignoreStore.current = ignoreStore.current.filter(
      (ignoredId) => ignoredId !== id
    );
    return;
  }
  ignoreStore.current.push(id);
}

export async function saveToDisk() {
  const response = await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ignoreStore.current),
  });

  if (!response.ok) {
    return ['Request failed.', null];
  }

  const { error, ids } = await response.json();

  if (error) {
    console.error('[Disk-Server] Error:', error);
    return [error, null];
  }

  const parsedIds = JSON.parse(ids);
  if (!Array.isArray(parsedIds)) {
    return ['Data from server is not an array', null];
  }

  ignoreStore.current = parsedIds;
  return [null, true];
}
