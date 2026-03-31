import { useState, useEffect, useCallback, useRef } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, QrCodeIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import FoodItemRow from '../shared/FoodItemRow';
import { searchFoods, lookupBarcode, emptyNutrition } from '../../utils/foodApi';
import { db } from '../../db/database';
import type { FoodItem, MealCategory, MealEntry, NutritionInfo } from '../../types';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import FoodInsightsPanel from '../FoodInsights/FoodInsightsPanel';
import BowlBuilder from '../BowlBuilder/BowlBuilder';

// Returns brand info if the food is a bowl/burrito builder trigger, otherwise null
function getBuilderInfo(food: FoodItem): { brandId: string; brandName: string } | null {
  if (!food.id.endsWith('-builder')) return null;
  // id format: seed-{brandId}-builder
  const parts = food.id.split('-');
  if (parts.length < 3 || parts[0] !== 'seed') return null;
  const brandId   = parts[1];
  const brandName = food.brand || (brandId.charAt(0).toUpperCase() + brandId.slice(1));
  return { brandId, brandName };
}

// Hide raw ingredient entries from search/my-foods lists
function isIngredient(food: FoodItem): boolean {
  return food.id.includes('-ing-');
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: MealEntry) => void;
  category: MealCategory;
}

type Tab = 'search' | 'barcode' | 'myfoods';

