import { PersistedState } from 'runed';
import type { DailyItemStorage } from '$src/@types';
import { dayjs } from '$src/utils/dayjs';
import { getDailyMonsterID } from '$src/utils/prng';

type DailyStore = {
  [key: string]: DailyItemStorage;
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

  handleGuess: (gameDate: string, monsterID: number) => {
    /* if (!state.current[gameDate]) {
      state.current[gameDate] = {
        attempts: [monster],
        answerID: undefined,
        completed: false,
      };
    } */

    if (state.current[gameDate]?.completedOn) {
      return;
    }

    state.current[gameDate] = {
      attempts: [monsterID, ...(state.current[gameDate]?.attempts || [])],
      answerID: undefined,
      completedOn: undefined,
    };

    if (monsterID === getDailyMonsterID(dayjs.utc(gameDate))) {
      state.current[gameDate].answerID = monsterID;
      state.current[gameDate].completedOn = dayjs.utc().toISOString();
      return true;
    }
  },
};
