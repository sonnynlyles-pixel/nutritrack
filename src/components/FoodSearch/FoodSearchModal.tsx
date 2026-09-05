import { useState, useEffect, useCallback, useRef } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, QrCodeIcon, BookmarkIcon, BuildingStorefrontIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import FoodItemRow from '../shared/FoodItemRow';
import CreateFoodForm from '../shared/CreateFoodForm';
import { searchFoods, lookupBarcode, emptyNutrition } from '../../utils/foodApi';
import { rankFoods, suggestRelatedTerms } from '../../utils/foodSearch';
import { toggleFavorite, getFavoriteFoods } from '../../utils/favorites';
import { db } from '../../db/database';
import type { FoodItem, MealCategory, MealEntry, NutritionInfo } from '../../types';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import FoodInsightsPanel from '../FoodInsights/FoodInsightsPanel';
import BowlBuilder from '../BowlBuilder/BowlBuilder';
import DonutBuilder from '../DonutBuilder/DonutBuilder';
import SizePicker, { SIZE_FAMILIES, findSizerForFood } from '../SizePicker/SizePicker';
import TenderPicker from '../SizePicker/TenderPicker';
import RestaurantBrowse from './RestaurantBrowse';

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

type Tab = 'search' | 'barcode' | 'myfoods' | 'restaurants';

