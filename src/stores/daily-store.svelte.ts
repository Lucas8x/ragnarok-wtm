import { PersistedState } from 'runed';
import type { DailyItemStorage } from '$src/@types';
import { calculateStreak } from '$src/utils';
import { dayjs } from '$src/utils/dayjs';
import { getDailyMonsterID } from '$src/utils/prng';

const dateFormat = 'DDMMYYYY';

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

export const getGameData = (urlDate: string) => {
  const gameDate = dayjs.utc(urlDate, dateFormat).isValid()
    ? dayjs.utc(urlDate, dateFormat)
    : dayjs.utc();

  const dateGameKey = gameDate.format(dateFormat);

  console.log({
    gameDate,
    dateGameKey,
  });

  return {
    gameDate,
    isPastDate: gameDate.isBefore(dayjs.utc(), 'day'),
    dateGameKey,
    attempts: state.current[dateGameKey]?.attempts ?? [],
    scored: state.current[dateGameKey]?.completedOn !== undefined,
    streak: calculateStreak(state.current),
    correctID: getDailyMonsterID(gameDate),
  };
};

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
