import { useState, useEffect } from 'react';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FoodItemRow from '../shared/FoodItemRow';
import { db } from '../../db/database';
import type { FoodItem } from '../../types';

interface Props {
  onSelect: (food: FoodItem) => void;
}

const RESTAURANT_GROUPS = [
  {
    category: 'Fast Food',
    brands: [
      "McDonald's",
      "Burger King",
      "Wendy's",
      "Chick-fil-A",
      "Culver's",
      "Sonic",
      "Arby's",
      "Dairy Queen",
      "Jack in the Box",
      "Five Guys",
      "Shake Shack",
      "Whataburger",
      "Hardee's / Carl's Jr.",
      "Raising Cane's",
      "Wingstop",
      "Popeyes",
      "KFC",
      "Jersey Mike's",
      "Jimmy John's",
      "Subway",
      "Panera Bread",
    ],
  },
  {
    category: 'Tex-Mex & Pizza',
    brands: [
      'Chipotle',
      'Taco Bell',
      'Pancheros',
      "Domino's",
      'Pizza Hut',
      "Little Caesars",
      "Papa John's",
      'Pizza Ranch',
      'Panda Express',
    ],
  },
  {
    category: 'Coffee & Breakfast',
    brands: ["Starbucks", "Dunkin'", "Denny's", 'Waffle House', 'IHOP'],
  },
  {
    category: 'Local & Regional',
    brands: [
      "Charlotte's Kitchen",
      "B-Bop's",
      'Maid-Rite',
      'Tasty Tacos',
      "Abelardo's",
    ],
  },
  {
    category: 'Convenience Stores',
    brands: [
      '7-Eleven',
      'Wawa',
      'Sheetz',
      'QuikTrip',
      'Kwik Trip / Kwik Star',
      "Casey's General Store",
    ],
  },
];

function RestaurantBrowse({ onSelect }: Props) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [brandItemCount, setBrandItemCount] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Hide raw ingredient entries and builders
  function isIngredient(food: FoodItem): boolean {
    return food.id.includes('-ing-');
  }

  function isBuilder(food: FoodItem): boolean {
    return food.id.endsWith('-builder') || food.id.endsWith('-sizer');
  }

  // Load item counts for all brands on mount
  useEffect(() => {
    async function loadItemCounts() {
      const counts: Record<string, number> = {};
      for (const group of RESTAURANT_GROUPS) {
        for (const brand of group.brands) {
          const count = await db.customFoods
            .where('brand')
            .equals(brand)
            .count();
          counts[brand] = count;
        }
      }
      setBrandItemCount(counts);
    }
    loadItemCounts();
  }, []);

  // Load items for selected brand
  useEffect(() => {
    if (!selectedBrand) return;

    async function loadItems() {
      setLoading(true);
      const brandItems = await db.customFoods
        .where('brand')
        .equals(selectedBrand as string)
        .toArray();
      const filtered = brandItems.filter(
        (f) => !isIngredient(f) && !isBuilder(f)
      );
      setItems(filtered);
      setFilteredItems(filtered);
      setSearchQuery('');
      setLoading(false);
    }
    loadItems();
  }, [selectedBrand]);

  // Filter items by search query
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  // Brand list view
  if (!selectedBrand) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {RESTAURANT_GROUPS.map((group) => (
          <div key={group.category}>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              {group.category}
            </div>
            <div className="space-y-1">
              {group.brands.map((brand) => {
                const count = brandItemCount[brand] || 0;
                return (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-900 font-medium">{brand}</span>
                    <span className="text-xs text-gray-500">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Brand items view
  return (
    <div className="flex flex-col h-full">
      {/* Header with back button */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <button
          onClick={() => setSelectedBrand(null)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-900" />
        </button>
        <div>
          <div className="font-semibold text-gray-900">{selectedBrand}</div>
          <div className="text-xs text-gray-500">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>

      {/* Search input */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-brand-500"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery
              ? `No items found for "${searchQuery}"`
              : 'No items available'}
          </div>
        )}
        {!loading &&
          filteredItems.map((food) => (
            <button
              key={food.id}
              onClick={() => onSelect(food)}
              className="w-full text-left"
            >
              <FoodItemRow food={food} variant="card" />
            </button>
          ))}
      </div>
    </div>
  );
}

export default RestaurantBrowse;
