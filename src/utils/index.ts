import type { DailyItemStorage } from '$src/@types';
import ignoreIds from '$src/data/ignoreIDs.json';
import monsters from '$src/data/monsters.json';
import { dayjs } from '$src/utils/dayjs';

export const filteredDuplicateMonsters = monsters.filter(
  (i) => !ignoreIds.includes(i.id)
);

export function calculateStreak(dates: Record<string, DailyItemStorage>) {
  const today = dayjs.utc();
  console.log('Today:', today.format('DD-MM-YYYY'));

  let streak = 0;

  for (let i = 0; ; i++) {
    const dateKey = today.subtract(i, 'day').format('DDMMYYYY');

    if (i === 0 && dates[dateKey]?.completedOn === undefined) {
      continue;
    }

    if (
      dates[dateKey]?.completedOn ===
      today.subtract(i, 'day').format('YYYY-MM-DD')
    ) {
      streak += 1;
    } else {
      console.log(
        'Streak ended at:',
        dayjs.utc(dateKey, 'DDMMYYYY').format('DD-MM-YYYY')
      );
      break;
    }
  }

  return {
    streak,
    onFire:
      dates[today.format('DDMMYYYY')]?.completedOn ===
      today.format('YYYY-MM-DD'),
  };
}

/* console.log(
  'streak:',
  calculateStreak({
    '02022026': { attempts: [], completedOn: '2026-02-02' },
    '05022026': { attempts: [], completedOn: '2026-02-05' },
    '06022026': { attempts: [], completedOn: '2026-02-06' },
    '07022026': { attempts: [], completedOn: '2026-02-07' },
    '08022026': { attempts: [], completedOn: undefined },
  })
); */

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
