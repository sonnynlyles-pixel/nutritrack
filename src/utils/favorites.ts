import { db } from '../db/database';
import type { FoodItem } from '../types';

export async function isFavorite(id: string): Promise<boolean> {
  const row = await db.favorites.get(id);
  return !!row;
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const existing = await db.favorites.get(id);
  if (existing) {
    await db.favorites.delete(id);
    return false;
  }
  await db.favorites.put({ id, addedAt: new Date().toISOString() });
  return true;
}

/** Favorited foods, newest-first. Silently drops ids that no longer resolve
 *  (e.g. a seed item was renamed/removed since it was favorited). */
export async function getFavoriteFoods(): Promise<FoodItem[]> {
  const favs = await db.favorites.orderBy('addedAt').reverse().toArray();
  const foods = await Promise.all(favs.map(f => db.customFoods.get(f.id)));
  return foods.filter((f): f is FoodItem => !!f);
}
