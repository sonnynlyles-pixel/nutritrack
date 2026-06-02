import { useState } from 'react';
import type { MealEntry } from '../../types';
import { db } from '../../db/database';

const FLAVORS = [
  { id: 'atomic', label: 'Atomic', emoji: '🔥' },
  { id: 'cajun', label: 'Cajun', emoji: '🌶️' },
  { id: 'garlic', label: 'Garlic Parmesan', emoji: '🧄' },
  { id: 'hawaiian', label: 'Hawaiian', emoji: '🍍' },
  { id: 'hickory', label: 'Hickory Smoked BBQ', emoji: '🔥' },
  { id: 'honey-rub', label: 'Hot Honey Rub', emoji: '🍯' },
  { id: 'lemon', label: 'Lemon Pepper', emoji: '🍋' },
  { id: 'louisiana', label: 'Louisiana Rub', emoji: '🌶️' },
  { id: 'mango', label: 'Mango Habanero', emoji: '🥭' },
  { id: 'mild', label: 'Mild', emoji: '😌' },
  { id: 'original', label: 'Original Hot', emoji: '🔥' },
  { id: 'plain', label: 'Plain', emoji: '✨' },
  { id: 'korean', label: 'Spicy Korean Q', emoji: '🌶️' },
];

interface Props {
  onAdd: (entry: MealEntry) => void;
  onCancel: () => void;
}

export default function TenderPicker({ onAdd, onCancel }: Props) {
  const [quantity, setQuantity] = useState<'3pc' | '5pc' | null>(null);

  const handleFlavorSelect = async (flavorId: string) => {
    if (!quantity) return;

    const itemId = `seed-ws-tender-${quantity}-${flavorId}`;
    const food = await db.customFoods.get(itemId);

    if (food) {
      onAdd({
        id: `${Date.now()}-${Math.random()}`,
        food,
        servings: 1,
        timeAdded: new Date().toISOString(),
      });
    }
  };

  if (!quantity) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="text-sm text-gray-600 mb-4">
          How many pieces?
        </div>
        <button
          onClick={() => setQuantity('3pc')}
          className="w-full p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 transition-colors text-left"
        >
          <div className="font-semibold text-emerald-900">3-Piece</div>
          <div className="text-sm text-emerald-700 mt-1">Classic size</div>
        </button>
        <button
          onClick={() => setQuantity('5pc')}
          className="w-full p-4 rounded-xl bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-colors text-left"
        >
          <div className="font-semibold text-blue-900">5-Piece</div>
          <div className="text-sm text-blue-700 mt-1">Best value</div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
        <button
          onClick={() => setQuantity(null)}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          ← Back
        </button>
        <span>Pick a flavor</span>
      </div>
      {FLAVORS.map((flavor) => (
        <button
          key={flavor.id}
          onClick={() => handleFlavorSelect(flavor.id)}
          className="w-full p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-300 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{flavor.emoji}</span>
            <span className="font-medium text-gray-900">{flavor.label}</span>
          </div>
        </button>
      ))}
      <button
        onClick={onCancel}
        className="w-full mt-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
      >
        Cancel
      </button>
    </div>
  );
}
