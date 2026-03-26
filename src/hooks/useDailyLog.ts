import { useState, useEffect, useCallback } from 'react';
import { db } from '../db/database';
import type { DailyLog, MealEntry, MealCategory } from '../types';

function emptyLog(date: string): DailyLog {
  return { date, meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, waterOz: 0, notes: '' };
}

export function useDailyLog(date: string) {
  const [log, setLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const stored = await db.dailyLogs.get(date);
    setLog(stored || emptyLog(date));
    setLoading(false);
  }, [date]);

  useEffect(() => { reload(); }, [reload]);

  const save = async (updated: DailyLog) => {
    await db.dailyLogs.put(updated);
    setLog(updated);
  };

  const addEntry = async (category: MealCategory, entry: MealEntry) => {
    const current = log || emptyLog(date);
    const updated = {
      ...current,
      meals: { ...current.meals, [category]: [...current.meals[category], entry] }
    };
    await save(updated);
  };

  const removeEntry = async (category: MealCategory, entryId: string) => {
    if (!log) return;
    const updated = {
      ...log,
      meals: { ...log.meals, [category]: log.meals[category].filter(e => e.id !== entryId) }
    };
    await save(updated);
  };

  const updateWater = async (oz: number) => {
    const current = log || emptyLog(date);
    await save({ ...current, waterOz: oz });
  };

  const updateNotes = async (notes: string) => {
    const current = log || emptyLog(date);
    await save({ ...current, notes });
  };

  return { log, loading, addEntry, removeEntry, updateWater, updateNotes, reload };
}
