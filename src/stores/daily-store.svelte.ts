import { PersistedState } from 'runed';
import type { Monster } from '$src/@types';

type DailyItem = {
  attempts: Monster[];
  answerID?: number;
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
    /* if (!state.current[gameDate]) {
      state.current[gameDate] = {
        attempts: [monster],
        answerID: undefined,
        completed: false,
      };
    } */

    if (state.current[gameDate]?.completed) {
      return;
    }

    state.current[gameDate] = {
      attempts: [monster, ...(state.current[gameDate]?.attempts || [])],
      answerID: undefined,
      completed: false,
    };

    if (monster.id === 1001) {
      state.current[gameDate].completed = true;
      state.current[gameDate].answerID = monster.id;
      return true;
    }
  },
};
