import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { db } from '../db/database';
import { searchFoods } from '../utils/foodApi';
import type { FoodItem, Recipe } from '../types';
import { emptyNutrition } from '../utils/foodApi';

type Tab = 'foods' | 'recipes';

function CreateFoodForm({ onSave, onCancel }: { onSave: (food: FoodItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: '', brand: '', servingAmount: '100', servingUnit: 'g',
    calories: '', protein: '', carbs: '', fat: '',
    sugar: '', fiber: '', sodium: '', cholesterol: '',
    saturatedFat: '', vitaminA: '', vitaminC: '', vitaminD: '',
    vitaminB12: '', iron: '', calcium: '', potassium: '',
  });

  const n = (v: string) => parseFloat(v) || 0;

  const handleSave = () => {
    if (!form.name) return;
    const food: FoodItem = {
      id: `custom-${Date.now()}`,
      name: form.name,
      brand: form.brand || undefined,
      servingSizeG: n(form.servingAmount),
      servingLabel: `${form.servingAmount}${form.servingUnit}`,
      source: 'custom',
      nutrition: {
        calories: n(form.calories),
        protein: n(form.protein),
        carbs: n(form.carbs),
        fat: n(form.fat),
        sugar: n(form.sugar),
        fiber: n(form.fiber),
        sodium: n(form.sodium),
        cholesterol: n(form.cholesterol),
        saturatedFat: n(form.saturatedFat),
        vitaminA: n(form.vitaminA),
        vitaminC: n(form.vitaminC),
        vitaminD: n(form.vitaminD),
        vitaminB12: n(form.vitaminB12),
        iron: n(form.iron),
        calcium: n(form.calcium),
        potassium: n(form.potassium),
      }
    };
    onSave(food);
  };

  const field = (key: keyof typeof form, label: string, placeholder = '0') => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type={key === 'name' || key === 'brand' || key === 'servingUnit' ? 'text' : 'number'}
        step="0.1"
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-white">Create Custom Food</h3>
      <div className="grid grid-cols-2 gap-3">
        {field('name', 'Food Name *', 'e.g. Chicken Breast')}
        {field('brand', 'Brand', 'optional')}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">{field('servingAmount', 'Serving Size')}</div>
        <div className="flex-1">{field('servingUnit', 'Unit', 'g')}</div>
      </div>
      <div className="border-t border-gray-700 pt-3">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Nutrition per serving</div>
        <div className="grid grid-cols-2 gap-3">
          {field('calories', 'Calories')}
          {field('protein', 'Protein (g)')}
          {field('carbs', 'Carbs (g)')}
          {field('fat', 'Fat (g)')}
          {field('sugar', 'Sugar (g)')}
          {field('fiber', 'Fiber (g)')}
          {field('sodium', 'Sodium (mg)')}
          {field('cholesterol', 'Cholesterol (mg)')}
          {field('saturatedFat', 'Saturated Fat (g)')}
          {field('vitaminA', 'Vitamin A (mcg)')}
          {field('vitaminC', 'Vitamin C (mg)')}
          {field('vitaminD', 'Vitamin D (mcg)')}
          {field('iron', 'Iron (mg)')}
          {field('calcium', 'Calcium (mg)')}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-xl font-medium">Cancel</button>
        <button onClick={handleSave} disabled={!form.name} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl font-semibold">Save Food</button>
      </div>
    </div>
  );
}

