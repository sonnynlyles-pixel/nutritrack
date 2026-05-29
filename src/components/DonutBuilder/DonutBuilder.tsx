import { useState } from 'react';
import type { MealEntry } from '../../types';

interface DonutVariant {
  name: string;
  category: 'Ring' | 'Filled' | 'Cake' | 'Munchkins';
  emoji: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  satFat: number;
  chol: number;
  sodium: number;
  fiber: number;
  sugar: number;
}

const DONUTS: DonutVariant[] = [
  // ── Ring (Yeast) ──────────────────────────────────────────────
  { name: 'Original Glazed',                 category: 'Ring',     emoji: '🍩', cal: 260, protein: 4, carbs: 33, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 13 },
  { name: 'Chocolate Frosted',               category: 'Ring',     emoji: '🍫', cal: 270, protein: 3, carbs: 36, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 17 },
  { name: 'Strawberry Frosted',              category: 'Ring',     emoji: '🍓', cal: 260, protein: 3, carbs: 35, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 16 },
  { name: 'Vanilla Frosted',                 category: 'Ring',     emoji: '🤍', cal: 260, protein: 3, carbs: 35, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 16 },
  { name: 'Chocolate Glazed',                category: 'Ring',     emoji: '🍫', cal: 260, protein: 3, carbs: 36, fat: 12, satFat: 5, chol:  0, sodium: 280, fiber: 1, sugar: 16 },
  { name: 'Maple Frosted',                   category: 'Ring',     emoji: '🍁', cal: 260, protein: 3, carbs: 35, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 16 },
  { name: 'Marble Frosted',                  category: 'Ring',     emoji: '🌀', cal: 270, protein: 3, carbs: 36, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 17 },
  { name: 'Glazed with Sprinkles',           category: 'Ring',     emoji: '✨', cal: 270, protein: 3, carbs: 35, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 15 },
  { name: 'Chocolate Frosted with Sprinkles',category: 'Ring',     emoji: '🎉', cal: 280, protein: 3, carbs: 38, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 19 },
  { name: 'Strawberry Frosted with Sprinkles',category:'Ring',     emoji: '🎀', cal: 270, protein: 3, carbs: 36, fat: 13, satFat: 6, chol:  0, sodium: 260, fiber: 1, sugar: 17 },
  // ── Filled ────────────────────────────────────────────────────
  { name: 'Boston Kreme',                    category: 'Filled',   emoji: '🍮', cal: 300, protein: 4, carbs: 43, fat: 13, satFat: 6, chol:  0, sodium: 310, fiber: 1, sugar: 20 },
  { name: 'Jelly',                           category: 'Filled',   emoji: '🍇', cal: 290, protein: 4, carbs: 40, fat: 13, satFat: 5, chol:  0, sodium: 280, fiber: 1, sugar: 15 },
  { name: 'Bavarian Kreme',                  category: 'Filled',   emoji: '🥛', cal: 290, protein: 4, carbs: 38, fat: 14, satFat: 6, chol:  5, sodium: 280, fiber: 1, sugar: 14 },
  { name: 'Chocolate Kreme Filled',          category: 'Filled',   emoji: '🍫', cal: 340, protein: 3, carbs: 45, fat: 16, satFat: 8, chol:  5, sodium: 340, fiber: 1, sugar: 21 },
  { name: 'Glazed Lemon Filled',             category: 'Filled',   emoji: '🍋', cal: 260, protein: 3, carbs: 37, fat: 11, satFat: 5, chol:  0, sodium: 250, fiber: 1, sugar: 16 },
  { name: 'Apple Filled',                    category: 'Filled',   emoji: '🍎', cal: 290, protein: 4, carbs: 41, fat: 12, satFat: 5, chol:  0, sodium: 270, fiber: 1, sugar: 16 },
  // ── Cake ─────────────────────────────────────────────────────
  { name: 'Old Fashioned',                   category: 'Cake',     emoji: '⭐', cal: 290, protein: 3, carbs: 33, fat: 17, satFat: 8, chol: 15, sodium: 410, fiber: 1, sugar: 14 },
  { name: 'Cinnamon Cake',                   category: 'Cake',     emoji: '🌿', cal: 330, protein: 3, carbs: 41, fat: 17, satFat: 8, chol: 15, sodium: 380, fiber: 1, sugar: 21 },
  { name: 'Glazed Cake',                     category: 'Cake',     emoji: '✨', cal: 350, protein: 3, carbs: 48, fat: 17, satFat: 8, chol: 15, sodium: 370, fiber: 1, sugar: 26 },
  { name: 'Chocolate Frosted Cake',          category: 'Cake',     emoji: '🍫', cal: 360, protein: 3, carbs: 48, fat: 18, satFat: 9, chol: 15, sodium: 370, fiber: 1, sugar: 27 },
  { name: 'Blueberry Cake',                  category: 'Cake',     emoji: '🫐', cal: 310, protein: 3, carbs: 38, fat: 16, satFat: 8, chol: 15, sodium: 400, fiber: 1, sugar: 17 },
  // ── Munchkins ────────────────────────────────────────────────
  { name: 'Glazed (5 pc)',                   category: 'Munchkins',emoji: '🍩', cal: 200, protein: 3, carbs: 26, fat: 10, satFat: 5, chol:  0, sodium: 170, fiber: 0, sugar: 10 },
  { name: 'Glazed (10 pc)',                  category: 'Munchkins',emoji: '🍩', cal: 390, protein: 5, carbs: 52, fat: 20, satFat: 9, chol:  0, sodium: 340, fiber: 0, sugar: 21 },
  { name: 'Chocolate Glazed (5 pc)',         category: 'Munchkins',emoji: '🍫', cal: 210, protein: 3, carbs: 28, fat: 10, satFat: 5, chol:  0, sodium: 170, fiber: 0, sugar: 13 },
  { name: 'Jelly (5 pc)',                    category: 'Munchkins',emoji: '🍇', cal: 210, protein: 3, carbs: 31, fat:  9, satFat: 4, chol:  0, sodium: 180, fiber: 0, sugar: 12 },
  { name: 'Old Fashioned Cake (5 pc)',       category: 'Munchkins',emoji: '⭐', cal: 250, protein: 3, carbs: 28, fat: 14, satFat: 7, chol: 10, sodium: 310, fiber: 0, sugar: 12 },
  { name: 'Chocolate Cake (5 pc)',           category: 'Munchkins',emoji: '🍫', cal: 260, protein: 3, carbs: 32, fat: 14, satFat: 7, chol: 10, sodium: 280, fiber: 0, sugar: 14 },
];

