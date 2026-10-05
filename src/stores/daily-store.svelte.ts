import { PersistedState } from 'runed';
import type { DailyItemStorage } from '$src/@types';
import { calculateStreak } from '$src/utils';
import { dayjs } from '$src/utils/dayjs';
import { getDailyMonster } from '$src/utils/prng';

const dateFormat = 'DDMMYYYY';

type DailyStore = {
  [dateKey: string]: DailyItemStorage;
};

const state = new PersistedState<DailyStore>(
  'daily',
  {},
  {
    storage: 'local',
    syncTabs: true,
  }
);

export const getGameData = (urlDate: string) => {
  const gameDate = dayjs.utc(urlDate, dateFormat).isValid()
    ? dayjs.utc(urlDate, dateFormat)
    : dayjs.utc();

  const dateGameKey = gameDate.format(dateFormat);

  const dailyMonster = getDailyMonster(gameDate);

  const data = {
    attempts: state.current[dateGameKey]?.attempts ?? [],
    correctID: dailyMonster.id,
    dateGameKey,
    gameDate,
    isPastDate: gameDate.isBefore(dayjs.utc(), 'day'),
    scored: state.current[dateGameKey]?.completedOn !== undefined,
    streak: calculateStreak(state.current),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[DAILY] ', data);
    console.log('[DAILY] Answer: ', dailyMonster.name);
  }

  return data;
};

export function handleGuess(gameDate: string, monsterID: number) {
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
    answerID: undefined,
    attempts: [monsterID, ...(state.current[gameDate]?.attempts || [])],
    completedOn: undefined,
  };

  if (monsterID === getDailyMonster(dayjs.utc(gameDate)).id) {
    state.current[gameDate].answerID = monsterID;
    state.current[gameDate].completedOn = dayjs.utc().toISOString();
    return true;
  }
}
