import type { ReactNode } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import type { FoodItem } from '../../types';

interface FoodItemRowProps {
  food: FoodItem;
  servings?: number;
  /** Makes the row body tappable and shows the ⓘ icon */
  onTap?: () => void;
  /** Trailing action slot — delete button, add button, etc. */
  actions?: ReactNode;
  /** card = raised rounded card (search, custom foods); list = border-b divider (log, recommendations) */
  variant?: 'card' | 'list';
}

export default function FoodItemRow({
  food,
  servings = 1,
  onTap,
  actions,
  variant = 'list',
}: FoodItemRowProps) {
  const n = food.nutrition;
  const cal  = Math.round(n.calories * servings);
  const prot = Math.round(n.protein  * servings);
  const carb = Math.round(n.carbs    * servings);
  const fat  = Math.round(n.fat      * servings);

  const containerClass = variant === 'card'
    ? 'flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-card border border-gray-100'
    : 'flex items-center gap-3 px-4 py-3 border-b border-gray-100';

  const body = (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="text-base text-gray-900 font-semibold truncate">{food.name}</span>
        {onTap && <InformationCircleIcon className="w-3.5 h-3.5 text-gray-600 shrink-0" />}
      </div>
      {food.brand && (
        <div className="text-sm text-gray-400 truncate">{food.brand}</div>
      )}
      <div className="text-xs text-gray-500 mt-0.5">
        {servings !== 1 && <span>{servings}× </span>}
        <span>{food.servingLabel}</span>
        <span className="mx-1 text-gray-700">·</span>
        <span className="text-blue-500 font-medium">{cal} cal</span>
        <span className="mx-1 text-gray-700">·</span>
        <span className="text-blue-500 font-medium">P:{prot}g</span>
        {' '}
        <span className="text-amber-500 font-medium">C:{carb}g</span>
        {' '}
        <span className="text-rose-500 font-medium">F:{fat}g</span>
      </div>
    </div>
  );

  return (
    <div className={containerClass}>
      {onTap ? (
        <button
          onClick={onTap}
          className="flex-1 min-w-0 text-left hover:opacity-75 transition-opacity"
        >
          {body}
        </button>
      ) : (
        body
      )}
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