const CATEGORIES = ['Ring', 'Filled', 'Cake', 'Munchkins'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  Ring: 'Ring / Yeast',
  Filled: 'Filled',
  Cake: 'Cake',
  Munchkins: 'Munchkins',
};

interface Props {
  onAdd: (entry: MealEntry) => void;
  onCancel: () => void;
}

export default function DonutBuilder({ onAdd, onCancel }: Props) {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Ring');
  const [selected, setSelected] = useState<DonutVariant | null>(null);
  const [servings, setServings] = useState(1);

  const visibleDonuts = DONUTS.filter(d => d.category === activeCategory);

  const handleAdd = () => {
    if (!selected) return;
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food: {
        id: `dunkin-donut-${selected.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name: `${selected.name} Donut`,
        brand: "Dunkin'",
        servingSizeG: 1,
        servingLabel: selected.category === 'Munchkins' ? selected.name.match(/\d+ pc/)![0] : '1 donut',
        source: 'custom',
        nutrition: {
          calories: selected.cal,
          protein: selected.protein,
          carbs: selected.carbs,
          fat: selected.fat,
          saturatedFat: selected.satFat,
          cholesterol: selected.chol,
          sodium: selected.sodium,
          fiber: selected.fiber,
          sugar: selected.sugar,
          vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
          iron: 0, calcium: 0, potassium: 0, caffeine: 0,
          alcohol: 0, addedSugar: selected.sugar, transFat: 0,
          magnesium: 0, zinc: 0, omega3: 0, folate: 0,
        },
      },
      servings,
      timeAdded: new Date().toISOString(),
    };
    onAdd(entry);
  };

  const sc = (v: number) => Math.round(v * servings * 10) / 10;

  return (
    <div className="flex flex-col h-full">
      {/* Category tabs */}
      <div className="flex border-b border-brand-400/20 shrink-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelected(null); }}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? 'text-brand-500 border-b-2 border-brand-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Donut grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {visibleDonuts.map(donut => {
            const isSelected = selected?.name === donut.name;
            return (
              <button
                key={donut.name}
                onClick={() => { setSelected(donut); setServings(1); }}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-brand-400/15 border-brand-400 shadow-glow-brand'
                    : 'bg-surface-raised border-brand-400/20 hover:border-brand-400/50'
                }`}
              >
                <div className="text-xl mb-1">{donut.emoji}</div>
                <div className={`text-xs font-semibold leading-snug mb-1 ${isSelected ? 'text-brand-600' : 'text-gray-900'}`}>
                  {donut.name}
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-brand-500' : 'text-gray-500'}`}>
                  {donut.cal} cal
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nutrition preview + add */}
      {selected && (
        <div className="shrink-0 border-t border-brand-400/20 p-3 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">{selected.name}</div>
              <div className="text-xs text-gray-500">{selected.category === 'Munchkins' ? selected.name : '1 donut'}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setServings(s => Math.max(0.5, s - 0.5))}
                className="w-7 h-7 rounded-lg bg-surface-raised border border-brand-400/20 text-gray-700 font-bold text-sm"
              >−</button>
              <span className="text-sm font-semibold text-gray-900 w-8 text-center">{servings}x</span>
              <button
                onClick={() => setServings(s => s + 0.5)}
                className="w-7 h-7 rounded-lg bg-surface-raised border border-brand-400/20 text-gray-700 font-bold text-sm"
              >+</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 bg-surface-raised rounded-xl p-3 text-center text-xs">
            <div>
              <div className="font-bold text-gray-900 text-sm">{sc(selected.cal)}</div>
              <div className="text-gray-500">cal</div>
            </div>
            <div>
              <div className="font-semibold text-blue-500">{sc(selected.protein)}g</div>
              <div className="text-gray-500">protein</div>
            </div>
            <div>
              <div className="font-semibold text-amber-500">{sc(selected.carbs)}g</div>
              <div className="text-gray-500">carbs</div>
            </div>
            <div>
              <div className="font-semibold text-rose-500">{sc(selected.fat)}g</div>
              <div className="text-gray-500">fat</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex-[2] py-2.5 rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-glow-brand"
            >
              Add to Meal
            </button>
          </div>
        </div>
      )}

      {!selected && (
        <div className="shrink-0 p-3 border-t border-brand-400/20">
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
