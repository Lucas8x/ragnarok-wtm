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

export async function ignoreIdsFileServer(
  type: 'GET' | 'POST'
): Promise<string | null> {
  try {
    const response = await fetch('/api/ignored-ids', {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
      body: type === 'POST' ? JSON.stringify(ignoreStore.current) : undefined,
    });

    if (!response.ok) {
      return 'Request failed.';
    }

    const { error, ids } = await response.json();

    if (error) {
      return error;
    }

    if (ids) {
      if (!Array.isArray(ids)) {
        return 'Data from server is not an array';
      }
      ignoreStore.current = ids;
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return 'Unknow Error';
  }
}
