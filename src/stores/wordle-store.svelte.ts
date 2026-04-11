import { PersistedState } from 'runed';
import { writable } from 'svelte/store';
import type { WordleItemStorage } from '$src/@types';
import { dayjs } from '$src/utils/dayjs';
import { WorldeGame } from '$src/utils/wordleGame';

type WordleStore = {
  [dateKey: string]: WordleItemStorage;
};

const state = new PersistedState<WordleStore>(
  'wordle',
  {
    nameLength: 5,
  },
  {
    storage: 'local',
    syncTabs: true,
  },
);

export const wordleGame = writable(new WorldeGame(5));

export function changeWordleLength(length: number) {
  if (typeof length !== 'number') return;
  if (length < 4 || length > 10) return;

  state.current.nameLength = length;
  wordleGame.set(new WorldeGame(length));
}
