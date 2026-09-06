import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { MealEntry } from '../../types';
import { JERSEY_MIKES_SUB_FAMILIES } from '../../data/jerseyMikesSubData';
import { QUIKTRIP_SUB_FAMILIES } from '../../data/quiktripSubData';

// Generic size-then-bread configurator for sub shops with these variation axes
// (Jersey Mike's today; Jimmy John's, Subway, Firehouse Subs etc. could plug in
// their own data file later — each just needs a Record<string, SubFamily> merged
// into SUB_FAMILIES below).

export interface SubBreadOption {
  bread: string;         // e.g. "White Sub", "Wheat Sub", "Rosemary Parmesan", "White Wrap", "Sub in a Tub"
  servingLabel: string;
  cal: number; protein: number; carbs: number; fat: number; satFat: number;
  transFat: number; chol: number; sodium: number; fiber: number; sugar: number;
}

export interface SubSizeOption {
  size: string;           // e.g. "Mini", "Regular", "Giant"
  breads: SubBreadOption[];
}

export interface SubFamily {
  itemName: string;
  brand: string;
  sizes: SubSizeOption[];
}

export const SUB_FAMILIES: Record<string, SubFamily> = {
  ...JERSEY_MIKES_SUB_FAMILIES,
  ...QUIKTRIP_SUB_FAMILIES,
};

/** Returns the sub-family key if this food has a matching size/bread configurator. */
export function findSubFamilyForFood(food: { id: string }): string | null {
  return SUB_FAMILIES[food.id] ? food.id : null;
}

interface Props {
  subId: string;
  onAdd: (entry: MealEntry) => void;
  onCancel: () => void;
}

export default function SubBuilder({ subId, onAdd, onCancel }: Props) {
  const family = SUB_FAMILIES[subId];
  const [size, setSize] = useState<SubSizeOption | null>(
    family && family.sizes.length === 1 ? family.sizes[0] : null
  );
  const [bread, setBread] = useState<SubBreadOption | null>(null);

  if (!family) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Configuration options not found.</p>
        <button onClick={onCancel} className="mt-4 px-4 py-2 bg-gray-100 rounded-xl text-sm">Go back</button>
      </div>
    );
  }

  const handleAdd = (bread: SubBreadOption) => {
    if (!size) return;
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food: {
        id: `${subId}-${size.size.toLowerCase()}-${bread.bread.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${family.itemName} (${size.size}, ${bread.bread})`,
        brand: family.brand,
        servingSizeG: 1,
        servingLabel: bread.servingLabel,
        source: 'custom',
        nutrition: {
          calories: bread.cal, protein: bread.protein, carbs: bread.carbs,
          fat: bread.fat, saturatedFat: bread.satFat, transFat: bread.transFat,
          cholesterol: bread.chol, sodium: bread.sodium, fiber: bread.fiber,
          sugar: bread.sugar, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
          iron: 0, calcium: 0, potassium: 0, caffeine: 0, alcohol: 0, addedSugar: 0,
          magnesium: 0, zinc: 0, omega3: 0, folate: 0,
        },
      },
      servings: 1,
      timeAdded: new Date().toISOString(),
    };
    onAdd(entry);
  };

  // ── Step 1: choose a size ──────────────────────────────────────
  if (!size) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 pt-3 pb-2 shrink-0">
          <div className="text-xs text-gray-500 mb-0.5">{family.brand}</div>
          <div className="text-base font-bold text-gray-900">{family.itemName}</div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-3">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-semibold">Choose a size</p>
          <div className="grid grid-cols-2 gap-3">
            {family.sizes.map(s => {
              const calRange = s.breads.map(b => b.cal);
              const lo = Math.min(...calRange);
              const hi = Math.max(...calRange);
              return (
                <button
                  key={s.size}
                  onClick={() => setSize(s)}
                  className="text-left p-4 rounded-2xl border bg-surface-raised border-brand-400/20 hover:border-brand-400/50 transition-all"
                >
                  <div className="text-lg font-bold mb-1 text-gray-900">{s.size}</div>
                  <div className="text-xs text-gray-400">
                    {lo === hi ? `${lo} cal` : `${lo}–${hi} cal`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="shrink-0 px-4 pb-4 pt-2 border-t border-brand-400/20 bg-white">
          <button onClick={onCancel} className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: choose bread/format ─────────────────────────────────
  const selectedBread = bread ?? size.breads[0];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-2 shrink-0 flex items-center gap-2">
        {family.sizes.length > 1 && (
          <button onClick={() => { setSize(null); setBread(null); }} className="p-1 -ml-1 rounded-full hover:bg-surface-raised">
            <ArrowLeftIcon className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <div>
          <div className="text-xs text-gray-500 mb-0.5">{family.brand} · {size.size}</div>
          <div className="text-base font-bold text-gray-900">{family.itemName}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-3">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-semibold">Choose bread</p>
        <div className="grid grid-cols-2 gap-3">
          {size.breads.map(b => {
            const isSelected = selectedBread.bread === b.bread;
            return (
              <button
                key={b.bread}
                onClick={() => setBread(b)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-brand-400/15 border-brand-400 shadow-glow-brand'
                    : 'bg-surface-raised border-brand-400/20 hover:border-brand-400/50'
                }`}
              >
                <div className={`text-sm font-bold mb-0.5 ${isSelected ? 'text-brand-600' : 'text-gray-900'}`}>
                  {b.bread}
                </div>
                <div className={`text-2xl font-black leading-none ${isSelected ? 'text-brand-500' : 'text-gray-700'}`}>
                  {b.cal}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">calories</div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-blue-500 font-medium">{b.protein}g P</span>
                  <span className="text-amber-500 font-medium">{b.carbs}g C</span>
                  <span className="text-rose-500 font-medium">{b.fat}g F</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 bg-surface-raised rounded-2xl p-3 grid grid-cols-3 gap-y-2 text-center text-xs">
          <div><div className="font-bold text-gray-900">{selectedBread.sodium}mg</div><div className="text-gray-500">sodium</div></div>
          <div><div className="font-bold text-gray-900">{selectedBread.fiber}g</div><div className="text-gray-500">fiber</div></div>
          <div><div className="font-bold text-gray-900">{selectedBread.satFat}g</div><div className="text-gray-500">sat fat</div></div>
        </div>
      </div>

      <div className="shrink-0 px-4 pb-4 pt-2 border-t border-brand-400/20 bg-white flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm">
          Cancel
        </button>
        <button
          onClick={() => handleAdd(selectedBread)}
          className="flex-[2] py-3 rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-glow-brand"
        >
          Add {size.size} {selectedBread.bread} — {selectedBread.cal} cal
        </button>
      </div>
    </div>
  );
}
