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
    ? 'flex items-center gap-3 bg-surface-raised rounded-xl px-3 py-3 border border-white/[0.05]'
    : 'flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]';

  const body = (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-white font-semibold truncate">{food.name}</span>
        {onTap && <InformationCircleIcon className="w-3.5 h-3.5 text-gray-600 shrink-0" />}
      </div>
      {food.brand && (
        <div className="text-xs text-gray-500 truncate">{food.brand}</div>
      )}
      <div className="text-xs text-gray-500 mt-0.5">
        {servings !== 1 && <span>{servings}× </span>}
        <span>{food.servingLabel}</span>
        <span className="mx-1 text-gray-700">·</span>
        <span className="text-brand-400 font-semibold">{cal} cal</span>
        <span className="mx-1 text-gray-700">·</span>
        <span className="text-blue-400">P:{prot}g</span>
        {' '}
        <span className="text-amber-400">C:{carb}g</span>
        {' '}
        <span className="text-rose-400">F:{fat}g</span>
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