function RecipeBuilder({ onSave, onCancel }: { onSave: (recipe: Recipe) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [servings, setServings] = useState(1);
  const [ingredients, setIngredients] = useState<{ food: FoodItem; servings: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const results = await searchFoods(searchQuery);
      setSearchResults(results.slice(0, 10));
    } finally {
      setSearching(false);
    }
  };

  const addIngredient = (food: FoodItem) => {
    setIngredients(prev => [...prev, { food, servings: 1 }]);
    setSearchResults([]);
    setSearchQuery('');
  };

  const totalNutrition = ingredients.reduce((acc, ing) => ({
    calories: acc.calories + ing.food.nutrition.calories * ing.servings,
    protein: acc.protein + ing.food.nutrition.protein * ing.servings,
    carbs: acc.carbs + ing.food.nutrition.carbs * ing.servings,
    fat: acc.fat + ing.food.nutrition.fat * ing.servings,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const perServing = {
    calories: Math.round(totalNutrition.calories / servings),
    protein: Math.round(totalNutrition.protein / servings),
    carbs: Math.round(totalNutrition.carbs / servings),
    fat: Math.round(totalNutrition.fat / servings),
  };

  const handleSave = () => {
    if (!name || ingredients.length === 0) return;
    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      name,
      servings,
      ingredients,
      notes: notes || undefined,
    };
    onSave(recipe);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-white">Create Recipe</h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1">Recipe Name *</label>
          <input
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g. Chicken Stir Fry"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="w-24">
          <label className="text-xs text-gray-400 block mb-1">Servings</label>
          <input
            type="number"
            min="1"
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={servings}
            onChange={e => setServings(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      {/* Ingredient search */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">Add Ingredient</label>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl text-sm"
          >
            {searching ? '...' : 'Search'}
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-2 bg-gray-900 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
            {searchResults.map(food => (
              <button
                key={food.id}
                onClick={() => addIngredient(food)}
                className="w-full text-left px-3 py-2 hover:bg-gray-700 border-b border-gray-800 last:border-0"
              >
                <div className="text-sm text-white">{food.name}</div>
                <div className="text-xs text-gray-500">{food.servingLabel} · {Math.round(food.nutrition.calories)} cal</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients list */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Ingredients</div>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2">
              <div className="flex-1 text-sm text-white truncate">{ing.food.name}</div>
              <input
                type="number"
                step="0.25"
                min="0.25"
                className="w-16 bg-gray-700 rounded-lg px-2 py-1 text-white text-sm text-center"
                value={ing.servings}
                onChange={e => {
                  const s = parseFloat(e.target.value) || 0.25;
                  setIngredients(prev => prev.map((x, j) => j === i ? { ...x, servings: s } : x));
                }}
              />
              <span className="text-xs text-gray-500">srv</span>
              <button
                onClick={() => setIngredients(prev => prev.filter((_, j) => j !== i))}
                className="text-gray-600 hover:text-red-400"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Per-serving preview */}
      {ingredients.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-3">
          <div className="text-xs text-gray-500 mb-2">Per serving ({servings} servings total)</div>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div><div className="text-white font-bold">{perServing.calories}</div><div className="text-xs text-gray-500">cal</div></div>
            <div><div className="text-blue-400 font-semibold">{perServing.protein}g</div><div className="text-xs text-gray-500">protein</div></div>
            <div><div className="text-amber-400 font-semibold">{perServing.carbs}g</div><div className="text-xs text-gray-500">carbs</div></div>
            <div><div className="text-rose-400 font-semibold">{perServing.fat}g</div><div className="text-xs text-gray-500">fat</div></div>
          </div>
        </div>
      )}

      <div>
        <label className="text-xs text-gray-400 block mb-1">Notes (optional)</label>
        <textarea
          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-emerald-500"
          rows={2}
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-xl font-medium">Cancel</button>
        <button
          onClick={handleSave}
          disabled={!name || ingredients.length === 0}
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl font-semibold"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
}

export default function CustomFoods() {
  const [tab, setTab] = useState<Tab>('foods');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showCreateFood, setShowCreateFood] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);

  useEffect(() => {
    db.customFoods.toArray().then(setFoods);
    db.recipes.toArray().then(setRecipes);
  }, []);

  const handleSaveFood = async (food: FoodItem) => {
    await db.customFoods.put(food);
    setFoods(await db.customFoods.toArray());
    setShowCreateFood(false);
  };

  const handleDeleteFood = async (id: string) => {
    await db.customFoods.delete(id);
    setFoods(prev => prev.filter(f => f.id !== id));
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    await db.recipes.put(recipe);
    // Also save as a FoodItem so it can be added to meals
    const servings = recipe.servings || 1;
    const totalNutrition = recipe.ingredients.reduce((acc, ing) => {
      const n = ing.food.nutrition;
      const s = ing.servings;
      return {
        calories: acc.calories + n.calories * s,
        protein: acc.protein + n.protein * s,
        carbs: acc.carbs + n.carbs * s,
        fat: acc.fat + n.fat * s,
        sugar: acc.sugar + n.sugar * s,
        fiber: acc.fiber + n.fiber * s,
        sodium: acc.sodium + n.sodium * s,
        cholesterol: acc.cholesterol + n.cholesterol * s,
        saturatedFat: acc.saturatedFat + n.saturatedFat * s,
        vitaminA: acc.vitaminA + n.vitaminA * s,
        vitaminC: acc.vitaminC + n.vitaminC * s,
        vitaminD: acc.vitaminD + n.vitaminD * s,
        vitaminB12: acc.vitaminB12 + n.vitaminB12 * s,
        iron: acc.iron + n.iron * s,
        calcium: acc.calcium + n.calcium * s,
        potassium: acc.potassium + n.potassium * s,
      };
    }, emptyNutrition());

    const foodItem: FoodItem = {
      id: `recipe-food-${recipe.id}`,
      name: recipe.name,
      servingSizeG: 1,
      servingLabel: '1 serving',
      source: 'custom',
      nutrition: {
        calories: Math.round(totalNutrition.calories / servings),
        protein: Math.round(totalNutrition.protein / servings * 10) / 10,
        carbs: Math.round(totalNutrition.carbs / servings * 10) / 10,
        fat: Math.round(totalNutrition.fat / servings * 10) / 10,
        sugar: Math.round(totalNutrition.sugar / servings * 10) / 10,
        fiber: Math.round(totalNutrition.fiber / servings * 10) / 10,
        sodium: Math.round(totalNutrition.sodium / servings),
        cholesterol: Math.round(totalNutrition.cholesterol / servings),
        saturatedFat: Math.round(totalNutrition.saturatedFat / servings * 10) / 10,
        vitaminA: Math.round(totalNutrition.vitaminA / servings * 10) / 10,
        vitaminC: Math.round(totalNutrition.vitaminC / servings * 10) / 10,
        vitaminD: Math.round(totalNutrition.vitaminD / servings * 10) / 10,
        vitaminB12: Math.round(totalNutrition.vitaminB12 / servings * 10) / 10,
        iron: Math.round(totalNutrition.iron / servings * 10) / 10,
        calcium: Math.round(totalNutrition.calcium / servings),
        potassium: Math.round(totalNutrition.potassium / servings),
      }
    };
    await db.customFoods.put(foodItem);
    setRecipes(await db.recipes.toArray());
    setFoods(await db.customFoods.toArray());
    setShowCreateRecipe(false);
  };

  const handleDeleteRecipe = async (id: string) => {
    await db.recipes.delete(id);
    await db.customFoods.delete(`recipe-food-${id}`);
    setRecipes(prev => prev.filter(r => r.id !== id));
    setFoods(await db.customFoods.toArray());
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-white pt-2">My Foods</h1>

      {/* Tabs */}
      <div className="flex bg-gray-800 rounded-xl p-1">
        {(['foods', 'recipes'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Foods Tab */}
      {tab === 'foods' && (
        <div className="space-y-3">
          {showCreateFood ? (
            <CreateFoodForm onSave={handleSaveFood} onCancel={() => setShowCreateFood(false)} />
          ) : (
            <button
              onClick={() => setShowCreateFood(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-emerald-700 text-emerald-400 rounded-xl hover:bg-emerald-900/20"
            >
              <PlusIcon className="w-5 h-5" />
              Create Custom Food
            </button>
          )}
          {foods.length === 0 && !showCreateFood && (
            <div className="text-center text-gray-500 py-8">No custom foods yet</div>
          )}
          {foods.map(food => (
            <div key={food.id} className="bg-gray-800 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{food.name}</div>
                {food.brand && <div className="text-xs text-gray-500">{food.brand}</div>}
                <div className="text-xs text-gray-500">
                  {food.servingLabel} · {Math.round(food.nutrition.calories)} cal ·
                  P:{Math.round(food.nutrition.protein)}g C:{Math.round(food.nutrition.carbs)}g F:{Math.round(food.nutrition.fat)}g
                </div>
              </div>
              <button onClick={() => handleDeleteFood(food.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recipes Tab */}
      {tab === 'recipes' && (
        <div className="space-y-3">
          {showCreateRecipe ? (
            <RecipeBuilder onSave={handleSaveRecipe} onCancel={() => setShowCreateRecipe(false)} />
          ) : (
            <button
              onClick={() => setShowCreateRecipe(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-emerald-700 text-emerald-400 rounded-xl hover:bg-emerald-900/20"
            >
              <PlusIcon className="w-5 h-5" />
              Create Recipe
            </button>
          )}
          {recipes.length === 0 && !showCreateRecipe && (
            <div className="text-center text-gray-500 py-8">No recipes yet</div>
          )}
          {recipes.map(recipe => {
            const totalCal = recipe.ingredients.reduce((s, i) => s + i.food.nutrition.calories * i.servings, 0);
            return (
              <div key={recipe.id} className="bg-gray-800 rounded-xl p-3 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium">{recipe.name}</div>
                  <div className="text-xs text-gray-500">{recipe.servings} servings · {Math.round(totalCal / recipe.servings)} cal/serving</div>
                  <div className="text-xs text-gray-600 mt-1">{recipe.ingredients.length} ingredients</div>
                  {recipe.notes && <div className="text-xs text-gray-500 mt-1 italic">{recipe.notes}</div>}
                </div>
                <button onClick={() => handleDeleteRecipe(recipe.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
