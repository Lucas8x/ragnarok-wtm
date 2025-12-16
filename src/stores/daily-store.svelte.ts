import { PersistedState } from 'runed';
import type { Monster } from '$src/@types';

type DailyItem = {
  attempts: Monster[];
  completed: boolean;
};

type DailyStore = {
  [key: string]: DailyItem;
};

const state = new PersistedState<DailyStore>(
  'daily',
  {},
  {
    storage: 'local',
    syncTabs: true,
  },
);

export const dailyStore = {
  state,

  handleGuess: (gameDate: string, monster: Monster) => {
    if (!state.current[gameDate]) {
      state.current[gameDate] = {
        attempts: [monster],
        completed: false,
      };
    }

    state.current[gameDate] = {
      attempts: [monster, ...state.current[gameDate].attempts],
      completed: false,
    };

    if (monster.id === 1001) {
      state.current[gameDate].completed = true;
      return true;
    }
  },
};