function ServingAdjuster({
  food,
  onAdd,
  onCancel,
}: {
  food: FoodItem;
  onAdd: (servings: number) => void;
  onCancel: () => void;
}) {
  const [servings, setServings] = useState(1);
  const n: NutritionInfo = food.nutrition;

  const scaled = (val: number) => Math.round(val * servings * 10) / 10;

  return (
    <div className="card p-4 space-y-4">
      <div>
        <div className="font-semibold text-white">{food.name}</div>
        {food.brand && <div className="text-sm text-gray-400">{food.brand}</div>}
        <div className="text-xs text-gray-500 mt-1">Serving: {food.servingLabel}</div>
      </div>
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Servings: <span className="text-white font-semibold">{servings}</span>
        </label>
        <input
          type="range"
          min={0.25}
          max={10}
          step={0.25}
          value={servings}
          onChange={e => setServings(parseFloat(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex gap-2 mt-2">
          {[0.5, 1, 1.5, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => setServings(s)}
              className={`flex-1 py-1 rounded-lg text-xs border transition-colors ${servings === s ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-700 border-white/[0.06] text-gray-300'}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
      <div className="bg-surface-bg rounded-xl p-3 grid grid-cols-4 gap-2 text-center text-sm">
        <div>
          <div className="text-white font-bold">{scaled(n.calories)}</div>
          <div className="text-gray-500 text-xs">cal</div>
        </div>
        <div>
          <div className="text-blue-400 font-semibold">{scaled(n.protein)}g</div>
          <div className="text-gray-500 text-xs">protein</div>
        </div>
        <div>
          <div className="text-amber-400 font-semibold">{scaled(n.carbs)}g</div>
          <div className="text-gray-500 text-xs">carbs</div>
        </div>
        <div>
          <div className="text-rose-400 font-semibold">{scaled(n.fat)}g</div>
          <div className="text-gray-500 text-xs">fat</div>
        </div>
      </div>
      <FoodInsightsPanel food={food} servings={servings} />
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl bg-gray-700 text-gray-300 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => onAdd(servings)}
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold"
        >
          Add to Meal
        </button>
      </div>
    </div>
  );
}

export default function FoodSearchModal({ isOpen, onClose, onAdd, category }: Props) {
  const [tab, setTab] = useState<Tab>('search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [builderInfo, setBuilderInfo] = useState<{ brandId: string; brandName: string } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<FoodItem | null>(null);
  const [myFoods, setMyFoods] = useState<FoodItem[]>([]);
  const [recentFoods, setRecentFoods] = useState<FoodItem[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      db.customFoods.toArray().then(setMyFoods);
      db.recentFoods.orderBy('usedAt').reverse().limit(10).toArray().then(setRecentFoods);
    }
  }, [isOpen]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults([]); setApiError(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setApiError(false);
      try {
        // Always search local custom/seeded foods first (works offline)
        const q = query.toLowerCase();
        const allCustom = await db.customFoods.toArray();
        const localMatches = allCustom.filter(f =>
          !isIngredient(f) &&
          (f.name.toLowerCase().includes(q) || f.brand?.toLowerCase().includes(q))
        );

        // Try remote APIs — silently handle failures
        let remoteResults: FoodItem[] = [];
        try {
          remoteResults = await searchFoods(query);
        } catch {
          if (localMatches.length === 0) setApiError(true);
        }

        // Merge: local first (exact brand matches feel faster), then remote
        const remoteDeduped = remoteResults.filter(r => !localMatches.find(l => l.id === r.id));
        setResults([...localMatches, ...remoteDeduped].slice(0, 30));
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const handleScan = useCallback(async (barcode: string) => {
    setScanning(false);
    setLoading(true);
    try {
      const food = await lookupBarcode(barcode);
      setBarcodeResult(food);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddFood = async (food: FoodItem, servings: number) => {
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food,
      servings,
      timeAdded: new Date().toISOString(),
    };
    onAdd(entry);
    await db.recentFoods.put({ ...food, usedAt: new Date().toISOString() });
    setSelected(null);
    setBarcodeResult(null);
    setBuilderInfo(null);
    onClose();
  };

  const handleBuilderAdd = async (entry: MealEntry) => {
    onAdd(entry);
    await db.recentFoods.put({ ...entry.food, usedAt: new Date().toISOString() });
    setBuilderInfo(null);
    onClose();
  };

  const handleSelectFood = (food: FoodItem) => {
    const info = getBuilderInfo(food);
    if (info) {
      setBuilderInfo(info);
    } else {
      setSelected(food);
    }
  };

  if (!isOpen) return null;

  const mealLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col overflow-hidden overscroll-none">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/[0.07]">
        <button
          onClick={() => builderInfo ? setBuilderInfo(null) : onClose()}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          {builderInfo
            ? <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            : <XMarkIcon className="w-6 h-6 text-gray-400" />
          }
        </button>
        <h2 className="flex-1 text-lg font-semibold text-white">
          {builderInfo
            ? `${builderInfo.brandName} Builder`
            : `Add to ${mealLabel}`
          }
        </h2>
      </div>

      {/* Builder view — full screen, no tabs */}
      {builderInfo && (
        <BowlBuilder
          brandId={builderInfo.brandId}
          brandName={builderInfo.brandName}
          onAdd={handleBuilderAdd}
          onCancel={() => setBuilderInfo(null)}
        />
      )}

      {/* Normal search view */}
      {!builderInfo && (
      <>
      {/* Tabs */}
      <div className="flex border-b border-white/[0.07]">
        {([['search', 'Search', MagnifyingGlassIcon], ['barcode', 'Barcode', QrCodeIcon], ['myfoods', 'My Foods', BookmarkIcon]] as const).map(([t, label, Icon]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors border-b-2 ${tab === t ? 'text-emerald-400 border-emerald-400' : 'text-gray-500 border-transparent'}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search Tab */}
        {tab === 'search' && (
          <>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                className="w-full bg-gray-800 border border-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500"
                placeholder="Search foods..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            {selected && (
              <ServingAdjuster
                food={selected}
                onAdd={(s) => handleAddFood(selected, s)}
                onCancel={() => setSelected(null)}
              />
            )}

            {!selected && (
              <>
                {loading && (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {!loading && !query && recentFoods.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Recent</div>
                    {recentFoods.filter(f => !isIngredient(f)).map(food => (
                      <FoodRow key={food.id} food={food} onSelect={handleSelectFood} />
                    ))}
                  </div>
                )}
                {!loading && results.filter(f => !isIngredient(f)).map(food => (
                  <FoodRow key={food.id} food={food} onSelect={handleSelectFood} />
                ))}
                {!loading && query && results.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    {apiError ? (
                      <>
                        <div className="text-yellow-400 font-medium">Food databases are temporarily unavailable</div>
                        <div className="text-gray-500 text-sm">Try the Foods tab to search your saved items, or add a custom food.</div>
                      </>
                    ) : (
                      <div className="text-gray-500">No results found for "{query}"</div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Barcode Tab */}
        {tab === 'barcode' && (
          <div className="space-y-4">
            {barcodeResult && (
              <ServingAdjuster
                food={barcodeResult}
                onAdd={(s) => handleAddFood(barcodeResult, s)}
                onCancel={() => setBarcodeResult(null)}
              />
            )}
            {!barcodeResult && !scanning && (
              <div className="text-center space-y-4 py-8">
                <QrCodeIcon className="w-16 h-16 text-gray-600 mx-auto" />
                <p className="text-gray-400">Scan a product barcode to quickly find food info</p>
                <button
                  onClick={() => setScanning(true)}
                  className="px-6 py-3 bg-brand-gradient text-white rounded-xl font-semibold shadow-glow-brand"
                >
                  Scan Barcode
                </button>
              </div>
            )}
            {scanning && (
              <div>
                <button
                  onClick={() => setScanning(false)}
                  className="mb-4 text-sm text-gray-400 hover:text-gray-200"
                >
                  ← Cancel scan
                </button>
                <BarcodeScanner onScan={handleScan} />
              </div>
            )}
            {loading && (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        {/* My Foods Tab */}
        {tab === 'myfoods' && (
          <div className="space-y-3">
            {selected && (
              <ServingAdjuster
                food={selected}
                onAdd={(s) => handleAddFood(selected, s)}
                onCancel={() => setSelected(null)}
              />
            )}
            {!selected && myFoods.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <BookmarkIcon className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                <p>No custom foods yet</p>
                <p className="text-xs mt-1">Create foods in the Foods section</p>
              </div>
            )}
            {!selected && myFoods.filter(f => !isIngredient(f)).map(food => (
              <FoodRow key={food.id} food={food} onSelect={handleSelectFood} />
            ))}
          </div>
        )}
      </div>
      </> /* end !builderInfo */
      )}
    </div>
  );
}

function FoodRow({ food, onSelect }: { food: FoodItem; onSelect: (f: FoodItem) => void }) {
  return (
    <div className="mb-2">
      <FoodItemRow food={food} onTap={() => onSelect(food)} variant="card" />
    </div>
  );
}