// Only the categories worth browsing by chip — restaurant/drink items are
// already well served by the Brands tab, so they're excluded here.
const BROWSABLE_CATEGORIES = ['Fruits', 'Vegetables', 'Meat', 'Dairy', 'Grains', 'Protein', 'Snacks'];

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
        <div className="font-semibold text-gray-900">{food.name}</div>
        {food.brand && <div className="text-sm text-gray-400">{food.brand}</div>}
        <div className="text-xs text-gray-500 mt-1">Serving: {food.servingLabel}</div>
      </div>
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Servings: <span className="text-gray-900 font-semibold">{servings}</span>
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
              className={`flex-1 py-1 rounded-lg text-xs border transition-colors ${servings === s ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-gray-100 border-brand-400/20 text-gray-700'}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
      <div className="bg-surface-bg rounded-xl p-3 grid grid-cols-4 gap-2 text-center text-sm">
        <div>
          <div className="text-gray-900 font-bold">{scaled(n.calories)}</div>
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
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => onAdd(servings)}
          className="flex-1 py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600"
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
  const [donutBuilder, setDonutBuilder] = useState(false);
  const [sizerId, setSizerId] = useState<string | null>(null);
  const [tenderPicker, setTenderPicker] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<FoodItem | null>(null);
  const [myFoods, setMyFoods] = useState<FoodItem[]>([]);
  const [recentFoods, setRecentFoods] = useState<FoodItem[]>([]);
  const [frequentFoods, setFrequentFoods] = useState<FoodItem[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<FoodItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [showSearchCreateFood, setShowSearchCreateFood] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBarcodeCreateFood, setShowBarcodeCreateFood] = useState(false);
  const [barcodeNotFound, setBarcodeNotFound] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      db.customFoods.toArray().then(setMyFoods);
      db.recentFoods.orderBy('usedAt').reverse().limit(10).toArray().then(setRecentFoods);
      getFavoriteFoods().then(favs => {
        setFavoriteFoods(favs);
        setFavoriteIds(new Set(favs.map(f => f.id)));
      });
      db.dailyLogs.toArray().then(logs => {
        const counts = new Map<string, { food: FoodItem; count: number }>();
        for (const log of logs) {
          for (const entries of Object.values(log.meals)) {
            for (const entry of entries) {
              const existing = counts.get(entry.food.id);
              if (existing) existing.count++;
              else counts.set(entry.food.id, { food: entry.food, count: 1 });
            }
          }
        }
        const top = Array.from(counts.values())
          .filter(c => c.count > 1)
          .sort((a, b) => b.count - a.count)
          .slice(0, 8)
          .map(c => c.food);
        setFrequentFoods(top);
      });
    }
  }, [isOpen]);

  const handleToggleFavorite = useCallback(async (food: FoodItem) => {
    const nowFav = await toggleFavorite(food.id);
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (nowFav) next.add(food.id); else next.delete(food.id);
      return next;
    });
    setFavoriteFoods(prev => nowFav ? [food, ...prev] : prev.filter(f => f.id !== food.id));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowSearchCreateFood(false);
    if (query.trim()) setSelectedCategory(null);
    if (!query.trim()) { setResults([]); setApiError(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setApiError(false);
      try {
        // Always search local custom/seeded foods first (works offline) — ranked
        // by relevance (exact/alias/brand/token/fuzzy match), not insertion order.
        const allCustom = await db.customFoods.toArray();
        const candidates = allCustom.filter(f => !isIngredient(f));
        const localMatches = rankFoods(query, candidates);

        // Try remote APIs — silently handle failures
        let remoteResults: FoodItem[] = [];
        try {
          remoteResults = await searchFoods(query);
        } catch {
          if (localMatches.length === 0) setApiError(true);
        }

        // Merge: ranked local first (feels faster, works offline), then remote
        const remoteDeduped = remoteResults.filter(r => !localMatches.find(l => l.id === r.id));
        setResults([...localMatches, ...remoteDeduped].slice(0, 30));
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const relatedTerms = (query.trim() && !loading && results.length === 0)
    ? suggestRelatedTerms(query, myFoods)
    : [];

  const availableCategories = BROWSABLE_CATEGORIES.filter(cat => myFoods.some(f => f.category === cat));
  const categoryResults = selectedCategory
    ? myFoods.filter(f => f.category === selectedCategory && !isIngredient(f))
    : [];

  const handleScan = useCallback(async (barcode: string) => {
    setScanning(false);
    setLoading(true);
    setBarcodeNotFound(false);
    setShowBarcodeCreateFood(false);
    try {
      const food = await lookupBarcode(barcode);
      if (food) {
        setBarcodeResult(food);
      } else {
        setScannedBarcode(barcode);
        setBarcodeNotFound(true);
      }
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
    setDonutBuilder(false);
    setSizerId(null);
    onClose();
  };

  const handleSelectFood = (food: FoodItem) => {
    if (food.id === 'seed-dun-donut-builder') {
      setDonutBuilder(true);
      return;
    }
    if (food.id === 'seed-ws-tenders-sizer') {
      setTenderPicker(true);
      return;
    }
    const sizer = findSizerForFood(food);
    if (sizer) {
      setSizerId(sizer);
      return;
    }
    const info = getBuilderInfo(food);
    if (info) {
      setBuilderInfo(info);
    } else {
      setTab('search');
      setSelected(food);
    }
  };

  if (!isOpen) return null;

  const mealLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-hidden overscroll-none">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-brand-400/20">
        <button
          onClick={() => { builderInfo ? setBuilderInfo(null) : donutBuilder ? setDonutBuilder(false) : sizerId ? setSizerId(null) : tenderPicker ? setTenderPicker(false) : onClose(); }}
          className="p-2 rounded-full hover:bg-surface-raised"
        >
          {(builderInfo || donutBuilder || sizerId || tenderPicker)
            ? <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            : <XMarkIcon className="w-6 h-6 text-gray-400" />
          }
        </button>
        <h2 className="flex-1 text-lg font-semibold text-gray-900">
          {tenderPicker
            ? "Wingstop — Chicken Tenders"
            : sizerId
            ? `${SIZE_FAMILIES[sizerId]?.brand} — Pick a Size`
            : donutBuilder ? "Dunkin' Donut Builder"
            : builderInfo ? `${builderInfo.brandName} Builder`
            : `Add to ${mealLabel}`}
        </h2>
      </div>

      {/* Size Picker view */}
      {sizerId && (
        <SizePicker
          sizerId={sizerId}
          onAdd={handleBuilderAdd}
          onCancel={() => setSizerId(null)}
        />
      )}

      {/* Tender Picker view */}
      {tenderPicker && (
        <TenderPicker
          onAdd={handleBuilderAdd}
          onCancel={() => setTenderPicker(false)}
        />
      )}

      {/* Donut Builder view */}
      {!sizerId && !tenderPicker && donutBuilder && (
        <DonutBuilder
          onAdd={handleBuilderAdd}
          onCancel={() => setDonutBuilder(false)}
        />
      )}

      {/* Bowl Builder view */}
      {!sizerId && !tenderPicker && !donutBuilder && builderInfo && (
        <BowlBuilder
          brandId={builderInfo.brandId}
          brandName={builderInfo.brandName}
          onAdd={handleBuilderAdd}
          onCancel={() => setBuilderInfo(null)}
        />
      )}

      {/* Normal search view */}
      {!builderInfo && !donutBuilder && !sizerId && !tenderPicker && (
      <>
      {/* Tabs */}
      <div className="flex justify-center p-4 border-b border-gray-100">
        <div className="bg-gray-100 rounded-2xl p-1 flex gap-1 w-full max-w-md">
          {([['search', 'Search', MagnifyingGlassIcon], ['barcode', 'Barcode', QrCodeIcon], ['myfoods', 'My Foods', BookmarkIcon], ['restaurants', 'Brands', BuildingStorefrontIcon]] as const).map(([t, label, Icon]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-all rounded-xl ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search Tab */}
        {tab === 'search' && (
          <>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                className="input-ios pl-10"
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
                {!loading && !query && availableCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(prev => prev === cat ? null : cat)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                          selectedCategory === cat ? 'bg-brand-gradient text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                {!loading && !query && selectedCategory && (
                  <div>
                    {categoryResults.length === 0 ? (
                      <div className="text-center text-gray-500 py-6 text-sm">No {selectedCategory.toLowerCase()} saved yet</div>
                    ) : categoryResults.map(food => (
                      <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={favoriteIds.has(food.id)} onToggleFav={handleToggleFavorite} />
                    ))}
                  </div>
                )}
                {!loading && !query && !selectedCategory && recentFoods.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Recent</div>
                    {recentFoods.filter(f => !isIngredient(f)).map(food => (
                      <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={favoriteIds.has(food.id)} onToggleFav={handleToggleFavorite} />
                    ))}
                  </div>
                )}
                {!loading && !query && !selectedCategory && frequentFoods.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Frequently Logged</div>
                    {frequentFoods.filter(f => !isIngredient(f)).map(food => (
                      <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={favoriteIds.has(food.id)} onToggleFav={handleToggleFavorite} />
                    ))}
                  </div>
                )}
                {!loading && results.filter(f => !isIngredient(f)).map(food => (
                  <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={favoriteIds.has(food.id)} onToggleFav={handleToggleFavorite} />
                ))}
                {!loading && query && results.length === 0 && !showSearchCreateFood && (
                  <div className="text-center py-8 space-y-3">
                    {apiError ? (
                      <>
                        <div className="text-yellow-400 font-medium">Food databases are temporarily unavailable</div>
                        <div className="text-gray-500 text-sm">Try the Foods tab to search your saved items, or add a custom food.</div>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-500">No exact matches for "{query}"</div>
                        {relatedTerms.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-xs text-gray-500 self-center">Try:</span>
                            {relatedTerms.map(term => (
                              <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-700"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    <button
                      onClick={() => setShowSearchCreateFood(true)}
                      className="mt-2 px-5 py-2.5 bg-brand-gradient text-white rounded-xl font-semibold text-sm"
                    >
                      + Create Custom Food
                    </button>
                  </div>
                )}
                {!loading && query && results.length === 0 && showSearchCreateFood && (
                  <CreateFoodForm
                    initialName={query}
                    onSave={async (food) => {
                      await db.customFoods.put(food);
                      setShowSearchCreateFood(false);
                      setSelected(food);
                    }}
                    onCancel={() => setShowSearchCreateFood(false)}
                  />
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
            {!barcodeResult && barcodeNotFound && !showBarcodeCreateFood && (
              <div className="text-center space-y-4 py-8">
                <QrCodeIcon className="w-16 h-16 text-gray-600 mx-auto" />
                <p className="text-gray-900 font-medium">Product not found</p>
                <p className="text-gray-400 text-sm">Barcode {scannedBarcode} isn't in any food database we checked.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { setBarcodeNotFound(false); setScanning(true); }}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm"
                  >
                    Scan Again
                  </button>
                  <button
                    onClick={() => setShowBarcodeCreateFood(true)}
                    className="px-5 py-2.5 bg-brand-gradient text-white rounded-xl font-semibold text-sm"
                  >
                    + Create Custom Food
                  </button>
                </div>
              </div>
            )}
            {!barcodeResult && barcodeNotFound && showBarcodeCreateFood && (
              <CreateFoodForm
                initialBarcode={scannedBarcode}
                onSave={async (food) => {
                  await db.customFoods.put(food);
                  setShowBarcodeCreateFood(false);
                  setBarcodeNotFound(false);
                  setBarcodeResult(food);
                }}
                onCancel={() => setShowBarcodeCreateFood(false)}
              />
            )}
            {!barcodeResult && !barcodeNotFound && !scanning && (
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
                  className="mb-4 text-sm text-gray-400 hover:text-gray-700"
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
            {!selected && favoriteFoods.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Favorites</div>
                {favoriteFoods.filter(f => !isIngredient(f)).map(food => (
                  <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={true} onToggleFav={handleToggleFavorite} />
                ))}
              </div>
            )}
            {!selected && myFoods.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <BookmarkIcon className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                <p>No custom foods yet</p>
                <p className="text-xs mt-1">Create foods in the Foods section</p>
              </div>
            )}
            {!selected && myFoods.length > 0 && (
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">All Foods</div>
            )}
            {!selected && myFoods.filter(f => !isIngredient(f)).map(food => (
              <FoodRow key={food.id} food={food} onSelect={handleSelectFood} isFav={favoriteIds.has(food.id)} onToggleFav={handleToggleFavorite} />
            ))}
          </div>
        )}

        {tab === 'restaurants' && (
          <RestaurantBrowse onSelect={handleSelectFood} />
        )}
      </div>
      </> /* end normal search view */
      )}
    </div>
  );
}

function FoodRow({ food, onSelect, isFav, onToggleFav }: {
  food: FoodItem;
  onSelect: (f: FoodItem) => void;
  isFav?: boolean;
  onToggleFav?: (f: FoodItem) => void;
}) {
  const family = SIZE_FAMILIES[food.id];
  if (family) {
    return (
      <button
        onClick={() => onSelect(food)}
        className="mb-2 w-full flex items-center gap-3 px-4 py-3 bg-brand-400/10 border border-brand-400/40 rounded-xl hover:bg-brand-400/20 transition-colors text-left"
      >
        <span className="text-2xl">{family.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-brand-600">{family.itemName}</div>
          <div className="text-xs text-gray-500">{family.brand} · {family.sizes.map(s => s.label).join(' / ')}</div>
        </div>
        <div className="shrink-0 text-xs font-semibold text-brand-500 bg-brand-400/20 px-2.5 py-1 rounded-full">
          Pick Size →
        </div>
      </button>
    );
  }
  return (
    <div className="mb-2">
      <FoodItemRow
        food={food}
        onTap={() => onSelect(food)}
        variant="card"
        actions={onToggleFav ? (
          <button onClick={() => onToggleFav(food)} className="p-1.5">
            {isFav
              ? <HeartIconSolid className="w-5 h-5 text-rose-500" />
              : <HeartIcon className="w-5 h-5 text-gray-400" />}
          </button>
        ) : undefined}
      />
    </div>
  );
}
