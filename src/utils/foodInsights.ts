import type { FoodItem } from '../types';

export type InsightSeverity = 'positive' | 'neutral' | 'caution' | 'warning';
export type InsightCategory = 'mood' | 'overconsumption' | 'health';

export interface FoodInsight {
  category: InsightCategory;
  severity: InsightSeverity;
  title: string;
  body: string;
}

export function getFoodInsights(food: FoodItem, servings: number): FoodInsight[] {
  const n = food.nutrition;
  const s = servings;

  const calories      = n.calories      * s;
  const protein       = n.protein       * s;
  const carbs         = n.carbs         * s;   // eslint-disable-line @typescript-eslint/no-unused-vars
  const fat           = n.fat           * s;
  const sugar         = n.sugar         * s;
  const fiber         = n.fiber         * s;
  const sodium        = n.sodium        * s;
  const saturatedFat  = n.saturatedFat  * s;
  const cholesterol   = n.cholesterol   * s;
  const caffeine      = n.caffeine      * s;
  const alcohol       = n.alcohol       * s;
  const addedSugar    = n.addedSugar    * s;
  const transFat      = n.transFat      * s;
  const magnesium     = n.magnesium     * s;
  const zinc          = n.zinc          * s;
  const omega3        = n.omega3        * s;
  const folate        = n.folate        * s;
  const netCarbs      = (n.carbs - n.fiber) * s;

  const insights: FoodInsight[] = [];

  // ── Mood insights ──────────────────────────────────────────────────────────
  if (sugar > 25) {
    insights.push({
      category: 'mood',
      severity: 'caution',
      title: 'High sugar load',
      body: 'Rapidly absorbed sugars trigger a dopamine response, often followed by an energy dip 1–2 hours later as insulin clears glucose from the bloodstream.',
    });
  } else if (sugar >= 10 && sugar <= 25) {
    insights.push({
      category: 'mood',
      severity: 'neutral',
      title: 'Moderate sugar',
      body: 'This amount of sugar provides a quick energy source. Pairing with protein or fiber can slow absorption and smooth out the energy curve.',
    });
  }

  if (protein >= 25) {
    insights.push({
      category: 'mood',
      severity: 'positive',
      title: 'Protein boosts alertness',
      body: 'High protein intake increases tyrosine availability, a precursor to dopamine and norepinephrine, which support focus and motivation.',
    });
  }

  if (fiber >= 6) {
    insights.push({
      category: 'mood',
      severity: 'positive',
      title: 'Fiber supports stable energy',
      body: 'Dietary fiber slows carbohydrate absorption, helping maintain steady blood glucose and avoiding the highs and lows of rapid sugar spikes.',
    });
  }

  if (calories >= 700) {
    insights.push({
      category: 'mood',
      severity: 'neutral',
      title: 'Large calorie load',
      body: 'High-calorie meals trigger serotonin release, which can produce a calming or drowsy feeling 20–30 minutes after eating.',
    });
  }

  if (sodium >= 1500) {
    insights.push({
      category: 'mood',
      severity: 'caution',
      title: 'High sodium',
      body: 'Very high sodium intake can cause temporary water retention and, in sensitive individuals, affect blood pressure and energy levels.',
    });
  }

  if (caffeine >= 300) {
    insights.push({
      category: 'mood',
      severity: 'warning',
      title: 'Very high caffeine',
      body: 'This exceeds the amount in a standard energy drink (300mg). At this level caffeine strongly activates the central nervous system — improving alertness but potentially causing anxiety, jitteriness, or disrupted sleep if consumed after 2pm.',
    });
  } else if (caffeine >= 150) {
    insights.push({
      category: 'mood',
      severity: 'caution',
      title: 'Significant caffeine',
      body: 'Caffeine blocks adenosine receptors, promoting alertness. This amount is comparable to 1–2 cups of coffee. Effects peak 30–60 min after consumption and can affect sleep quality if consumed within 6 hours of bedtime.',
    });
  } else if (caffeine > 0) {
    insights.push({
      category: 'mood',
      severity: 'neutral',
      title: 'Mild caffeine',
      body: 'A low-to-moderate caffeine dose. Unlikely to cause significant side effects in most people but worth tracking toward the 400mg/day guideline.',
    });
  }

  if (alcohol > 14) {
    insights.push({
      category: 'mood',
      severity: 'warning',
      title: 'High alcohol content',
      body: 'This amount of alcohol significantly impacts GABA and glutamate neurotransmitter systems, causing sedation and impairing judgment and motor coordination.',
    });
  } else if (alcohol > 0) {
    insights.push({
      category: 'mood',
      severity: 'caution',
      title: 'Contains alcohol',
      body: 'Alcohol is a CNS depressant. Even moderate amounts affect sleep quality (reduces REM sleep) and impair coordination and judgment.',
    });
  }

  // ── Overconsumption insights ───────────────────────────────────────────────
  if (sugar > 20 && fat > 15) {
    insights.push({
      category: 'overconsumption',
      severity: 'warning',
      title: 'High palatability combination',
      body: 'Foods combining high sugar and fat activate dopamine reward pathways more strongly than either alone — a pattern found in most hyperpalatable engineered foods that can make portion control harder.',
    });
  } else if (sugar > 20 && fat <= 15) {
    insights.push({
      category: 'overconsumption',
      severity: 'caution',
      title: 'High sugar drives reward response',
      body: 'High sugar content activates opioid and dopamine receptors, which can reinforce the behavior of eating the food again regardless of hunger.',
    });
  }

  if (sodium >= 1200) {
    insights.push({
      category: 'overconsumption',
      severity: 'caution',
      title: 'Sodium enhances palatability',
      body: 'Sodium amplifies flavor signals in the brain, which can reduce satiety cues and make it easier to eat past the point of fullness.',
    });
  }

  if (fiber >= 5 && protein >= 15) {
    insights.push({
      category: 'overconsumption',
      severity: 'positive',
      title: 'Satiating nutritional profile',
      body: 'The combination of fiber and protein is one of the strongest satiety signals — both slow digestion and trigger hormones like GLP-1 that signal fullness to the brain.',
    });
  }

  if (protein >= 30) {
    insights.push({
      category: 'overconsumption',
      severity: 'positive',
      title: 'Very filling',
      body: 'High protein meals significantly raise PYY and GLP-1 levels, hormones that suppress appetite, making overeating after this meal less likely.',
    });
  }

  if (calories >= 600 && fiber < 3 && protein < 15) {
    insights.push({
      category: 'overconsumption',
      severity: 'caution',
      title: 'Low satiety for calorie count',
      body: 'This meal is calorie-dense but low in the nutrients (fiber, protein) that trigger fullness signals, which can lead to feeling hungry again sooner than expected.',
    });
  }

  if (addedSugar > 25) {
    insights.push({
      category: 'overconsumption',
      severity: 'warning',
      title: 'High added sugar',
      body: 'Added sugars (unlike natural sugars in whole foods) are rapidly absorbed and provide no fiber, vitamins, or satiety signals. They strongly activate dopamine reward circuits, promoting repeated consumption independent of hunger.',
    });
  } else if (addedSugar >= 10) {
    insights.push({
      category: 'overconsumption',
      severity: 'caution',
      title: 'Moderate added sugar',
      body: 'This amount of added sugar contributes to daily intake. The AHA recommends no more than 25g/day (women) or 36g/day (men) of added sugar.',
    });
  }

  if (transFat > 0) {
    insights.push({
      category: 'overconsumption',
      severity: 'warning',
      title: 'Contains trans fat',
      body: 'Artificial trans fats are the only dietary fat with no known safe consumption level. Even small amounts are associated with increased LDL, decreased HDL, and cardiovascular disease risk. The FDA has largely banned them but trace amounts remain in some foods.',
    });
  }

  if (omega3 >= 1) {
    insights.push({
      category: 'overconsumption',
      severity: 'positive',
      title: 'Good omega-3 source',
      body: 'Omega-3 fatty acids reduce inflammation, support brain function, and are associated with lower cardiovascular risk. Most Americans consume far too little — this item meaningfully contributes to daily needs.',
    });
  }

  // ── Health insights ────────────────────────────────────────────────────────
  if (saturatedFat >= 12) {
    insights.push({
      category: 'health',
      severity: 'warning',
      title: 'Very high saturated fat',
      body: 'Regularly consuming saturated fat above 13g/day is associated with elevated LDL cholesterol. The American Heart Association recommends keeping saturated fat under 7% of daily calories.',
    });
  } else if (saturatedFat >= 6 && saturatedFat < 12) {
    insights.push({
      category: 'health',
      severity: 'caution',
      title: 'Moderate saturated fat',
      body: 'This serving contributes meaningfully toward the daily recommended limit for saturated fat (~13g/day for a 2,000-calorie diet).',
    });
  }

  if (sodium >= 1500) {
    insights.push({
      category: 'health',
      severity: 'warning',
      title: 'Approaches daily sodium limit',
      body: 'This single item contains over 60% of the 2,300mg daily sodium limit recommended by the FDA. Regular high sodium intake is linked to hypertension.',
    });
  } else if (sodium >= 800 && sodium < 1500) {
    insights.push({
      category: 'health',
      severity: 'caution',
      title: 'Notable sodium content',
      body: 'This contributes a significant portion of the recommended daily sodium intake. Worth tracking if you\'re monitoring blood pressure or water retention.',
    });
  }

  if (fiber >= 8) {
    insights.push({
      category: 'health',
      severity: 'positive',
      title: 'Excellent fiber source',
      body: 'High fiber intake is one of the most evidence-backed dietary patterns for gut health, cardiovascular health, and long-term weight management.',
    });
  }

  if (protein >= 25 && calories <= 500) {
    insights.push({
      category: 'health',
      severity: 'positive',
      title: 'High protein efficiency',
      body: 'Getting this much protein at this calorie level is nutritionally efficient — useful for body composition goals.',
    });
  }

  if (sugar >= 30) {
    insights.push({
      category: 'health',
      severity: 'warning',
      title: 'Very high sugar content',
      body: 'This serving alone exceeds the American Heart Association\'s recommended daily added sugar limit (25g for women, 36g for men).',
    });
  }

  if (cholesterol >= 200) {
    insights.push({
      category: 'health',
      severity: 'caution',
      title: 'High dietary cholesterol',
      body: 'While dietary cholesterol has less impact than once thought, those with cardiovascular risk factors may want to track their daily intake (limit: 300mg/day).',
    });
  }

  if (magnesium >= 100) {
    insights.push({
      category: 'health',
      severity: 'positive',
      title: 'Good magnesium source',
      body: 'Magnesium is involved in over 300 enzymatic reactions including energy production, muscle function, and blood pressure regulation. It\'s one of the most common nutritional deficiencies in Western diets.',
    });
  }

  if (zinc >= 5) {
    insights.push({
      category: 'health',
      severity: 'positive',
      title: 'Good zinc source',
      body: 'Zinc supports immune function, protein synthesis, wound healing, and testosterone production. Animal proteins are the most bioavailable sources.',
    });
  }

  if (folate >= 200) {
    insights.push({
      category: 'health',
      severity: 'positive',
      title: 'High folate',
      body: 'Folate (B9) is essential for DNA synthesis and cell division. It\'s critical for preventing neural tube defects and supports red blood cell production. Many people are deficient.',
    });
  }

  if (transFat > 2) {
    insights.push({
      category: 'health',
      severity: 'warning',
      title: 'High trans fat',
      body: 'This item is high in artificial trans fat. Regular consumption is strongly linked to heart disease, stroke, and type 2 diabetes by raising LDL and lowering HDL cholesterol.',
    });
  }

  if (caffeine >= 400) {
    insights.push({
      category: 'health',
      severity: 'warning',
      title: 'Exceeds daily caffeine limit',
      body: 'This single item meets or exceeds the FDA\'s 400mg/day guideline for healthy adults. Consuming additional caffeine today increases risk of anxiety, insomnia, rapid heart rate, and headaches.',
    });
  }

  if (netCarbs > 60) {
    insights.push({
      category: 'health',
      severity: 'caution',
      title: 'High net carbs',
      body: 'Net carbs (carbs minus fiber) represent the carbohydrates that directly impact blood glucose. This serving is high in net carbs, which may cause a significant blood sugar response depending on the other foods eaten alongside it.',
    });
  }

  if (alcohol > 0) {
    insights.push({
      category: 'health',
      severity: 'caution',
      title: 'Alcohol affects nutrient absorption',
      body: 'Alcohol interferes with the absorption of folate, B12, zinc, and magnesium, and impairs liver function needed for vitamin D activation. Regular alcohol consumption can contribute to deficiencies even with an otherwise good diet.',
    });
  }

  return insights;
}
