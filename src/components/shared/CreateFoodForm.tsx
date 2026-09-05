import { useState } from 'react';
import type { FoodItem } from '../../types';

interface Props {
  onSave: (food: FoodItem) => void;
  onCancel: () => void;
  initialName?: string;
  initialBarcode?: string;
}

export default function CreateFoodForm({ onSave, onCancel, initialName = '', initialBarcode }: Props) {
  const [form, setForm] = useState({
    name: initialName, brand: '', servingAmount: '100', servingUnit: 'g',
    calories: '', protein: '', carbs: '', fat: '',
    sugar: '', fiber: '', sodium: '', cholesterol: '',
    saturatedFat: '', vitaminA: '', vitaminC: '', vitaminD: '',
    vitaminB12: '', iron: '', calcium: '', potassium: '',
    caffeine: '', alcohol: '', addedSugar: '', transFat: '',
    magnesium: '', zinc: '', omega3: '', folate: '',
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
      barcode: initialBarcode,
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
        caffeine: n(form.caffeine),
        alcohol: n(form.alcohol),
        addedSugar: n(form.addedSugar),
        transFat: n(form.transFat),
        magnesium: n(form.magnesium),
        zinc: n(form.zinc),
        omega3: n(form.omega3),
        folate: n(form.folate),
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
        className="w-full bg-gray-100 border border-brand-400/20 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-brand-500"
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <div className="card p-4 space-y-4">
      <h3 className="font-semibold text-gray-900">Create Custom Food</h3>
      {initialBarcode && (
        <p className="text-xs text-gray-500">Barcode {initialBarcode} — not found in any food database. Fill in the label details below to save it.</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {field('name', 'Food Name *', 'e.g. Chicken Breast')}
        {field('brand', 'Brand', 'optional')}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">{field('servingAmount', 'Serving Size')}</div>
        <div className="flex-1">{field('servingUnit', 'Unit', 'g')}</div>
      </div>
      <div className="border-t border-gray-100 pt-3">
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
          {field('caffeine', 'Caffeine (mg)')}
          {field('alcohol', 'Alcohol (g)')}
          {field('addedSugar', 'Added Sugar (g)')}
          {field('transFat', 'Trans Fat (g)')}
          {field('magnesium', 'Magnesium (mg)')}
          {field('zinc', 'Zinc (mg)')}
          {field('omega3', 'Omega-3 (g)')}
          {field('folate', 'Folate (mcg)')}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
        <button onClick={handleSave} disabled={!form.name} className="flex-1 py-3 bg-brand-gradient disabled:bg-gray-100 disabled:text-gray-500 text-gray-900 rounded-xl font-semibold">Save Food</button>
      </div>
    </div>
  );
}
