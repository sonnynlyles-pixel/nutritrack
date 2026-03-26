import { useState, useEffect } from 'react';
import { db } from '../db/database';
import { format, subDays } from 'date-fns';

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function calc() {
      let count = 0;
      let check = new Date();
      // Don't count today if not yet logged
      for (let i = 0; i < 365; i++) {
        const dateStr = format(check, 'yyyy-MM-dd');
        const log = await db.dailyLogs.get(dateStr);
        const hasEntries = log && Object.values(log.meals).some(m => m.length > 0);
        if (hasEntries) {
          count++;
          check = subDays(check, 1);
        } else {
          // Allow today to not break streak
          if (i === 0) { check = subDays(check, 1); continue; }
          break;
        }
      }
      setStreak(count);
    }
    calc();
  }, []);

  return streak;
}
