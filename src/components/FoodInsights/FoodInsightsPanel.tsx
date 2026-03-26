import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { getFoodInsights } from '../../utils/foodInsights';
import type { FoodInsight } from '../../utils/foodInsights';
import type { FoodItem } from '../../types';

const CATEGORY_LABELS: Record<string, string> = {
  mood: 'Mood & Energy',
  overconsumption: 'Satiety & Cravings',
  health: 'Health Impact',
};

const SEVERITY_STYLES: Record<string, string> = {
  positive: 'border-emerald-700 bg-emerald-900/20',
  neutral:  'border-gray-600 bg-gray-800',
  caution:  'border-yellow-700 bg-yellow-900/20',
  warning:  'border-orange-700 bg-orange-900/20',
};

const SEVERITY_TITLE_STYLES: Record<string, string> = {
  positive: 'text-emerald-400',
  neutral:  'text-gray-300',
  caution:  'text-yellow-400',
  warning:  'text-orange-400',
};

const SEVERITY_ICONS: Record<string, string> = {
  positive: '✓',
  neutral:  '○',
  caution:  '△',
  warning:  '⚠',
};

interface Props {
  food: FoodItem;
  servings: number;
}

export default function FoodInsightsPanel({ food, servings }: Props) {
  const [expanded, setExpanded] = useState(false);

  const insights = getFoodInsights(food, servings);

  if (insights.length === 0) return null;

  const warningCount  = insights.filter(i => i.severity === 'warning').length;
  const cautionCount  = insights.filter(i => i.severity === 'caution').length;
  const positiveCount = insights.filter(i => i.severity === 'positive').length;

  // Build a short summary string like "3 insights · 1 ⚠ warning · 2 △ caution"
  const summaryParts: string[] = [];
  if (warningCount  > 0) summaryParts.push(`${warningCount} ⚠ warning${warningCount  > 1 ? 's' : ''}`);
  if (cautionCount  > 0) summaryParts.push(`${cautionCount} △ caution${cautionCount  > 1 ? 's' : ''}`);
  if (positiveCount > 0) summaryParts.push(`${positiveCount} ✓ positive`);

  const summary = `${insights.length} insight${insights.length > 1 ? 's' : ''}${summaryParts.length > 0 ? ' · ' + summaryParts.join(' · ') : ''}`;

  // Group by category, preserving a stable order
  const categories: InsightCategory[] = ['mood', 'overconsumption', 'health'];
  type InsightCategory = 'mood' | 'overconsumption' | 'health';
  const grouped = categories.reduce<Record<InsightCategory, FoodInsight[]>>(
    (acc, cat) => {
      acc[cat] = insights.filter(i => i.category === cat);
      return acc;
    },
    { mood: [], overconsumption: [], health: [] },
  );

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors text-left"
      >
        <span className="text-sm font-medium text-gray-200">Food Insights</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{summary}</span>
          {expanded
            ? <ChevronUpIcon className="w-4 h-4 text-gray-400" />
            : <ChevronDownIcon className="w-4 h-4 text-gray-400" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="bg-gray-900 px-4 pb-4 space-y-4 pt-3">
          {categories.map(cat => {
            const catInsights = grouped[cat];
            if (catInsights.length === 0) return null;
            return (
              <div key={cat}>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {CATEGORY_LABELS[cat]}
                </div>
                <div className="space-y-2">
                  {catInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border px-3 py-2.5 ${SEVERITY_STYLES[insight.severity]}`}
                    >
                      <div className={`text-sm font-semibold mb-1 ${SEVERITY_TITLE_STYLES[insight.severity]}`}>
                        <span className="mr-1.5">{SEVERITY_ICONS[insight.severity]}</span>
                        {insight.title}
                      </div>
                      <div className="text-xs text-gray-300 leading-relaxed">
                        {insight.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
