import { PersistedState } from 'runed';

type DailyItem = {
  attempts: number[];
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

  handleGuess: (gameDate: string, monsterID: number) => {
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
      attempts: [monsterID, ...(state.current[gameDate]?.attempts || [])],
      answerID: undefined,
      completed: false,
    };

    if (monsterID === 1001) {
      state.current[gameDate].completed = true;
      state.current[gameDate].answerID = monsterID;
      return true;
    }
  },
};
