import type { DailyLog } from '../types';
import type { UserProfile } from '../types';
import { sumNutrition } from './nutrition';

export interface DayScoreBreakdown {
  total: number; // 0–100
  calories:     { points: number; max: number; label: string; detail: string };
  protein:      { points: number; max: number; label: string; detail: string };
  sodium:       { points: number; max: number; label: string; detail: string };
  fiber:        { points: number; max: number; label: string; detail: string };
  sugar:        { points: number; max: number; label: string; detail: string };
  satFat:       { points: number; max: number; label: string; detail: string };
  mealBalance:  { points: number; max: number; label: string; detail: string };
}

export function getDayScore(log: DailyLog, profile: UserProfile): DayScoreBreakdown | null {
  const allEntries = Object.values(log.meals).flat();
  if (allEntries.length === 0) return null;

  const n = sumNutrition(allEntries);
  const cal = Math.round(n.calories);
  const goal = profile.calorieGoal;
  const proteinGoal = profile.macroTargets.protein;

  // ── Calorie adherence (30 pts) ────────────────────────────────
  let calPts = 30;
  const calPct = cal / goal;
  let calDetail = '';
  if (calPct > 1.25) { calPts = 0;  calDetail = `${cal} cal — ${Math.round((calPct - 1) * 100)}% over goal`; }
  else if (calPct > 1.15) { calPts = 10; calDetail = `${cal} cal — ${Math.round((calPct - 1) * 100)}% over goal`; }
  else if (calPct > 1.05) { calPts = 20; calDetail = `${cal} cal — slightly over goal`; }
  else if (calPct < 0.5)  { calPts = 10; calDetail = `${cal} cal — significantly under goal`; }
  else if (calPct < 0.7)  { calPts = 20; calDetail = `${cal} cal — under goal`; }
  else { calDetail = `${cal} cal — on target`; }

  // ── Protein (20 pts) ─────────────────────────────────────────
  let protPts = 20;
  const protPct = n.protein / proteinGoal;
  let protDetail = '';
  if (protPct >= 1.0)       { protDetail = `${Math.round(n.protein)}g — hit goal`; }
  else if (protPct >= 0.75) { protPts = 15; protDetail = `${Math.round(n.protein)}g — close to goal`; }
  else if (protPct >= 0.5)  { protPts = 10; protDetail = `${Math.round(n.protein)}g — below goal`; }
  else                      { protPts = 0;  protDetail = `${Math.round(n.protein)}g — well below goal`; }

  // ── Sodium (15 pts) ──────────────────────────────────────────
  let sodPts = 15;
  let sodDetail = '';
  if (n.sodium > 4600)      { sodPts = 0;  sodDetail = `${Math.round(n.sodium)}mg — 2× daily limit`; }
  else if (n.sodium > 3450) { sodPts = 5;  sodDetail = `${Math.round(n.sodium)}mg — 150% of daily limit`; }
  else if (n.sodium > 2300) { sodPts = 10; sodDetail = `${Math.round(n.sodium)}mg — over daily limit`; }
  else                      { sodDetail = `${Math.round(n.sodium)}mg — within limit`; }

  // ── Fiber (15 pts) ───────────────────────────────────────────
  let fibPts = 15;
  let fibDetail = '';
  if (n.fiber >= 28)        { fibDetail = `${Math.round(n.fiber)}g — daily goal met`; }
  else if (n.fiber >= 21)   { fibPts = 12; fibDetail = `${Math.round(n.fiber)}g — close to goal`; }
  else if (n.fiber >= 14)   { fibPts = 8;  fibDetail = `${Math.round(n.fiber)}g — moderate`; }
  else if (n.fiber >= 7)    { fibPts = 4;  fibDetail = `${Math.round(n.fiber)}g — low`; }
  else                      { fibPts = 0;  fibDetail = `${Math.round(n.fiber)}g — very low`; }

  // ── Sugar (10 pts) ───────────────────────────────────────────
  let sugPts = 10;
  let sugDetail = '';
  if (n.sugar > 100)        { sugPts = 0;  sugDetail = `${Math.round(n.sugar)}g — very high`; }
  else if (n.sugar > 60)    { sugPts = 3;  sugDetail = `${Math.round(n.sugar)}g — high`; }
  else if (n.sugar > 36)    { sugPts = 6;  sugDetail = `${Math.round(n.sugar)}g — moderate`; }
  else                      { sugDetail = `${Math.round(n.sugar)}g — within range`; }

  // ── Saturated fat (5 pts) ────────────────────────────────────
  let satPts = 5;
  let satDetail = '';
  if (n.saturatedFat > 26)      { satPts = 0; satDetail = `${Math.round(n.saturatedFat)}g — 2× daily limit`; }
  else if (n.saturatedFat > 13) { satPts = 2; satDetail = `${Math.round(n.saturatedFat)}g — over daily limit`; }
  else                          { satDetail = `${Math.round(n.saturatedFat)}g — within limit`; }

  // ── Meal balance (5 pts) ─────────────────────────────────────
  const mealsLogged = Object.values(log.meals).filter(m => m.length > 0).length;
  let mealPts = 0;
  let mealDetail = '';
  if (mealsLogged >= 3)      { mealPts = 5; mealDetail = '3+ meals logged'; }
  else if (mealsLogged === 2) { mealPts = 3; mealDetail = '2 meals logged'; }
  else                        { mealPts = 1; mealDetail = '1 meal logged'; }

  const total = Math.min(100, calPts + protPts + sodPts + fibPts + sugPts + satPts + mealPts);

  return {
    total,
    calories:    { points: calPts,  max: 30, label: 'Calorie Goal',    detail: calDetail },
    protein:     { points: protPts, max: 20, label: 'Protein',         detail: protDetail },
    sodium:      { points: sodPts,  max: 15, label: 'Sodium',          detail: sodDetail },
    fiber:       { points: fibPts,  max: 15, label: 'Fiber',           detail: fibDetail },
    sugar:       { points: sugPts,  max: 10, label: 'Sugar',           detail: sugDetail },
    satFat:      { points: satPts,  max: 5,  label: 'Saturated Fat',   detail: satDetail },
    mealBalance: { points: mealPts, max: 5,  label: 'Meal Balance',    detail: mealDetail },
  };
}

export function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export function scoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}
