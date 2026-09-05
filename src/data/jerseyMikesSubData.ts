// AUTO-GENERATED from Jersey Mike's official live US nutrition API
// (subs.jerseymikes.com/nutrition/{productId}/{sizeId} — the same ingredient-level
// data source that powers their own "build your sub" nutrition calculator).
// Mechanically fetched and summed, not hand-transcribed, across 27 subs x up to 5
// sizes x up to 5 bread/wrap options — verified byte-exact against a user-provided
// real calculator readout (#43 Regular Rosemary Parmesan) before generating.
//
// NOTE: replaces an earlier version sourced from Jersey Mike's Canadian nutrition
// PDF, which was found to run ~9-29% higher on several nutrients for the same item
// and included 3 subs (#64/#65/#66 Portabella) no longer on the current US menu.
import type { SubFamily } from '../components/SizePicker/SubBuilder';

export const JERSEY_MIKES_SUB_FAMILIES: Record<string, SubFamily> = {
  'seed-jm-1-blt': {
    itemName: "BLT",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 480.88, protein: 18.94, carbs: 42.39, fat: 27.11, satFat: 6.16, transFat: 0.15, chol: 36.56, sodium: 1055.14, fiber: 2.69, sugar: 3.7 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 480.04, protein: 19.11, carbs: 42.59, fat: 27.19, satFat: 6.22, transFat: 0.15, chol: 36.56, sodium: 1043.15, fiber: 4.23, sugar: 4.45 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 501.22, protein: 20.39, carbs: 43.05, fat: 28.49, satFat: 7.03, transFat: 0.2, chol: 40.9, sodium: 1108.33, fiber: 3.08, sugar: 3.71 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 454.72, protein: 17.94, carbs: 36.52, fat: 27.21, satFat: 6.12, transFat: 0.15, chol: 36.56, sodium: 985.51, fiber: 2.45, sugar: 3.52 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 788.14, protein: 28.6, carbs: 64.35, fat: 47.77, satFat: 10.31, transFat: 0.3, chol: 58.63, sodium: 1633.37, fiber: 4.06, sugar: 5.73 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 786.86, protein: 28.85, carbs: 64.66, fat: 47.9, satFat: 10.4, transFat: 0.3, chol: 58.63, sodium: 1615.22, fiber: 6.39, sugar: 6.88 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 818.95, protein: 30.8, carbs: 65.34, fat: 49.86, satFat: 11.63, transFat: 0.37, chol: 65.21, sodium: 1713.97, fiber: 4.64, sugar: 5.75 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 748.51, protein: 27.08, carbs: 55.45, fat: 47.93, satFat: 10.26, transFat: 0.29, chol: 58.63, sodium: 1527.88, fiber: 3.7, sugar: 5.46 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 714.41, protein: 22.99, carbs: 45.18, fat: 51.85, satFat: 10.48, transFat: 0.28, chol: 58.63, sodium: 1383.15, fiber: 3.65, sugar: 7.49 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1568.83, protein: 56.76, carbs: 127.1, fat: 95.47, satFat: 20.6, transFat: 0.58, chol: 117.26, sodium: 3262.94, fiber: 7.57, sugar: 10.41 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1566.28, protein: 57.27, carbs: 127.71, fat: 95.73, satFat: 20.78, transFat: 0.58, chol: 117.26, sodium: 3226.63, fiber: 12.22, sugar: 12.71 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1630.46, protein: 61.15, carbs: 129.08, fat: 99.65, satFat: 23.24, transFat: 0.72, chol: 130.42, sodium: 3424.13, fiber: 8.74, sugar: 10.45 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1489.57, protein: 53.72, carbs: 109.3, fat: 95.79, satFat: 20.5, transFat: 0.57, chol: 117.26, sodium: 3051.96, fiber: 6.84, sugar: 9.88 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1421.38, protein: 45.54, carbs: 88.76, fat: 103.63, satFat: 20.94, transFat: 0.55, chol: 117.26, sodium: 2762.5, fiber: 6.75, sugar: 13.94 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 776.35, protein: 25.33, carbs: 55.18, fat: 52.93, satFat: 14, transFat: 0.28, chol: 58.63, sodium: 1510.07, fiber: 4.11, sugar: 6.01 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 796.35, protein: 24.33, carbs: 56.18, fat: 53.93, satFat: 14, transFat: 0.28, chol: 58.63, sodium: 1400.07, fiber: 8.11, sugar: 9.01 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 786.35, protein: 26.33, carbs: 54.18, fat: 53.93, satFat: 14, transFat: 0.28, chol: 58.63, sodium: 1560.07, fiber: 4.11, sugar: 5.01 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 776.35, protein: 25.33, carbs: 54.18, fat: 52.93, satFat: 14, transFat: 0.28, chol: 58.63, sodium: 1580.07, fiber: 4.11, sugar: 5.01 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 796.35, protein: 25.33, carbs: 59.18, fat: 51.93, satFat: 13, transFat: 0.28, chol: 58.63, sodium: 1890.07, fiber: 4.11, sugar: 5.01 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 477.67, protein: 16.9, carbs: 5.3, fat: 44.83, satFat: 9.98, transFat: 0.28, chol: 58.63, sodium: 937.67, fiber: 1.54, sugar: 3.73 },
      ] },
    ],
  },
  'seed-jm-2-jersey-shore': {
    itemName: "Jersey Shore's Favorite",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 480.44, protein: 22.4, carbs: 44.77, fat: 23.96, satFat: 6.18, transFat: 0.24, chol: 35.35, sodium: 1126.51, fiber: 2.91, sugar: 4.82 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 479.6, protein: 22.57, carbs: 44.97, fat: 24.04, satFat: 6.24, transFat: 0.24, chol: 35.35, sodium: 1114.52, fiber: 4.45, sugar: 5.57 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 500.78, protein: 23.85, carbs: 45.43, fat: 25.34, satFat: 7.05, transFat: 0.29, chol: 39.69, sodium: 1179.7, fiber: 3.3, sugar: 4.83 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 454.28, protein: 21.4, carbs: 38.9, fat: 24.06, satFat: 6.14, transFat: 0.24, chol: 35.35, sodium: 1056.88, fiber: 2.67, sugar: 4.64 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 823.6, protein: 39.24, carbs: 68.59, fat: 44.35, satFat: 10.63, transFat: 0.37, chol: 65.68, sodium: 2008.94, fiber: 4.39, sugar: 7.93 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 822.32, protein: 39.49, carbs: 68.9, fat: 44.48, satFat: 10.72, transFat: 0.37, chol: 65.68, sodium: 1990.79, fiber: 6.72, sugar: 9.07 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 854.41, protein: 41.44, carbs: 69.58, fat: 46.44, satFat: 11.95, transFat: 0.44, chol: 72.26, sodium: 2089.54, fiber: 4.97, sugar: 7.95 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 783.97, protein: 37.72, carbs: 59.69, fat: 44.51, satFat: 10.58, transFat: 0.36, chol: 65.68, sodium: 1903.45, fiber: 4.03, sugar: 7.66 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 749.87, protein: 33.63, carbs: 49.42, fat: 48.43, satFat: 10.8, transFat: 0.35, chol: 65.68, sodium: 1758.72, fiber: 3.98, sugar: 9.69 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1554.42, protein: 68.43, carbs: 134.02, fat: 84.02, satFat: 18.87, transFat: 0.61, chol: 107.5, sodium: 3547.78, fiber: 8.17, sugar: 13.68 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1551.87, protein: 68.94, carbs: 134.63, fat: 84.28, satFat: 19.05, transFat: 0.61, chol: 107.5, sodium: 3511.47, fiber: 12.82, sugar: 15.98 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1616.05, protein: 72.82, carbs: 136, fat: 88.2, satFat: 21.51, transFat: 0.75, chol: 120.66, sodium: 3708.97, fiber: 9.34, sugar: 13.72 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1475.16, protein: 65.39, carbs: 116.22, fat: 84.34, satFat: 18.77, transFat: 0.6, chol: 107.5, sodium: 3336.8, fiber: 7.44, sugar: 13.15 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1406.97, protein: 57.21, carbs: 95.68, fat: 92.18, satFat: 19.21, transFat: 0.58, chol: 107.5, sodium: 3047.34, fiber: 7.35, sugar: 17.21 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 804.87, protein: 35.63, carbs: 57.92, fat: 49.43, satFat: 14.3, transFat: 0.35, chol: 65.68, sodium: 1883.72, fiber: 3.98, sugar: 7.19 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 824.87, protein: 34.63, carbs: 58.92, fat: 50.43, satFat: 14.3, transFat: 0.35, chol: 65.68, sodium: 1773.72, fiber: 7.98, sugar: 10.19 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 814.87, protein: 36.63, carbs: 56.92, fat: 50.43, satFat: 14.3, transFat: 0.35, chol: 65.68, sodium: 1933.72, fiber: 3.98, sugar: 6.19 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 804.87, protein: 35.63, carbs: 56.92, fat: 49.43, satFat: 14.3, transFat: 0.35, chol: 65.68, sodium: 1953.72, fiber: 3.98, sugar: 6.19 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 824.87, protein: 35.63, carbs: 61.92, fat: 48.43, satFat: 13.3, transFat: 0.35, chol: 65.68, sodium: 2263.72, fiber: 3.98, sugar: 6.19 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 514.87, protein: 27.63, carbs: 9.92, fat: 41.43, satFat: 10.3, transFat: 0.35, chol: 65.68, sodium: 1313.72, fiber: 1.98, sugar: 6.19 },
      ] },
    ],
  },
  'seed-jm-3-ham-provolone': {
    itemName: "Ham and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 482.65, protein: 22.74, carbs: 44.42, fat: 24.22, satFat: 6.32, transFat: 0.24, chol: 36.19, sodium: 1152.74, fiber: 2.91, sugar: 4.57 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 481.81, protein: 22.91, carbs: 44.62, fat: 24.3, satFat: 6.38, transFat: 0.24, chol: 36.19, sodium: 1140.75, fiber: 4.45, sugar: 5.32 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 502.99, protein: 24.19, carbs: 45.08, fat: 25.6, satFat: 7.19, transFat: 0.29, chol: 40.53, sodium: 1205.93, fiber: 3.3, sugar: 4.58 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 456.49, protein: 21.74, carbs: 38.55, fat: 24.32, satFat: 6.28, transFat: 0.24, chol: 36.19, sodium: 1083.11, fiber: 2.67, sugar: 4.39 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 816.8, protein: 38.23, carbs: 67.86, fat: 44.36, satFat: 10.7, transFat: 0.37, chol: 63.44, sodium: 1962.5, fiber: 4.39, sugar: 7.35 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 815.52, protein: 38.49, carbs: 68.17, fat: 44.49, satFat: 10.79, transFat: 0.37, chol: 63.44, sodium: 1944.35, fiber: 6.72, sugar: 8.5 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 847.61, protein: 40.42, carbs: 68.85, fat: 46.45, satFat: 12.02, transFat: 0.44, chol: 70.02, sodium: 2043.1, fiber: 4.97, sugar: 7.37 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 777.17, protein: 36.71, carbs: 58.96, fat: 44.52, satFat: 10.65, transFat: 0.36, chol: 63.44, sodium: 1857.01, fiber: 4.03, sugar: 7.08 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 743.07, protein: 32.62, carbs: 48.69, fat: 48.44, satFat: 10.87, transFat: 0.35, chol: 63.44, sodium: 1712.28, fiber: 3.98, sugar: 9.11 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1549.82, protein: 67.75, carbs: 132.94, fat: 84.29, satFat: 19.07, transFat: 0.61, chol: 106.1, sodium: 3527.57, fiber: 8.17, sugar: 12.85 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1547.27, protein: 68.26, carbs: 133.55, fat: 84.55, satFat: 19.25, transFat: 0.61, chol: 106.1, sodium: 3491.26, fiber: 12.82, sugar: 15.15 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1611.45, protein: 72.14, carbs: 134.92, fat: 88.47, satFat: 21.71, transFat: 0.75, chol: 119.26, sodium: 3688.76, fiber: 9.34, sugar: 12.89 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1470.56, protein: 64.71, carbs: 115.14, fat: 84.61, satFat: 18.97, transFat: 0.6, chol: 106.1, sodium: 3316.59, fiber: 7.44, sugar: 12.32 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1402.37, protein: 56.53, carbs: 94.6, fat: 92.45, satFat: 19.41, transFat: 0.58, chol: 106.1, sodium: 3027.13, fiber: 7.35, sugar: 16.38 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 798.07, protein: 34.62, carbs: 57.19, fat: 49.44, satFat: 14.37, transFat: 0.35, chol: 63.44, sodium: 1837.28, fiber: 3.98, sugar: 6.61 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 818.07, protein: 33.62, carbs: 58.19, fat: 50.44, satFat: 14.37, transFat: 0.35, chol: 63.44, sodium: 1727.28, fiber: 7.98, sugar: 9.61 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 808.07, protein: 35.62, carbs: 56.19, fat: 50.44, satFat: 14.37, transFat: 0.35, chol: 63.44, sodium: 1887.28, fiber: 3.98, sugar: 5.61 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 798.07, protein: 34.62, carbs: 56.19, fat: 49.44, satFat: 14.37, transFat: 0.35, chol: 63.44, sodium: 1907.28, fiber: 3.98, sugar: 5.61 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 818.07, protein: 34.62, carbs: 61.19, fat: 48.44, satFat: 13.37, transFat: 0.35, chol: 63.44, sodium: 2217.28, fiber: 3.98, sugar: 5.61 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 508.07, protein: 26.62, carbs: 9.19, fat: 41.44, satFat: 10.37, transFat: 0.35, chol: 63.44, sodium: 1267.28, fiber: 1.98, sugar: 5.61 },
      ] },
    ],
  },
  'seed-jm-4-number-four': {
    itemName: "The Number Four",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 480.3, protein: 22.67, carbs: 45.66, fat: 23.42, satFat: 5.79, transFat: 0.24, chol: 33.42, sodium: 1120.74, fiber: 2.91, sugar: 5.47 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 479.46, protein: 22.84, carbs: 45.86, fat: 23.5, satFat: 5.85, transFat: 0.24, chol: 33.42, sodium: 1108.75, fiber: 4.45, sugar: 6.22 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 500.64, protein: 24.12, carbs: 46.32, fat: 24.8, satFat: 6.66, transFat: 0.29, chol: 37.76, sodium: 1173.93, fiber: 3.3, sugar: 5.48 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 454.14, protein: 21.67, carbs: 39.79, fat: 23.52, satFat: 5.75, transFat: 0.24, chol: 33.42, sodium: 1051.11, fiber: 2.67, sugar: 5.29 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 806.15, protein: 37.19, carbs: 70.05, fat: 42.62, satFat: 9.61, transFat: 0.37, chol: 55.89, sodium: 1851.22, fiber: 4.39, sugar: 8.9 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 804.87, protein: 37.45, carbs: 70.36, fat: 42.75, satFat: 9.7, transFat: 0.37, chol: 55.89, sodium: 1833.07, fiber: 6.72, sugar: 10.06 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 836.96, protein: 39.39, carbs: 71.04, fat: 44.71, satFat: 10.93, transFat: 0.44, chol: 62.47, sodium: 1931.82, fiber: 4.97, sugar: 8.93 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 766.52, protein: 35.67, carbs: 61.15, fat: 42.78, satFat: 9.56, transFat: 0.36, chol: 55.89, sodium: 1745.73, fiber: 4.03, sugar: 8.64 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 732.42, protein: 31.58, carbs: 50.88, fat: 46.7, satFat: 9.78, transFat: 0.35, chol: 55.89, sodium: 1601, fiber: 3.98, sugar: 10.67 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1530.53, protein: 65.78, carbs: 136.55, fat: 81.33, satFat: 17.25, transFat: 0.61, chol: 92.98, sodium: 3329.22, fiber: 8.17, sugar: 15.41 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1527.98, protein: 66.29, carbs: 137.16, fat: 81.59, satFat: 17.43, transFat: 0.61, chol: 92.98, sodium: 3292.91, fiber: 12.82, sugar: 17.71 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1592.16, protein: 70.17, carbs: 138.53, fat: 85.51, satFat: 19.89, transFat: 0.75, chol: 106.14, sodium: 3490.41, fiber: 9.34, sugar: 15.45 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1451.27, protein: 62.74, carbs: 118.75, fat: 81.65, satFat: 17.15, transFat: 0.6, chol: 92.98, sodium: 3118.24, fiber: 7.44, sugar: 14.88 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1383.08, protein: 54.56, carbs: 98.21, fat: 89.49, satFat: 17.59, transFat: 0.58, chol: 92.98, sodium: 2828.78, fiber: 7.35, sugar: 18.94 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 787.42, protein: 33.58, carbs: 59.38, fat: 47.7, satFat: 13.28, transFat: 0.35, chol: 55.89, sodium: 1726, fiber: 3.98, sugar: 8.17 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 807.42, protein: 32.58, carbs: 60.38, fat: 48.7, satFat: 13.28, transFat: 0.35, chol: 55.89, sodium: 1616, fiber: 7.98, sugar: 11.17 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 797.42, protein: 34.58, carbs: 58.38, fat: 48.7, satFat: 13.28, transFat: 0.35, chol: 55.89, sodium: 1776, fiber: 3.98, sugar: 7.17 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 787.42, protein: 33.58, carbs: 58.38, fat: 47.7, satFat: 13.28, transFat: 0.35, chol: 55.89, sodium: 1796, fiber: 3.98, sugar: 7.17 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 807.42, protein: 33.58, carbs: 63.38, fat: 46.7, satFat: 12.28, transFat: 0.35, chol: 55.89, sodium: 2106, fiber: 3.98, sugar: 7.17 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 497.42, protein: 25.58, carbs: 11.38, fat: 39.7, satFat: 9.28, transFat: 0.35, chol: 55.89, sodium: 1156, fiber: 1.98, sugar: 7.17 },
      ] },
    ],
  },
  'seed-jm-5-super-sub': {
    itemName: "The Super Sub",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 505.31, protein: 26.34, carbs: 45.82, fat: 24.55, satFat: 6.28, transFat: 0.24, chol: 42.69, sodium: 1335.27, fiber: 2.91, sugar: 5.71 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 504.47, protein: 26.51, carbs: 46.02, fat: 24.63, satFat: 6.34, transFat: 0.24, chol: 42.69, sodium: 1323.28, fiber: 4.45, sugar: 6.46 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 525.65, protein: 27.79, carbs: 46.48, fat: 25.93, satFat: 7.15, transFat: 0.29, chol: 47.03, sodium: 1388.46, fiber: 3.3, sugar: 5.72 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 479.15, protein: 25.34, carbs: 39.95, fat: 24.65, satFat: 6.24, transFat: 0.24, chol: 42.69, sodium: 1265.64, fiber: 2.67, sugar: 5.53 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 837.46, protein: 41.71, carbs: 70.03, fat: 44.17, satFat: 10.32, transFat: 0.37, chol: 67.96, sodium: 2120.83, fiber: 4.39, sugar: 9.05 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 836.18, protein: 41.97, carbs: 70.34, fat: 44.3, satFat: 10.41, transFat: 0.37, chol: 67.96, sodium: 2102.68, fiber: 6.72, sugar: 10.2 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 868.27, protein: 43.91, carbs: 71.02, fat: 46.26, satFat: 11.64, transFat: 0.44, chol: 74.54, sodium: 2201.43, fiber: 4.97, sugar: 9.07 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 797.83, protein: 40.19, carbs: 61.13, fat: 44.33, satFat: 10.27, transFat: 0.36, chol: 67.96, sodium: 2015.34, fiber: 4.03, sugar: 8.78 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 763.73, protein: 36.1, carbs: 50.86, fat: 48.25, satFat: 10.49, transFat: 0.35, chol: 67.96, sodium: 1870.61, fiber: 3.98, sugar: 10.81 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1585.3, protein: 73.74, carbs: 136.66, fat: 83.95, satFat: 18.42, transFat: 0.61, chol: 113.77, sodium: 3800.07, fiber: 8.17, sugar: 15.76 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1582.75, protein: 74.25, carbs: 137.27, fat: 84.21, satFat: 18.6, transFat: 0.61, chol: 113.77, sodium: 3763.76, fiber: 12.82, sugar: 18.06 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1646.93, protein: 78.13, carbs: 138.64, fat: 88.13, satFat: 21.06, transFat: 0.75, chol: 126.93, sodium: 3961.26, fiber: 9.34, sugar: 15.8 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1506.04, protein: 70.7, carbs: 118.86, fat: 84.27, satFat: 18.32, transFat: 0.6, chol: 113.77, sodium: 3589.09, fiber: 7.44, sugar: 15.23 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1437.85, protein: 62.52, carbs: 98.32, fat: 92.11, satFat: 18.76, transFat: 0.58, chol: 113.77, sodium: 3299.63, fiber: 7.35, sugar: 19.29 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 818.73, protein: 38.1, carbs: 59.36, fat: 49.25, satFat: 13.99, transFat: 0.35, chol: 67.96, sodium: 1995.61, fiber: 3.98, sugar: 8.31 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 838.73, protein: 37.1, carbs: 60.36, fat: 50.25, satFat: 13.99, transFat: 0.35, chol: 67.96, sodium: 1885.61, fiber: 7.98, sugar: 11.31 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 828.73, protein: 39.1, carbs: 58.36, fat: 50.25, satFat: 13.99, transFat: 0.35, chol: 67.96, sodium: 2045.61, fiber: 3.98, sugar: 7.31 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 818.73, protein: 38.1, carbs: 58.36, fat: 49.25, satFat: 13.99, transFat: 0.35, chol: 67.96, sodium: 2065.61, fiber: 3.98, sugar: 7.31 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 838.73, protein: 38.1, carbs: 63.36, fat: 48.25, satFat: 12.99, transFat: 0.35, chol: 67.96, sodium: 2375.61, fiber: 3.98, sugar: 7.31 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 528.73, protein: 30.1, carbs: 11.36, fat: 41.25, satFat: 9.99, transFat: 0.35, chol: 67.96, sodium: 1425.61, fiber: 1.98, sugar: 7.31 },
      ] },
    ],
  },
  'seed-jm-6-roast-beef-provolone': {
    itemName: "Roast Beef and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 563.01, protein: 37.59, carbs: 43.4, fat: 26.1, satFat: 6.91, transFat: 0.27, chol: 77.1, sodium: 875.12, fiber: 2.91, sugar: 3.54 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 562.17, protein: 37.76, carbs: 43.6, fat: 26.18, satFat: 6.97, transFat: 0.27, chol: 77.1, sodium: 863.13, fiber: 4.45, sugar: 4.29 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 583.35, protein: 39.04, carbs: 44.06, fat: 27.48, satFat: 7.78, transFat: 0.32, chol: 81.44, sodium: 928.31, fiber: 3.3, sugar: 3.55 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 536.85, protein: 36.59, carbs: 37.53, fat: 26.2, satFat: 6.87, transFat: 0.27, chol: 77.1, sodium: 805.49, fiber: 2.67, sugar: 3.36 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 913.34, protein: 56.93, carbs: 65.83, fat: 46.25, satFat: 11.23, transFat: 0.41, chol: 116.77, sodium: 1323.88, fiber: 4.39, sugar: 5.33 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 912.06, protein: 57.19, carbs: 66.14, fat: 46.38, satFat: 11.32, transFat: 0.41, chol: 116.77, sodium: 1305.72, fiber: 6.72, sugar: 6.48 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 944.15, protein: 59.13, carbs: 66.82, fat: 48.34, satFat: 12.55, transFat: 0.48, chol: 123.35, sodium: 1404.48, fiber: 4.97, sugar: 5.35 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 873.71, protein: 55.41, carbs: 56.93, fat: 46.41, satFat: 11.18, transFat: 0.4, chol: 116.77, sodium: 1218.39, fiber: 4.03, sugar: 5.06 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 839.61, protein: 51.32, carbs: 46.66, fat: 50.33, satFat: 11.4, transFat: 0.39, chol: 116.77, sodium: 1073.66, fiber: 3.98, sugar: 7.09 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1776.26, protein: 110.12, carbs: 129.54, fat: 89.35, satFat: 20.63, transFat: 0.69, chol: 224.03, sodium: 2552.25, fiber: 8.17, sugar: 9.46 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1773.71, protein: 110.63, carbs: 130.15, fat: 89.61, satFat: 20.81, transFat: 0.69, chol: 224.03, sodium: 2515.94, fiber: 12.82, sugar: 11.76 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1837.89, protein: 114.51, carbs: 131.52, fat: 93.53, satFat: 23.27, transFat: 0.83, chol: 237.19, sodium: 2713.44, fiber: 9.34, sugar: 9.5 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1697, protein: 107.08, carbs: 111.74, fat: 89.67, satFat: 20.53, transFat: 0.68, chol: 224.03, sodium: 2341.27, fiber: 7.44, sugar: 8.93 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1628.81, protein: 98.9, carbs: 91.2, fat: 97.51, satFat: 20.97, transFat: 0.66, chol: 224.03, sodium: 2051.81, fiber: 7.35, sugar: 12.99 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 894.61, protein: 53.32, carbs: 55.16, fat: 51.33, satFat: 14.9, transFat: 0.39, chol: 116.77, sodium: 1198.66, fiber: 3.98, sugar: 4.59 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 914.61, protein: 52.32, carbs: 56.16, fat: 52.33, satFat: 14.9, transFat: 0.39, chol: 116.77, sodium: 1088.66, fiber: 7.98, sugar: 7.59 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 904.61, protein: 54.32, carbs: 54.16, fat: 52.33, satFat: 14.9, transFat: 0.39, chol: 116.77, sodium: 1248.66, fiber: 3.98, sugar: 3.59 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 894.61, protein: 53.32, carbs: 54.16, fat: 51.33, satFat: 14.9, transFat: 0.39, chol: 116.77, sodium: 1268.66, fiber: 3.98, sugar: 3.59 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 914.61, protein: 53.32, carbs: 59.16, fat: 50.33, satFat: 13.9, transFat: 0.39, chol: 116.77, sodium: 1578.66, fiber: 3.98, sugar: 3.59 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 604.61, protein: 45.32, carbs: 7.16, fat: 43.33, satFat: 10.9, transFat: 0.39, chol: 116.77, sodium: 628.66, fiber: 1.98, sugar: 3.59 },
      ] },
    ],
  },
  'seed-jm-7-turkey-provolone': {
    itemName: "Turkey and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 482.07, protein: 26.2, carbs: 43.72, fat: 22.7, satFat: 5.55, transFat: 0.24, chol: 40.95, sodium: 1153.05, fiber: 2.91, sugar: 3.87 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 481.23, protein: 26.37, carbs: 43.92, fat: 22.78, satFat: 5.61, transFat: 0.24, chol: 40.95, sodium: 1141.06, fiber: 4.45, sugar: 4.62 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 502.41, protein: 27.65, carbs: 44.38, fat: 24.08, satFat: 6.42, transFat: 0.29, chol: 45.29, sodium: 1206.24, fiber: 3.3, sugar: 3.88 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 455.91, protein: 25.2, carbs: 37.85, fat: 22.8, satFat: 5.51, transFat: 0.24, chol: 40.95, sodium: 1083.42, fiber: 2.67, sugar: 3.69 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 817.2, protein: 45.37, carbs: 66.48, fat: 41.38, satFat: 9.18, transFat: 0.37, chol: 73.51, sodium: 1976.4, fiber: 4.39, sugar: 5.98 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 815.92, protein: 45.63, carbs: 66.79, fat: 41.51, satFat: 9.27, transFat: 0.37, chol: 73.51, sodium: 1958.25, fiber: 6.72, sugar: 7.13 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 848.01, protein: 47.57, carbs: 67.47, fat: 43.47, satFat: 10.5, transFat: 0.44, chol: 80.09, sodium: 2057, fiber: 4.97, sugar: 6 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 777.57, protein: 43.85, carbs: 57.58, fat: 41.54, satFat: 9.13, transFat: 0.36, chol: 73.51, sodium: 1870.91, fiber: 4.03, sugar: 5.71 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 743.47, protein: 39.76, carbs: 47.31, fat: 45.46, satFat: 9.35, transFat: 0.35, chol: 73.51, sodium: 1726.18, fiber: 3.98, sugar: 7.74 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1550.31, protein: 79.68, carbs: 130.62, fat: 79.29, satFat: 16.54, transFat: 0.61, chol: 122.89, sodium: 3549.3, fiber: 8.17, sugar: 10.54 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1547.76, protein: 80.19, carbs: 131.23, fat: 79.55, satFat: 16.72, transFat: 0.61, chol: 122.89, sodium: 3512.99, fiber: 12.82, sugar: 12.84 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1611.94, protein: 84.07, carbs: 132.6, fat: 83.47, satFat: 19.18, transFat: 0.75, chol: 136.05, sodium: 3710.49, fiber: 9.34, sugar: 10.58 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1471.05, protein: 76.64, carbs: 112.82, fat: 79.61, satFat: 16.44, transFat: 0.6, chol: 122.89, sodium: 3338.32, fiber: 7.44, sugar: 10.01 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1402.86, protein: 68.46, carbs: 92.28, fat: 87.45, satFat: 16.88, transFat: 0.58, chol: 122.89, sodium: 3048.86, fiber: 7.35, sugar: 14.07 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 780.37, protein: 37.88, carbs: 55.7, fat: 46.26, satFat: 12.84, transFat: 0.35, chol: 65.64, sodium: 1695.33, fiber: 3.98, sugar: 5.13 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 800.37, protein: 36.88, carbs: 56.7, fat: 47.26, satFat: 12.84, transFat: 0.35, chol: 65.64, sodium: 1585.33, fiber: 7.98, sugar: 8.13 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 790.37, protein: 38.88, carbs: 54.7, fat: 47.26, satFat: 12.84, transFat: 0.35, chol: 65.64, sodium: 1745.33, fiber: 3.98, sugar: 4.13 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 780.37, protein: 37.88, carbs: 54.7, fat: 46.26, satFat: 12.84, transFat: 0.35, chol: 65.64, sodium: 1765.33, fiber: 3.98, sugar: 4.13 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 800.37, protein: 37.88, carbs: 59.7, fat: 45.26, satFat: 11.84, transFat: 0.35, chol: 65.64, sodium: 2075.33, fiber: 3.98, sugar: 4.13 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 490.37, protein: 29.88, carbs: 7.7, fat: 38.26, satFat: 8.84, transFat: 0.35, chol: 65.64, sodium: 1125.33, fiber: 1.98, sugar: 4.13 },
      ] },
    ],
  },
  'seed-jm-8-club-sub': {
    itemName: "Club Sub",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 664.66, protein: 30.66, carbs: 44.69, fat: 41.03, satFat: 9.19, transFat: 0.38, chol: 60.97, sodium: 1530.29, fiber: 2.91, sugar: 4.82 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 663.82, protein: 30.83, carbs: 44.89, fat: 41.11, satFat: 9.25, transFat: 0.38, chol: 60.97, sodium: 1518.3, fiber: 4.45, sugar: 5.57 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 685, protein: 32.11, carbs: 45.35, fat: 42.41, satFat: 10.06, transFat: 0.43, chol: 65.31, sodium: 1583.48, fiber: 3.3, sugar: 4.83 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 638.5, protein: 29.66, carbs: 38.82, fat: 41.13, satFat: 9.15, transFat: 0.38, chol: 60.97, sodium: 1460.66, fiber: 2.67, sugar: 4.64 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 1162.99, protein: 50.15, carbs: 68.31, fat: 77.83, satFat: 16.46, transFat: 0.64, chol: 105.12, sodium: 2563.9, fiber: 4.39, sugar: 7.77 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 1161.71, protein: 50.41, carbs: 68.62, fat: 77.96, satFat: 16.55, transFat: 0.64, chol: 105.12, sodium: 2545.75, fiber: 6.72, sugar: 8.91 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 1193.8, protein: 52.35, carbs: 69.3, fat: 79.92, satFat: 17.78, transFat: 0.71, chol: 111.7, sodium: 2644.5, fiber: 4.97, sugar: 7.79 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 1123.36, protein: 48.63, carbs: 59.41, fat: 77.99, satFat: 16.41, transFat: 0.63, chol: 105.12, sodium: 2458.41, fiber: 4.03, sugar: 7.5 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 1089.26, protein: 44.54, carbs: 49.14, fat: 81.91, satFat: 16.63, transFat: 0.62, chol: 105.12, sodium: 2313.68, fiber: 3.98, sugar: 9.53 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 2220.98, protein: 87.25, carbs: 133.68, fat: 150.9, satFat: 30.55, transFat: 1.16, chol: 180.51, sodium: 4547.95, fiber: 8.17, sugar: 13.52 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 2218.43, protein: 87.76, carbs: 134.29, fat: 151.16, satFat: 30.73, transFat: 1.16, chol: 180.51, sodium: 4511.64, fiber: 12.82, sugar: 15.82 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 2282.61, protein: 91.64, carbs: 135.66, fat: 155.08, satFat: 33.19, transFat: 1.3, chol: 193.67, sodium: 4709.14, fiber: 9.34, sugar: 13.56 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 2141.72, protein: 84.21, carbs: 115.88, fat: 151.22, satFat: 30.45, transFat: 1.15, chol: 180.51, sodium: 4336.97, fiber: 7.44, sugar: 12.99 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 2073.53, protein: 76.03, carbs: 95.34, fat: 159.06, satFat: 30.89, transFat: 1.13, chol: 180.51, sodium: 4047.51, fiber: 7.35, sugar: 17.05 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 1125.54, protein: 43.72, carbs: 57.3, fat: 82.19, satFat: 19.86, transFat: 0.62, chol: 98.66, sodium: 2279.22, fiber: 3.98, sugar: 6.69 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 1145.54, protein: 42.72, carbs: 58.3, fat: 83.19, satFat: 19.86, transFat: 0.62, chol: 98.66, sodium: 2169.22, fiber: 7.98, sugar: 9.69 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 1135.54, protein: 44.72, carbs: 56.3, fat: 83.19, satFat: 19.86, transFat: 0.62, chol: 98.66, sodium: 2329.22, fiber: 3.98, sugar: 5.69 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 1125.54, protein: 43.72, carbs: 56.3, fat: 82.19, satFat: 19.86, transFat: 0.62, chol: 98.66, sodium: 2349.22, fiber: 3.98, sugar: 5.69 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 1145.54, protein: 43.72, carbs: 61.3, fat: 81.19, satFat: 18.86, transFat: 0.62, chol: 98.66, sodium: 2659.22, fiber: 3.98, sugar: 5.69 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 835.54, protein: 35.72, carbs: 9.3, fat: 74.19, satFat: 15.86, transFat: 0.62, chol: 98.66, sodium: 1709.22, fiber: 1.98, sugar: 5.69 },
      ] },
    ],
  },
  'seed-jm-9-club-supreme': {
    itemName: "Club Supreme",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 684.65, protein: 36.04, carbs: 43.87, fat: 40.73, satFat: 8.86, transFat: 0.22, chol: 78.3, sodium: 1167.04, fiber: 2.91, sugar: 4.06 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 683.81, protein: 36.21, carbs: 44.07, fat: 40.81, satFat: 8.92, transFat: 0.22, chol: 78.3, sodium: 1155.05, fiber: 4.45, sugar: 4.81 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 704.99, protein: 37.49, carbs: 44.53, fat: 42.11, satFat: 9.73, transFat: 0.27, chol: 82.64, sodium: 1220.23, fiber: 3.3, sugar: 4.07 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 658.49, protein: 35.04, carbs: 38, fat: 40.83, satFat: 8.82, transFat: 0.22, chol: 78.3, sodium: 1097.41, fiber: 2.67, sugar: 3.88 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 1191.2, protein: 59.31, carbs: 66.88, fat: 76.74, satFat: 15.65, transFat: 0.41, chol: 131.96, sodium: 2050.66, fiber: 4.39, sugar: 6.42 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 1189.92, protein: 59.57, carbs: 67.19, fat: 76.87, satFat: 15.74, transFat: 0.41, chol: 131.96, sodium: 2032.51, fiber: 6.72, sugar: 7.57 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 1222.01, protein: 61.51, carbs: 67.87, fat: 78.83, satFat: 16.97, transFat: 0.48, chol: 138.54, sodium: 2131.26, fiber: 4.97, sugar: 6.44 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 1151.57, protein: 57.79, carbs: 57.98, fat: 76.9, satFat: 15.6, transFat: 0.4, chol: 131.96, sodium: 1945.17, fiber: 4.03, sugar: 6.15 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 1117.47, protein: 53.7, carbs: 47.71, fat: 80.82, satFat: 15.82, transFat: 0.39, chol: 131.96, sodium: 1800.44, fiber: 3.98, sugar: 8.18 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 2266.98, protein: 101.43, carbs: 131.46, fat: 149.43, satFat: 29.38, transFat: 0.76, chol: 223.54, sodium: 3688.45, fiber: 8.17, sugar: 11.44 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 2264.43, protein: 101.94, carbs: 132.07, fat: 149.69, satFat: 29.56, transFat: 0.76, chol: 223.54, sodium: 3652.14, fiber: 12.82, sugar: 13.74 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 2328.61, protein: 105.82, carbs: 133.44, fat: 153.61, satFat: 32.02, transFat: 0.9, chol: 236.7, sodium: 3849.64, fiber: 9.34, sugar: 11.48 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 2187.72, protein: 98.39, carbs: 113.66, fat: 149.75, satFat: 29.28, transFat: 0.75, chol: 223.54, sodium: 3477.47, fiber: 7.44, sugar: 10.91 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 2119.53, protein: 90.21, carbs: 93.12, fat: 157.59, satFat: 29.72, transFat: 0.73, chol: 223.54, sodium: 3188.01, fiber: 7.35, sugar: 14.97 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 1172.47, protein: 55.7, carbs: 56.21, fat: 81.82, satFat: 19.32, transFat: 0.39, chol: 131.96, sodium: 1925.44, fiber: 3.98, sugar: 5.68 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 1192.47, protein: 54.7, carbs: 57.21, fat: 82.82, satFat: 19.32, transFat: 0.39, chol: 131.96, sodium: 1815.44, fiber: 7.98, sugar: 8.68 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 1182.47, protein: 56.7, carbs: 55.21, fat: 82.82, satFat: 19.32, transFat: 0.39, chol: 131.96, sodium: 1975.44, fiber: 3.98, sugar: 4.68 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 1172.47, protein: 55.7, carbs: 55.21, fat: 81.82, satFat: 19.32, transFat: 0.39, chol: 131.96, sodium: 1995.44, fiber: 3.98, sugar: 4.68 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 1192.47, protein: 55.7, carbs: 60.21, fat: 80.82, satFat: 18.32, transFat: 0.39, chol: 131.96, sodium: 2305.44, fiber: 3.98, sugar: 4.68 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 882.47, protein: 47.7, carbs: 8.21, fat: 73.82, satFat: 15.32, transFat: 0.39, chol: 131.96, sodium: 1355.44, fiber: 1.98, sugar: 4.68 },
      ] },
    ],
  },
  'seed-jm-10-tuna-fish': {
    itemName: "Tuna Fish",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 627.97, protein: 20.47, carbs: 44.01, fat: 41.85, satFat: 5.91, transFat: 0.24, chol: 33.05, sodium: 848.99, fiber: 3.13, sugar: 4.2 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 627.13, protein: 20.64, carbs: 44.21, fat: 41.93, satFat: 5.97, transFat: 0.24, chol: 33.05, sodium: 837, fiber: 4.67, sugar: 4.95 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 648.31, protein: 21.92, carbs: 44.67, fat: 43.23, satFat: 6.78, transFat: 0.29, chol: 37.39, sodium: 902.18, fiber: 3.52, sugar: 4.21 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 601.81, protein: 19.47, carbs: 38.14, fat: 41.95, satFat: 5.87, transFat: 0.24, chol: 33.05, sodium: 779.36, fiber: 2.89, sugar: 4.02 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 1062.1, protein: 33.1, carbs: 66.96, fat: 74.74, satFat: 10.47, transFat: 0.41, chol: 55.94, sodium: 1348.35, fiber: 4.78, sugar: 6.45 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 1060.82, protein: 33.35, carbs: 67.27, fat: 74.87, satFat: 10.56, transFat: 0.41, chol: 55.94, sodium: 1330.2, fiber: 7.11, sugar: 7.6 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 1092.91, protein: 35.3, carbs: 67.95, fat: 76.83, satFat: 11.79, transFat: 0.48, chol: 62.52, sodium: 1428.95, fiber: 5.37, sugar: 6.47 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 1022.47, protein: 31.58, carbs: 58.06, fat: 74.9, satFat: 10.42, transFat: 0.4, chol: 55.94, sodium: 1242.86, fiber: 4.42, sugar: 6.18 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 988.37, protein: 27.49, carbs: 47.79, fat: 78.82, satFat: 10.64, transFat: 0.39, chol: 55.94, sodium: 1098.13, fiber: 4.37, sugar: 8.21 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 2029.4, protein: 62.09, carbs: 131.7, fat: 141.49, satFat: 19.7, transFat: 0.73, chol: 101.7, sodium: 2584.97, fiber: 8.87, sugar: 11.5 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 2026.85, protein: 62.6, carbs: 132.31, fat: 141.75, satFat: 19.88, transFat: 0.73, chol: 101.7, sodium: 2548.66, fiber: 13.52, sugar: 13.8 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 2091.03, protein: 66.48, carbs: 133.68, fat: 145.67, satFat: 22.34, transFat: 0.87, chol: 114.86, sodium: 2746.16, fiber: 10.04, sugar: 11.54 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1950.14, protein: 59.05, carbs: 113.9, fat: 141.81, satFat: 19.6, transFat: 0.72, chol: 101.7, sodium: 2373.99, fiber: 8.14, sugar: 10.97 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1881.95, protein: 50.87, carbs: 93.36, fat: 149.65, satFat: 20.04, transFat: 0.7, chol: 101.7, sodium: 2084.53, fiber: 8.05, sugar: 15.03 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 1043.37, protein: 29.49, carbs: 56.29, fat: 79.82, satFat: 14.14, transFat: 0.39, chol: 55.94, sodium: 1223.13, fiber: 4.37, sugar: 5.71 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 1063.37, protein: 28.49, carbs: 57.29, fat: 80.82, satFat: 14.14, transFat: 0.39, chol: 55.94, sodium: 1113.13, fiber: 8.37, sugar: 8.71 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 1053.37, protein: 30.49, carbs: 55.29, fat: 80.82, satFat: 14.14, transFat: 0.39, chol: 55.94, sodium: 1273.13, fiber: 4.37, sugar: 4.71 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 1043.37, protein: 29.49, carbs: 55.29, fat: 79.82, satFat: 14.14, transFat: 0.39, chol: 55.94, sodium: 1293.13, fiber: 4.37, sugar: 4.71 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 1063.37, protein: 29.49, carbs: 60.29, fat: 78.82, satFat: 13.14, transFat: 0.39, chol: 55.94, sodium: 1603.13, fiber: 4.37, sugar: 4.71 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 753.37, protein: 21.49, carbs: 8.29, fat: 71.82, satFat: 10.14, transFat: 0.39, chol: 55.94, sodium: 653.13, fiber: 2.37, sugar: 4.71 },
      ] },
    ],
  },
  'seed-jm-11-stickball': {
    itemName: "Stickball Special",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 505.63, protein: 21.8, carbs: 44.44, fat: 27.08, satFat: 7.48, transFat: 0.24, chol: 38.53, sodium: 1164.91, fiber: 2.92, sugar: 4.56 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 504.79, protein: 21.97, carbs: 44.64, fat: 27.16, satFat: 7.54, transFat: 0.24, chol: 38.53, sodium: 1152.92, fiber: 4.46, sugar: 5.31 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 525.97, protein: 23.25, carbs: 45.1, fat: 28.46, satFat: 8.35, transFat: 0.29, chol: 42.87, sodium: 1218.1, fiber: 3.31, sugar: 4.57 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 479.47, protein: 20.8, carbs: 38.57, fat: 27.18, satFat: 7.44, transFat: 0.24, chol: 38.53, sodium: 1095.28, fiber: 2.68, sugar: 4.38 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 887.46, protein: 39.43, carbs: 68.29, fat: 51.32, satFat: 13.49, transFat: 0.37, chol: 75.85, sodium: 2170.81, fiber: 4.41, sugar: 7.73 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 886.18, protein: 39.69, carbs: 68.6, fat: 51.45, satFat: 13.58, transFat: 0.37, chol: 75.85, sodium: 2152.65, fiber: 6.74, sugar: 8.88 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 918.27, protein: 41.63, carbs: 69.28, fat: 53.41, satFat: 14.81, transFat: 0.44, chol: 82.43, sodium: 2251.4, fiber: 5, sugar: 7.75 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 847.83, protein: 37.91, carbs: 59.39, fat: 51.48, satFat: 13.44, transFat: 0.36, chol: 75.85, sodium: 2065.32, fiber: 4.05, sugar: 7.46 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 813.73, protein: 33.82, carbs: 49.12, fat: 55.4, satFat: 13.66, transFat: 0.35, chol: 75.85, sodium: 1920.59, fiber: 4, sugar: 9.49 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1667.3, protein: 69.08, carbs: 133.59, fat: 96.16, satFat: 23.85, transFat: 0.61, chol: 125.89, sodium: 3846.12, fiber: 8.21, sugar: 13.4 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1664.75, protein: 69.59, carbs: 134.2, fat: 96.42, satFat: 24.03, transFat: 0.61, chol: 125.89, sodium: 3809.81, fiber: 12.86, sugar: 15.7 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1728.93, protein: 73.47, carbs: 135.57, fat: 100.34, satFat: 26.49, transFat: 0.75, chol: 139.05, sodium: 4007.31, fiber: 9.38, sugar: 13.44 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1588.04, protein: 66.04, carbs: 115.79, fat: 96.48, satFat: 23.75, transFat: 0.6, chol: 125.89, sodium: 3635.14, fiber: 7.48, sugar: 12.87 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1519.85, protein: 57.86, carbs: 95.25, fat: 104.32, satFat: 24.19, transFat: 0.58, chol: 125.89, sodium: 3345.68, fiber: 7.39, sugar: 16.93 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 868.73, protein: 35.82, carbs: 57.62, fat: 56.4, satFat: 17.16, transFat: 0.35, chol: 75.85, sodium: 2045.59, fiber: 4, sugar: 6.99 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 888.73, protein: 34.82, carbs: 58.62, fat: 57.4, satFat: 17.16, transFat: 0.35, chol: 75.85, sodium: 1935.59, fiber: 8, sugar: 9.99 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 878.73, protein: 36.82, carbs: 56.62, fat: 57.4, satFat: 17.16, transFat: 0.35, chol: 75.85, sodium: 2095.59, fiber: 4, sugar: 5.99 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 868.73, protein: 35.82, carbs: 56.62, fat: 56.4, satFat: 17.16, transFat: 0.35, chol: 75.85, sodium: 2115.59, fiber: 4, sugar: 5.99 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 888.73, protein: 35.82, carbs: 61.62, fat: 55.4, satFat: 16.16, transFat: 0.35, chol: 75.85, sodium: 2425.59, fiber: 4, sugar: 5.99 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 578.73, protein: 27.82, carbs: 9.62, fat: 48.4, satFat: 13.16, transFat: 0.35, chol: 75.85, sodium: 1475.59, fiber: 2, sugar: 5.99 },
      ] },
    ],
  },
  'seed-jm-12-cancro': {
    itemName: "Cancro Special",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 556.64, protein: 33.04, carbs: 43.65, fat: 27.49, satFat: 7.39, transFat: 0.26, chol: 67.87, sodium: 917.13, fiber: 2.94, sugar: 3.73 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 555.8, protein: 33.21, carbs: 43.85, fat: 27.57, satFat: 7.45, transFat: 0.26, chol: 67.87, sodium: 905.14, fiber: 4.48, sugar: 4.48 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 576.98, protein: 34.49, carbs: 44.31, fat: 28.87, satFat: 8.26, transFat: 0.31, chol: 72.21, sodium: 970.32, fiber: 3.33, sugar: 3.74 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 530.48, protein: 32.04, carbs: 37.78, fat: 27.59, satFat: 7.35, transFat: 0.26, chol: 67.87, sodium: 847.5, fiber: 2.7, sugar: 3.55 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 966.35, protein: 59.05, carbs: 66.33, fat: 50.97, satFat: 12.87, transFat: 0.41, chol: 127.35, sodium: 1504.57, fiber: 4.45, sugar: 5.7 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 965.07, protein: 59.31, carbs: 66.64, fat: 51.1, satFat: 12.96, transFat: 0.41, chol: 127.35, sodium: 1486.42, fiber: 6.78, sugar: 6.85 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 997.16, protein: 61.25, carbs: 67.32, fat: 53.06, satFat: 14.19, transFat: 0.48, chol: 133.93, sodium: 1585.17, fiber: 5.04, sugar: 5.72 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 926.72, protein: 57.53, carbs: 57.43, fat: 51.13, satFat: 12.82, transFat: 0.4, chol: 127.35, sodium: 1399.08, fiber: 4.09, sugar: 5.43 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 892.62, protein: 53.44, carbs: 47.16, fat: 55.05, satFat: 13.04, transFat: 0.39, chol: 127.35, sodium: 1254.35, fiber: 4.04, sugar: 7.46 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1807.39, protein: 102.46, carbs: 130.47, fat: 96.19, satFat: 23, transFat: 0.68, chol: 213.7, sodium: 2790.66, fiber: 8.28, sugar: 10.16 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1804.84, protein: 102.97, carbs: 131.08, fat: 96.45, satFat: 23.18, transFat: 0.68, chol: 213.7, sodium: 2754.35, fiber: 12.93, sugar: 12.46 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1869.02, protein: 106.85, carbs: 132.45, fat: 100.37, satFat: 25.64, transFat: 0.82, chol: 226.86, sodium: 2951.85, fiber: 9.45, sugar: 10.2 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1728.13, protein: 99.42, carbs: 112.67, fat: 96.51, satFat: 22.9, transFat: 0.67, chol: 213.7, sodium: 2579.68, fiber: 7.55, sugar: 9.63 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1659.94, protein: 91.24, carbs: 92.13, fat: 104.35, satFat: 23.34, transFat: 0.65, chol: 213.7, sodium: 2290.22, fiber: 7.46, sugar: 13.69 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 947.62, protein: 55.44, carbs: 55.66, fat: 56.05, satFat: 16.54, transFat: 0.39, chol: 127.35, sodium: 1379.35, fiber: 4.04, sugar: 4.96 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 967.62, protein: 54.44, carbs: 56.66, fat: 57.05, satFat: 16.54, transFat: 0.39, chol: 127.35, sodium: 1269.35, fiber: 8.04, sugar: 7.96 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 957.62, protein: 56.44, carbs: 54.66, fat: 57.05, satFat: 16.54, transFat: 0.39, chol: 127.35, sodium: 1429.35, fiber: 4.04, sugar: 3.96 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 947.62, protein: 55.44, carbs: 54.66, fat: 56.05, satFat: 16.54, transFat: 0.39, chol: 127.35, sodium: 1449.35, fiber: 4.04, sugar: 3.96 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 967.62, protein: 55.44, carbs: 59.66, fat: 55.05, satFat: 15.54, transFat: 0.39, chol: 127.35, sodium: 1759.35, fiber: 4.04, sugar: 3.96 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 657.62, protein: 47.44, carbs: 7.66, fat: 48.05, satFat: 12.54, transFat: 0.39, chol: 127.35, sodium: 809.35, fiber: 2.04, sugar: 3.96 },
      ] },
    ],
  },
  'seed-jm-13-original-italian': {
    itemName: "The Original Italian",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 573.53, protein: 29.28, carbs: 46.43, fat: 30.49, satFat: 8.53, transFat: 0.24, chol: 56.79, sodium: 1597.24, fiber: 2.95, sugar: 6.23 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 572.69, protein: 29.45, carbs: 46.63, fat: 30.57, satFat: 8.59, transFat: 0.24, chol: 56.79, sodium: 1585.25, fiber: 4.49, sugar: 6.98 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 593.87, protein: 30.73, carbs: 47.09, fat: 31.87, satFat: 9.4, transFat: 0.29, chol: 61.13, sodium: 1650.43, fiber: 3.34, sugar: 6.24 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 547.37, protein: 28.28, carbs: 40.56, fat: 30.59, satFat: 8.49, transFat: 0.24, chol: 56.79, sodium: 1527.61, fiber: 2.71, sugar: 6.05 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 956.02, protein: 46.78, carbs: 71.09, fat: 54.52, satFat: 14.21, transFat: 0.37, chol: 92.38, sodium: 2571.21, fiber: 4.47, sugar: 9.95 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 954.74, protein: 47.04, carbs: 71.4, fat: 54.65, satFat: 14.3, transFat: 0.37, chol: 92.38, sodium: 2553.06, fiber: 6.8, sugar: 11.1 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 986.83, protein: 48.98, carbs: 72.08, fat: 56.61, satFat: 15.53, transFat: 0.44, chol: 98.96, sodium: 2651.81, fiber: 5.06, sugar: 9.97 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 916.39, protein: 45.26, carbs: 62.19, fat: 54.68, satFat: 14.16, transFat: 0.36, chol: 92.38, sodium: 2465.72, fiber: 4.11, sugar: 9.68 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 882.29, protein: 41.17, carbs: 51.92, fat: 58.6, satFat: 14.38, transFat: 0.35, chol: 92.38, sodium: 2320.99, fiber: 4.06, sugar: 11.71 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1815.79, protein: 83.62, carbs: 138.72, fat: 104.06, satFat: 25.99, transFat: 0.61, chol: 161.29, sodium: 4678.25, fiber: 8.32, sugar: 17.5 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1813.24, protein: 84.13, carbs: 139.33, fat: 104.32, satFat: 26.17, transFat: 0.61, chol: 161.29, sodium: 4641.94, fiber: 12.97, sugar: 19.8 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1877.42, protein: 88.01, carbs: 140.7, fat: 108.24, satFat: 28.63, transFat: 0.75, chol: 174.45, sodium: 4839.44, fiber: 9.49, sugar: 17.54 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1736.53, protein: 80.58, carbs: 120.92, fat: 104.38, satFat: 25.89, transFat: 0.6, chol: 161.29, sodium: 4467.27, fiber: 7.59, sugar: 16.97 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1668.34, protein: 72.4, carbs: 100.38, fat: 112.22, satFat: 26.33, transFat: 0.58, chol: 161.29, sodium: 4177.81, fiber: 7.5, sugar: 21.03 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 937.29, protein: 43.17, carbs: 60.42, fat: 59.6, satFat: 17.88, transFat: 0.35, chol: 92.38, sodium: 2445.99, fiber: 4.06, sugar: 9.21 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 957.29, protein: 42.17, carbs: 61.42, fat: 60.6, satFat: 17.88, transFat: 0.35, chol: 92.38, sodium: 2335.99, fiber: 8.06, sugar: 12.21 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 947.29, protein: 44.17, carbs: 59.42, fat: 60.6, satFat: 17.88, transFat: 0.35, chol: 92.38, sodium: 2495.99, fiber: 4.06, sugar: 8.21 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 937.29, protein: 43.17, carbs: 59.42, fat: 59.6, satFat: 17.88, transFat: 0.35, chol: 92.38, sodium: 2515.99, fiber: 4.06, sugar: 8.21 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 957.29, protein: 43.17, carbs: 64.42, fat: 58.6, satFat: 16.88, transFat: 0.35, chol: 92.38, sodium: 2825.99, fiber: 4.06, sugar: 8.21 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 647.29, protein: 35.17, carbs: 12.42, fat: 51.6, satFat: 13.88, transFat: 0.35, chol: 92.38, sodium: 1875.99, fiber: 2.06, sugar: 8.21 },
      ] },
    ],
  },
  'seed-jm-14-veggie': {
    itemName: "The Veggie",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Mini", breads: [
        { bread: "White Bread", servingLabel: "Mini, White Bread", cal: 567.61, protein: 24.41, carbs: 45.19, fat: 32.54, satFat: 11.83, transFat: 0.45, chol: 48.84, sodium: 831.72, fiber: 3.27, sugar: 4.08 },
        { bread: "Wheat Bread", servingLabel: "Mini, Wheat Bread", cal: 566.77, protein: 24.58, carbs: 45.39, fat: 32.62, satFat: 11.89, transFat: 0.45, chol: 48.84, sodium: 819.73, fiber: 4.81, sugar: 4.83 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Mini, Rosemary Parmesan Bread", cal: 587.95, protein: 25.86, carbs: 45.85, fat: 33.92, satFat: 12.7, transFat: 0.5, chol: 53.18, sodium: 884.91, fiber: 3.66, sugar: 4.09 },
        { bread: "Seeded Italian Bread", servingLabel: "Mini, Seeded Italian Bread", cal: 541.45, protein: 23.41, carbs: 39.32, fat: 32.64, satFat: 11.79, transFat: 0.45, chol: 48.84, sodium: 762.09, fiber: 3.03, sugar: 3.9 },
      ] },
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 953.62, protein: 39.35, carbs: 68.74, fat: 58.57, satFat: 20.23, transFat: 0.75, chol: 81.4, sodium: 1310.48, fiber: 4.93, sugar: 6.15 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 952.34, protein: 39.6, carbs: 69.05, fat: 58.7, satFat: 20.32, transFat: 0.75, chol: 81.4, sodium: 1292.33, fiber: 7.26, sugar: 7.3 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 984.43, protein: 41.55, carbs: 69.73, fat: 60.66, satFat: 21.55, transFat: 0.82, chol: 87.98, sodium: 1391.08, fiber: 5.52, sugar: 6.17 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 913.99, protein: 37.83, carbs: 59.84, fat: 58.73, satFat: 20.18, transFat: 0.74, chol: 81.4, sodium: 1204.99, fiber: 4.56, sugar: 5.88 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 879.89, protein: 33.74, carbs: 49.57, fat: 62.65, satFat: 20.4, transFat: 0.73, chol: 81.4, sodium: 1060.26, fiber: 4.52, sugar: 7.91 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1896.48, protein: 78.14, carbs: 135.12, fat: 117.04, satFat: 40.44, transFat: 1.49, chol: 162.79, sodium: 2616.73, fiber: 9.07, sugar: 10.87 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1893.93, protein: 78.65, carbs: 135.73, fat: 117.3, satFat: 40.62, transFat: 1.49, chol: 162.79, sodium: 2580.42, fiber: 13.72, sugar: 13.17 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1958.11, protein: 82.53, carbs: 137.1, fat: 121.22, satFat: 43.08, transFat: 1.63, chol: 175.95, sodium: 2777.92, fiber: 10.24, sugar: 10.91 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1817.22, protein: 75.1, carbs: 117.32, fat: 117.36, satFat: 40.34, transFat: 1.48, chol: 162.79, sodium: 2405.75, fiber: 8.34, sugar: 10.34 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1749.03, protein: 66.92, carbs: 96.78, fat: 125.2, satFat: 40.78, transFat: 1.46, chol: 162.79, sodium: 2116.29, fiber: 8.25, sugar: 14.4 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 934.89, protein: 35.74, carbs: 58.07, fat: 63.65, satFat: 23.9, transFat: 0.73, chol: 81.4, sodium: 1185.26, fiber: 4.52, sugar: 5.41 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 954.89, protein: 34.74, carbs: 59.07, fat: 64.65, satFat: 23.9, transFat: 0.73, chol: 81.4, sodium: 1075.26, fiber: 8.52, sugar: 8.41 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 944.89, protein: 36.74, carbs: 57.07, fat: 64.65, satFat: 23.9, transFat: 0.73, chol: 81.4, sodium: 1235.26, fiber: 4.52, sugar: 4.41 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 934.89, protein: 35.74, carbs: 57.07, fat: 63.65, satFat: 23.9, transFat: 0.73, chol: 81.4, sodium: 1255.26, fiber: 4.52, sugar: 4.41 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 954.89, protein: 35.74, carbs: 62.07, fat: 62.65, satFat: 22.9, transFat: 0.73, chol: 81.4, sodium: 1565.26, fiber: 4.52, sugar: 4.41 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 644.89, protein: 27.74, carbs: 10.07, fat: 55.65, satFat: 19.9, transFat: 0.73, chol: 81.4, sodium: 615.26, fiber: 2.52, sugar: 4.41 },
      ] },
    ],
  },
  'seed-jm-16-chicken-philly': {
    itemName: "Mike's Chicken Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 683.84, protein: 48.34, carbs: 72.98, fat: 21.67, satFat: 9.93, transFat: 0.25, chol: 134.52, sodium: 2187.75, fiber: 3.21, sugar: 10.64 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 682.56, protein: 48.6, carbs: 73.29, fat: 21.8, satFat: 10.02, transFat: 0.25, chol: 134.52, sodium: 2169.6, fiber: 5.54, sugar: 11.79 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 714.65, protein: 50.54, carbs: 73.97, fat: 23.76, satFat: 11.25, transFat: 0.32, chol: 141.1, sodium: 2268.35, fiber: 3.8, sugar: 10.66 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 644.21, protein: 46.82, carbs: 64.08, fat: 21.83, satFat: 9.88, transFat: 0.24, chol: 134.52, sodium: 2082.26, fiber: 2.85, sugar: 10.37 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 610.11, protein: 42.73, carbs: 53.81, fat: 25.75, satFat: 10.1, transFat: 0.23, chol: 134.52, sodium: 1937.53, fiber: 2.8, sugar: 12.4 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1367.68, protein: 96.68, carbs: 145.95, fat: 43.34, satFat: 19.86, transFat: 0.48, chol: 269.03, sodium: 4375.51, fiber: 6.41, sugar: 21.27 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1365.13, protein: 97.19, carbs: 146.56, fat: 43.6, satFat: 20.04, transFat: 0.48, chol: 269.03, sodium: 4339.2, fiber: 11.06, sugar: 23.57 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1429.31, protein: 101.07, carbs: 147.93, fat: 47.52, satFat: 22.5, transFat: 0.62, chol: 282.19, sodium: 4536.7, fiber: 7.58, sugar: 21.31 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1288.42, protein: 93.64, carbs: 128.15, fat: 43.66, satFat: 19.76, transFat: 0.47, chol: 269.03, sodium: 4164.53, fiber: 5.68, sugar: 20.74 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1220.23, protein: 85.46, carbs: 107.61, fat: 51.5, satFat: 20.2, transFat: 0.45, chol: 269.03, sodium: 3875.07, fiber: 5.59, sugar: 24.8 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 665.11, protein: 44.73, carbs: 62.31, fat: 26.75, satFat: 13.6, transFat: 0.23, chol: 134.52, sodium: 2062.53, fiber: 2.8, sugar: 9.9 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 685.11, protein: 43.73, carbs: 63.31, fat: 27.75, satFat: 13.6, transFat: 0.23, chol: 134.52, sodium: 1952.53, fiber: 6.8, sugar: 12.9 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 675.11, protein: 45.73, carbs: 61.31, fat: 27.75, satFat: 13.6, transFat: 0.23, chol: 134.52, sodium: 2112.53, fiber: 2.8, sugar: 8.9 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 665.11, protein: 44.73, carbs: 61.31, fat: 26.75, satFat: 13.6, transFat: 0.23, chol: 134.52, sodium: 2132.53, fiber: 2.8, sugar: 8.9 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 685.11, protein: 44.73, carbs: 66.31, fat: 25.75, satFat: 12.6, transFat: 0.23, chol: 134.52, sodium: 2442.53, fiber: 2.8, sugar: 8.9 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 375.11, protein: 36.73, carbs: 14.31, fat: 18.75, satFat: 9.6, transFat: 0.23, chol: 134.52, sodium: 1492.53, fiber: 0.8, sugar: 8.9 },
      ] },
    ],
  },
  'seed-jm-17-famous-philly': {
    itemName: "Mike's Famous Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 748.33, protein: 45.95, carbs: 74.01, fat: 30.32, satFat: 14.39, transFat: 0.77, chol: 120.05, sodium: 2164.61, fiber: 3.21, sugar: 9.66 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 747.05, protein: 46.21, carbs: 74.32, fat: 30.45, satFat: 14.48, transFat: 0.77, chol: 120.05, sodium: 2146.46, fiber: 5.54, sugar: 10.82 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 779.14, protein: 48.15, carbs: 75, fat: 32.41, satFat: 15.71, transFat: 0.84, chol: 126.63, sodium: 2245.21, fiber: 3.8, sugar: 9.68 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 708.7, protein: 44.43, carbs: 65.11, fat: 30.48, satFat: 14.34, transFat: 0.76, chol: 120.05, sodium: 2059.12, fiber: 2.85, sugar: 9.4 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 674.6, protein: 40.34, carbs: 54.84, fat: 34.4, satFat: 14.56, transFat: 0.75, chol: 120.05, sodium: 1914.39, fiber: 2.8, sugar: 11.43 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1496.66, protein: 91.9, carbs: 148.01, fat: 60.64, satFat: 28.78, transFat: 1.52, chol: 240.09, sodium: 4329.23, fiber: 6.41, sugar: 19.33 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1494.11, protein: 92.41, carbs: 148.62, fat: 60.9, satFat: 28.96, transFat: 1.52, chol: 240.09, sodium: 4292.92, fiber: 11.06, sugar: 21.63 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1558.29, protein: 96.29, carbs: 149.99, fat: 64.82, satFat: 31.42, transFat: 1.66, chol: 253.25, sodium: 4490.42, fiber: 7.58, sugar: 19.37 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1417.4, protein: 88.86, carbs: 130.21, fat: 60.96, satFat: 28.68, transFat: 1.51, chol: 240.09, sodium: 4118.25, fiber: 5.68, sugar: 18.8 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1349.21, protein: 80.68, carbs: 109.67, fat: 68.8, satFat: 29.12, transFat: 1.49, chol: 240.09, sodium: 3828.79, fiber: 5.59, sugar: 22.86 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 729.6, protein: 42.34, carbs: 63.34, fat: 35.4, satFat: 18.06, transFat: 0.75, chol: 120.05, sodium: 2039.39, fiber: 2.8, sugar: 8.93 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 749.6, protein: 41.34, carbs: 64.34, fat: 36.4, satFat: 18.06, transFat: 0.75, chol: 120.05, sodium: 1929.39, fiber: 6.8, sugar: 11.93 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 739.6, protein: 43.34, carbs: 62.34, fat: 36.4, satFat: 18.06, transFat: 0.75, chol: 120.05, sodium: 2089.39, fiber: 2.8, sugar: 7.93 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 729.6, protein: 42.34, carbs: 62.34, fat: 35.4, satFat: 18.06, transFat: 0.75, chol: 120.05, sodium: 2109.39, fiber: 2.8, sugar: 7.93 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 749.6, protein: 42.34, carbs: 67.34, fat: 34.4, satFat: 17.06, transFat: 0.75, chol: 120.05, sodium: 2419.39, fiber: 2.8, sugar: 7.93 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 439.6, protein: 34.34, carbs: 15.34, fat: 27.4, satFat: 14.06, transFat: 0.75, chol: 120.05, sodium: 1469.39, fiber: 0.8, sugar: 7.93 },
      ] },
    ],
  },
  'seed-jm-19-bbq-beef': {
    itemName: "BBQ Beef",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 708.07, protein: 60.08, carbs: 87.37, fat: 11.37, satFat: 3.27, transFat: 0.15, chol: 123.57, sodium: 1811.47, fiber: 3.64, sugar: 20.13 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 706.79, protein: 60.34, carbs: 87.68, fat: 11.5, satFat: 3.36, transFat: 0.15, chol: 123.57, sodium: 1793.32, fiber: 5.97, sugar: 21.28 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 738.88, protein: 62.28, carbs: 88.36, fat: 13.46, satFat: 4.59, transFat: 0.22, chol: 130.15, sodium: 1892.07, fiber: 4.22, sugar: 20.15 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 668.44, protein: 58.56, carbs: 78.47, fat: 11.53, satFat: 3.22, transFat: 0.14, chol: 123.57, sodium: 1705.98, fiber: 3.28, sugar: 19.87 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 634.34, protein: 54.47, carbs: 68.2, fat: 15.45, satFat: 3.44, transFat: 0.13, chol: 123.57, sodium: 1561.25, fiber: 3.23, sugar: 21.9 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1291.79, protein: 106.81, carbs: 163.26, fat: 20.4, satFat: 5.72, transFat: 0.25, chol: 213.35, sodium: 3228.49, fiber: 6.78, sugar: 32.91 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1289.24, protein: 107.32, carbs: 163.87, fat: 20.66, satFat: 5.9, transFat: 0.25, chol: 213.35, sodium: 3192.18, fiber: 11.43, sugar: 35.21 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1353.42, protein: 111.2, carbs: 165.24, fat: 24.58, satFat: 8.36, transFat: 0.39, chol: 226.51, sodium: 3389.68, fiber: 7.95, sugar: 32.95 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1212.53, protein: 103.77, carbs: 145.46, fat: 20.72, satFat: 5.62, transFat: 0.24, chol: 213.35, sodium: 3017.51, fiber: 6.05, sugar: 32.38 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1144.34, protein: 95.59, carbs: 124.92, fat: 28.56, satFat: 6.06, transFat: 0.22, chol: 213.35, sodium: 2728.05, fiber: 5.96, sugar: 36.44 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 689.34, protein: 56.47, carbs: 76.7, fat: 16.45, satFat: 6.94, transFat: 0.13, chol: 123.57, sodium: 1686.25, fiber: 3.23, sugar: 19.4 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 709.34, protein: 55.47, carbs: 77.7, fat: 17.45, satFat: 6.94, transFat: 0.13, chol: 123.57, sodium: 1576.25, fiber: 7.23, sugar: 22.4 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 699.34, protein: 57.47, carbs: 75.7, fat: 17.45, satFat: 6.94, transFat: 0.13, chol: 123.57, sodium: 1736.25, fiber: 3.23, sugar: 18.4 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 689.34, protein: 56.47, carbs: 75.7, fat: 16.45, satFat: 6.94, transFat: 0.13, chol: 123.57, sodium: 1756.25, fiber: 3.23, sugar: 18.4 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 709.34, protein: 56.47, carbs: 80.7, fat: 15.45, satFat: 5.94, transFat: 0.13, chol: 123.57, sodium: 2066.25, fiber: 3.23, sugar: 18.4 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 399.34, protein: 48.47, carbs: 28.7, fat: 8.45, satFat: 2.94, transFat: 0.13, chol: 123.57, sodium: 1116.25, fiber: 1.23, sugar: 18.4 },
      ] },
    ],
  },
  'seed-jm-20-pastrami-reuben': {
    itemName: "Grilled Pastrami Reuben",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 721.29, protein: 41.68, carbs: 74.24, fat: 29.77, satFat: 8.22, transFat: 0.11, chol: 99.78, sodium: 1914.94, fiber: 5.49, sugar: 9.11 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 720.01, protein: 41.94, carbs: 74.55, fat: 29.9, satFat: 8.31, transFat: 0.11, chol: 99.78, sodium: 1896.79, fiber: 7.82, sugar: 10.26 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 752.1, protein: 43.88, carbs: 75.23, fat: 31.86, satFat: 9.54, transFat: 0.18, chol: 106.36, sodium: 1995.54, fiber: 6.08, sugar: 9.13 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 681.66, protein: 40.16, carbs: 65.34, fat: 29.93, satFat: 8.17, transFat: 0.1, chol: 99.78, sodium: 1809.45, fiber: 5.13, sugar: 8.84 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 647.56, protein: 36.07, carbs: 55.07, fat: 33.85, satFat: 8.39, transFat: 0.09, chol: 99.78, sodium: 1664.72, fiber: 5.08, sugar: 10.87 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1381.15, protein: 83.36, carbs: 146.59, fat: 53.39, satFat: 15.49, transFat: 0.21, chol: 193.42, sodium: 3725.92, fiber: 10.98, sugar: 16.31 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1378.6, protein: 83.87, carbs: 147.2, fat: 53.65, satFat: 15.67, transFat: 0.21, chol: 193.42, sodium: 3689.61, fiber: 15.63, sugar: 18.61 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1442.78, protein: 87.75, carbs: 148.57, fat: 57.57, satFat: 18.13, transFat: 0.35, chol: 206.58, sodium: 3887.11, fiber: 12.15, sugar: 16.35 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1301.89, protein: 80.32, carbs: 128.79, fat: 53.71, satFat: 15.39, transFat: 0.2, chol: 193.42, sodium: 3514.94, fiber: 10.25, sugar: 15.78 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1233.7, protein: 72.14, carbs: 108.25, fat: 61.55, satFat: 15.83, transFat: 0.18, chol: 193.42, sodium: 3225.48, fiber: 10.16, sugar: 19.84 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 412.56, protein: 30.07, carbs: 15.57, fat: 26.85, satFat: 7.89, transFat: 0.09, chol: 99.78, sodium: 1219.72, fiber: 3.08, sugar: 7.37 },
      ] },
    ],
  },
  'seed-jm-26-bacon-ranch-cheesesteak': {
    itemName: "Bacon Ranch Chicken Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 923.8, protein: 55.05, carbs: 71.35, fat: 46.8, satFat: 14.77, transFat: 0.25, chol: 163.71, sodium: 2485.08, fiber: 3.74, sugar: 8.8 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 922.52, protein: 55.31, carbs: 71.66, fat: 46.93, satFat: 14.86, transFat: 0.25, chol: 163.71, sodium: 2466.93, fiber: 6.07, sugar: 9.95 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 954.61, protein: 57.25, carbs: 72.34, fat: 48.89, satFat: 16.09, transFat: 0.32, chol: 170.29, sodium: 2565.68, fiber: 4.33, sugar: 8.82 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 884.17, protein: 53.53, carbs: 62.45, fat: 46.96, satFat: 14.72, transFat: 0.24, chol: 163.71, sodium: 2379.59, fiber: 3.38, sugar: 8.53 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 850.07, protein: 49.44, carbs: 52.18, fat: 50.88, satFat: 14.94, transFat: 0.23, chol: 163.71, sodium: 2234.86, fiber: 3.33, sugar: 10.56 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1844.12, protein: 109.93, carbs: 141.95, fat: 93.56, satFat: 29.53, transFat: 0.48, chol: 327.42, sodium: 4969.2, fiber: 7.25, sugar: 17.07 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1841.57, protein: 110.44, carbs: 142.56, fat: 93.82, satFat: 29.71, transFat: 0.48, chol: 327.42, sodium: 4932.89, fiber: 11.9, sugar: 19.37 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1905.75, protein: 114.32, carbs: 143.93, fat: 97.74, satFat: 32.17, transFat: 0.62, chol: 340.58, sodium: 5130.39, fiber: 8.42, sugar: 17.11 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1764.86, protein: 106.89, carbs: 124.15, fat: 93.88, satFat: 29.43, transFat: 0.47, chol: 327.42, sodium: 4758.22, fiber: 6.52, sugar: 16.54 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1696.67, protein: 98.71, carbs: 103.61, fat: 101.72, satFat: 29.87, transFat: 0.45, chol: 327.42, sodium: 4468.76, fiber: 6.43, sugar: 20.6 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 905.07, protein: 51.44, carbs: 60.68, fat: 51.88, satFat: 18.44, transFat: 0.23, chol: 163.71, sodium: 2359.86, fiber: 3.33, sugar: 8.06 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 925.07, protein: 50.44, carbs: 61.68, fat: 52.88, satFat: 18.44, transFat: 0.23, chol: 163.71, sodium: 2249.86, fiber: 7.33, sugar: 11.06 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 915.07, protein: 52.44, carbs: 59.68, fat: 52.88, satFat: 18.44, transFat: 0.23, chol: 163.71, sodium: 2409.86, fiber: 3.33, sugar: 7.06 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 905.07, protein: 51.44, carbs: 59.68, fat: 51.88, satFat: 18.44, transFat: 0.23, chol: 163.71, sodium: 2429.86, fiber: 3.33, sugar: 7.06 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 925.07, protein: 51.44, carbs: 64.68, fat: 50.88, satFat: 17.44, transFat: 0.23, chol: 163.71, sodium: 2739.86, fiber: 3.33, sugar: 7.06 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 615.07, protein: 43.44, carbs: 12.68, fat: 43.88, satFat: 14.44, transFat: 0.23, chol: 163.71, sodium: 1789.86, fiber: 1.33, sugar: 7.06 },
      ] },
    ],
  },
  'seed-jm-31-california-chicken': {
    itemName: "California Chicken Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 931.78, protein: 49.2, carbs: 70.04, fat: 50.83, satFat: 14.36, transFat: 0.52, chol: 150.07, sodium: 2148.02, fiber: 3.74, sugar: 8.43 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 930.5, protein: 49.46, carbs: 70.35, fat: 50.96, satFat: 14.45, transFat: 0.52, chol: 150.07, sodium: 2129.86, fiber: 6.07, sugar: 9.57 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 962.59, protein: 51.4, carbs: 71.03, fat: 52.92, satFat: 15.68, transFat: 0.59, chol: 156.65, sodium: 2228.61, fiber: 4.33, sugar: 8.45 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 892.15, protein: 47.68, carbs: 61.14, fat: 50.99, satFat: 14.31, transFat: 0.51, chol: 150.07, sodium: 2042.53, fiber: 3.38, sugar: 8.16 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 858.05, protein: 43.59, carbs: 50.87, fat: 54.91, satFat: 14.53, transFat: 0.5, chol: 150.07, sodium: 1897.8, fiber: 3.33, sugar: 10.19 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1860.09, protein: 98.22, carbs: 139.32, fat: 101.62, satFat: 28.71, transFat: 1.03, chol: 300.13, sodium: 4295.07, fiber: 7.25, sugar: 16.35 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1857.54, protein: 98.73, carbs: 139.93, fat: 101.88, satFat: 28.89, transFat: 1.03, chol: 300.13, sodium: 4258.76, fiber: 11.9, sugar: 18.65 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1921.72, protein: 102.61, carbs: 141.3, fat: 105.8, satFat: 31.35, transFat: 1.17, chol: 313.29, sodium: 4456.26, fiber: 8.42, sugar: 16.39 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1780.83, protein: 95.18, carbs: 121.52, fat: 101.94, satFat: 28.61, transFat: 1.02, chol: 300.13, sodium: 4084.09, fiber: 6.52, sugar: 15.82 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1712.64, protein: 87, carbs: 100.98, fat: 109.78, satFat: 29.05, transFat: 1, chol: 300.13, sodium: 3794.63, fiber: 6.43, sugar: 19.88 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 913.05, protein: 45.59, carbs: 59.37, fat: 55.91, satFat: 18.03, transFat: 0.5, chol: 150.07, sodium: 2022.8, fiber: 3.33, sugar: 7.69 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 933.05, protein: 44.59, carbs: 60.37, fat: 56.91, satFat: 18.03, transFat: 0.5, chol: 150.07, sodium: 1912.8, fiber: 7.33, sugar: 10.69 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 923.05, protein: 46.59, carbs: 58.37, fat: 56.91, satFat: 18.03, transFat: 0.5, chol: 150.07, sodium: 2072.8, fiber: 3.33, sugar: 6.69 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 913.05, protein: 45.59, carbs: 58.37, fat: 55.91, satFat: 18.03, transFat: 0.5, chol: 150.07, sodium: 2092.8, fiber: 3.33, sugar: 6.69 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 933.05, protein: 45.59, carbs: 63.37, fat: 54.91, satFat: 17.03, transFat: 0.5, chol: 150.07, sodium: 2402.8, fiber: 3.33, sugar: 6.69 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 623.05, protein: 37.59, carbs: 11.37, fat: 47.91, satFat: 14.03, transFat: 0.5, chol: 150.07, sodium: 1452.8, fiber: 1.33, sugar: 6.69 },
      ] },
    ],
  },
  'seed-jm-42-chipotle-chicken-cheesesteak': {
    itemName: "Chipotle Chicken Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 973.27, protein: 48.8, carbs: 74.66, fat: 53.39, satFat: 14.87, transFat: 0.46, chol: 158.61, sodium: 2547.17, fiber: 3.3, sugar: 11.88 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 971.99, protein: 49.06, carbs: 74.97, fat: 53.52, satFat: 14.96, transFat: 0.46, chol: 158.61, sodium: 2529.02, fiber: 5.63, sugar: 13.03 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 1004.08, protein: 51, carbs: 75.65, fat: 55.48, satFat: 16.19, transFat: 0.53, chol: 165.19, sodium: 2627.77, fiber: 3.89, sugar: 11.9 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 933.64, protein: 47.28, carbs: 65.76, fat: 53.55, satFat: 14.82, transFat: 0.45, chol: 158.61, sodium: 2441.68, fiber: 2.94, sugar: 11.61 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 899.54, protein: 43.19, carbs: 55.49, fat: 57.47, satFat: 15.04, transFat: 0.44, chol: 158.61, sodium: 2296.95, fiber: 2.89, sugar: 13.64 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1946.52, protein: 97.61, carbs: 149.31, fat: 106.79, satFat: 29.73, transFat: 0.9, chol: 317.21, sodium: 5094.34, fiber: 6.59, sugar: 23.76 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1943.97, protein: 98.12, carbs: 149.92, fat: 107.05, satFat: 29.91, transFat: 0.9, chol: 317.21, sodium: 5058.03, fiber: 11.24, sugar: 26.06 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 2008.15, protein: 102, carbs: 151.29, fat: 110.97, satFat: 32.37, transFat: 1.04, chol: 330.37, sodium: 5255.53, fiber: 7.76, sugar: 23.8 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1867.26, protein: 94.57, carbs: 131.51, fat: 107.11, satFat: 29.63, transFat: 0.89, chol: 317.21, sodium: 4883.36, fiber: 5.86, sugar: 23.23 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1799.07, protein: 86.39, carbs: 110.97, fat: 114.95, satFat: 30.07, transFat: 0.87, chol: 317.21, sodium: 4593.9, fiber: 5.77, sugar: 27.29 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 954.54, protein: 45.19, carbs: 63.99, fat: 58.47, satFat: 18.54, transFat: 0.44, chol: 158.61, sodium: 2421.95, fiber: 2.89, sugar: 11.14 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 974.54, protein: 44.19, carbs: 64.99, fat: 59.47, satFat: 18.54, transFat: 0.44, chol: 158.61, sodium: 2311.95, fiber: 6.89, sugar: 14.14 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 964.54, protein: 46.19, carbs: 62.99, fat: 59.47, satFat: 18.54, transFat: 0.44, chol: 158.61, sodium: 2471.95, fiber: 2.89, sugar: 10.14 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 954.54, protein: 45.19, carbs: 62.99, fat: 58.47, satFat: 18.54, transFat: 0.44, chol: 158.61, sodium: 2491.95, fiber: 2.89, sugar: 10.14 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 974.54, protein: 45.19, carbs: 67.99, fat: 57.47, satFat: 17.54, transFat: 0.44, chol: 158.61, sodium: 2801.95, fiber: 2.89, sugar: 10.14 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 664.54, protein: 37.19, carbs: 15.99, fat: 50.47, satFat: 14.54, transFat: 0.44, chol: 158.61, sodium: 1851.95, fiber: 0.89, sugar: 10.14 },
      ] },
    ],
  },
  'seed-jm-43-chipotle-cheesesteak': {
    itemName: "Chipotle Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 1037.76, protein: 46.41, carbs: 75.69, fat: 62.04, satFat: 19.32, transFat: 0.98, chol: 144.14, sodium: 2524.03, fiber: 3.3, sugar: 10.91 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 1036.48, protein: 46.67, carbs: 76, fat: 62.17, satFat: 19.41, transFat: 0.98, chol: 144.14, sodium: 2505.88, fiber: 5.63, sugar: 12.06 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 1068.57, protein: 48.61, carbs: 76.68, fat: 64.13, satFat: 20.64, transFat: 1.05, chol: 150.72, sodium: 2604.63, fiber: 3.89, sugar: 10.93 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 998.13, protein: 44.89, carbs: 66.79, fat: 62.2, satFat: 19.27, transFat: 0.97, chol: 144.14, sodium: 2418.54, fiber: 2.94, sugar: 10.64 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 964.03, protein: 40.8, carbs: 56.52, fat: 66.12, satFat: 19.49, transFat: 0.96, chol: 144.14, sodium: 2273.81, fiber: 2.89, sugar: 12.67 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 2075.5, protein: 92.83, carbs: 151.37, fat: 124.09, satFat: 38.65, transFat: 1.94, chol: 288.27, sodium: 5048.06, fiber: 6.59, sugar: 21.82 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 2072.95, protein: 93.34, carbs: 151.98, fat: 124.35, satFat: 38.83, transFat: 1.94, chol: 288.27, sodium: 5011.75, fiber: 11.24, sugar: 24.12 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 2137.13, protein: 97.22, carbs: 153.35, fat: 128.27, satFat: 41.29, transFat: 2.08, chol: 301.43, sodium: 5209.25, fiber: 7.76, sugar: 21.86 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1996.24, protein: 89.79, carbs: 133.57, fat: 124.41, satFat: 38.55, transFat: 1.93, chol: 288.27, sodium: 4837.08, fiber: 5.86, sugar: 21.29 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1928.05, protein: 81.61, carbs: 113.03, fat: 132.25, satFat: 38.99, transFat: 1.91, chol: 288.27, sodium: 4547.62, fiber: 5.77, sugar: 25.35 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 1019.03, protein: 42.8, carbs: 65.02, fat: 67.12, satFat: 22.99, transFat: 0.96, chol: 144.14, sodium: 2398.81, fiber: 2.89, sugar: 10.17 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 1039.03, protein: 41.8, carbs: 66.02, fat: 68.12, satFat: 22.99, transFat: 0.96, chol: 144.14, sodium: 2288.81, fiber: 6.89, sugar: 13.17 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 1029.03, protein: 43.8, carbs: 64.02, fat: 68.12, satFat: 22.99, transFat: 0.96, chol: 144.14, sodium: 2448.81, fiber: 2.89, sugar: 9.17 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 1019.03, protein: 42.8, carbs: 64.02, fat: 67.12, satFat: 22.99, transFat: 0.96, chol: 144.14, sodium: 2468.81, fiber: 2.89, sugar: 9.17 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 1039.03, protein: 42.8, carbs: 69.02, fat: 66.12, satFat: 21.99, transFat: 0.96, chol: 144.14, sodium: 2778.81, fiber: 2.89, sugar: 9.17 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 729.03, protein: 34.8, carbs: 17.02, fat: 59.12, satFat: 18.99, transFat: 0.96, chol: 144.14, sodium: 1828.81, fiber: 0.89, sugar: 9.17 },
      ] },
    ],
  },
  'seed-jm-44-buffalo-chicken': {
    itemName: "Buffalo Chicken Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 894.46, protein: 50.31, carbs: 72.95, fat: 44.46, satFat: 14.27, transFat: 0.31, chol: 155, sodium: 3588.26, fiber: 4.14, sugar: 9.49 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 893.18, protein: 50.57, carbs: 73.26, fat: 44.59, satFat: 14.36, transFat: 0.31, chol: 155, sodium: 3570.11, fiber: 6.47, sugar: 10.64 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 925.27, protein: 52.51, carbs: 73.94, fat: 46.55, satFat: 15.59, transFat: 0.38, chol: 161.58, sodium: 3668.86, fiber: 4.72, sugar: 9.5 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 854.83, protein: 48.79, carbs: 64.05, fat: 44.62, satFat: 14.22, transFat: 0.3, chol: 155, sodium: 3482.77, fiber: 3.78, sugar: 9.22 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 820.73, protein: 44.7, carbs: 53.78, fat: 48.54, satFat: 14.44, transFat: 0.29, chol: 155, sodium: 3338.04, fiber: 3.73, sugar: 11.25 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1785.45, protein: 100.45, carbs: 145.14, fat: 88.88, satFat: 28.53, transFat: 0.6, chol: 309.99, sodium: 7175.56, fiber: 8.05, sugar: 18.45 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1782.9, protein: 100.96, carbs: 145.75, fat: 89.14, satFat: 28.71, transFat: 0.6, chol: 309.99, sodium: 7139.25, fiber: 12.7, sugar: 20.75 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1847.08, protein: 104.84, carbs: 147.12, fat: 93.06, satFat: 31.17, transFat: 0.74, chol: 323.15, sodium: 7336.75, fiber: 9.22, sugar: 18.49 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1706.19, protein: 97.41, carbs: 127.34, fat: 89.2, satFat: 28.43, transFat: 0.59, chol: 309.99, sodium: 6964.58, fiber: 7.32, sugar: 17.92 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1638, protein: 89.23, carbs: 106.8, fat: 97.04, satFat: 28.87, transFat: 0.57, chol: 309.99, sodium: 6675.12, fiber: 7.23, sugar: 21.98 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 875.73, protein: 46.7, carbs: 62.28, fat: 49.54, satFat: 17.94, transFat: 0.29, chol: 155, sodium: 3463.04, fiber: 3.73, sugar: 8.75 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 895.73, protein: 45.7, carbs: 63.28, fat: 50.54, satFat: 17.94, transFat: 0.29, chol: 155, sodium: 3353.04, fiber: 7.73, sugar: 11.75 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 885.73, protein: 47.7, carbs: 61.28, fat: 50.54, satFat: 17.94, transFat: 0.29, chol: 155, sodium: 3513.04, fiber: 3.73, sugar: 7.75 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 875.73, protein: 46.7, carbs: 61.28, fat: 49.54, satFat: 17.94, transFat: 0.29, chol: 155, sodium: 3533.04, fiber: 3.73, sugar: 7.75 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 895.73, protein: 46.7, carbs: 66.28, fat: 48.54, satFat: 16.94, transFat: 0.29, chol: 155, sodium: 3843.04, fiber: 3.73, sugar: 7.75 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 585.73, protein: 38.7, carbs: 14.28, fat: 41.54, satFat: 13.94, transFat: 0.29, chol: 155, sodium: 2893.04, fiber: 1.73, sugar: 7.75 },
      ] },
    ],
  },
  'seed-jm-54-big-kahuna-hot-veggie': {
    itemName: "Big Kahuna Hot Veggie",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 715.14, protein: 39.44, carbs: 67.28, fat: 32.57, satFat: 17.13, transFat: 0.75, chol: 81.4, sodium: 1307.09, fiber: 4.99, sugar: 5.23 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 713.86, protein: 39.7, carbs: 67.59, fat: 32.7, satFat: 17.22, transFat: 0.75, chol: 81.4, sodium: 1288.94, fiber: 7.32, sugar: 6.38 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 745.95, protein: 41.64, carbs: 68.27, fat: 34.66, satFat: 18.45, transFat: 0.82, chol: 87.98, sodium: 1387.69, fiber: 5.58, sugar: 5.25 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 675.51, protein: 37.92, carbs: 58.38, fat: 32.73, satFat: 17.08, transFat: 0.74, chol: 81.4, sodium: 1201.6, fiber: 4.63, sugar: 4.96 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 641.41, protein: 33.83, carbs: 48.11, fat: 36.65, satFat: 17.3, transFat: 0.73, chol: 81.4, sodium: 1056.87, fiber: 4.58, sugar: 6.99 },
      ] },
    ],
  },
  'seed-jm-55-big-kahuna-chicken': {
    itemName: "Big Kahuna Chicken Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 741.28, protein: 51.12, carbs: 75.22, fat: 26.1, satFat: 12.65, transFat: 0.32, chol: 147.73, sodium: 2740.95, fiber: 3.67, sugar: 11.85 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 740, protein: 51.38, carbs: 75.53, fat: 26.23, satFat: 12.74, transFat: 0.32, chol: 147.73, sodium: 2722.8, fiber: 6, sugar: 13 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 772.09, protein: 53.32, carbs: 76.21, fat: 28.19, satFat: 13.97, transFat: 0.39, chol: 154.31, sodium: 2821.55, fiber: 4.26, sugar: 11.86 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 701.65, protein: 49.6, carbs: 66.32, fat: 26.26, satFat: 12.6, transFat: 0.31, chol: 147.73, sodium: 2635.46, fiber: 3.31, sugar: 11.58 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 667.55, protein: 45.51, carbs: 56.05, fat: 30.18, satFat: 12.82, transFat: 0.3, chol: 147.73, sodium: 2490.73, fiber: 3.26, sugar: 13.61 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1482.55, protein: 102.25, carbs: 150.44, fat: 52.2, satFat: 25.3, transFat: 0.63, chol: 295.46, sodium: 5481.9, fiber: 7.33, sugar: 23.69 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1480, protein: 102.76, carbs: 151.05, fat: 52.46, satFat: 25.48, transFat: 0.63, chol: 295.46, sodium: 5445.59, fiber: 11.98, sugar: 25.99 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1544.18, protein: 106.64, carbs: 152.42, fat: 56.38, satFat: 27.94, transFat: 0.77, chol: 308.62, sodium: 5643.09, fiber: 8.5, sugar: 23.73 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1403.29, protein: 99.21, carbs: 132.64, fat: 52.52, satFat: 25.2, transFat: 0.62, chol: 295.46, sodium: 5270.92, fiber: 6.6, sugar: 23.16 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1335.1, protein: 91.03, carbs: 112.1, fat: 60.36, satFat: 25.64, transFat: 0.6, chol: 295.46, sodium: 4981.46, fiber: 6.51, sugar: 27.22 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 719.71, protein: 47.44, carbs: 63.89, fat: 31.17, satFat: 16.32, transFat: 0.3, chol: 147.73, sodium: 2615.45, fiber: 3.14, sugar: 10.81 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 739.71, protein: 46.44, carbs: 64.89, fat: 32.17, satFat: 16.32, transFat: 0.3, chol: 147.73, sodium: 2505.45, fiber: 7.14, sugar: 13.81 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 729.71, protein: 48.44, carbs: 62.89, fat: 32.17, satFat: 16.32, transFat: 0.3, chol: 147.73, sodium: 2665.45, fiber: 3.14, sugar: 9.81 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 719.71, protein: 47.44, carbs: 62.89, fat: 31.17, satFat: 16.32, transFat: 0.3, chol: 147.73, sodium: 2685.45, fiber: 3.14, sugar: 9.81 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 739.71, protein: 47.44, carbs: 67.89, fat: 30.17, satFat: 15.32, transFat: 0.3, chol: 147.73, sodium: 2995.45, fiber: 3.14, sugar: 9.81 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 429.71, protein: 39.44, carbs: 15.89, fat: 23.17, satFat: 12.32, transFat: 0.3, chol: 147.73, sodium: 2045.45, fiber: 1.14, sugar: 9.81 },
      ] },
    ],
  },
  'seed-jm-56-big-kahuna': {
    itemName: "Big Kahuna Cheese Steak",
    brand: "Jersey Mike's",
    sizes: [
      { size: "Regular", breads: [
        { bread: "White Bread", servingLabel: "Regular, White Bread", cal: 802.93, protein: 48.66, carbs: 75.59, fat: 34.74, satFat: 17.11, transFat: 0.84, chol: 133.26, sodium: 2717.53, fiber: 3.55, sugar: 10.58 },
        { bread: "Wheat Bread", servingLabel: "Regular, Wheat Bread", cal: 801.65, protein: 48.92, carbs: 75.9, fat: 34.87, satFat: 17.2, transFat: 0.84, chol: 133.26, sodium: 2699.38, fiber: 5.88, sugar: 11.73 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Regular, Rosemary Parmesan Bread", cal: 833.74, protein: 50.86, carbs: 76.58, fat: 36.83, satFat: 18.43, transFat: 0.9, chol: 139.84, sodium: 2798.13, fiber: 4.14, sugar: 10.6 },
        { bread: "Seeded Italian Bread", servingLabel: "Regular, Seeded Italian Bread", cal: 763.3, protein: 47.14, carbs: 66.69, fat: 34.9, satFat: 17.06, transFat: 0.83, chol: 133.26, sodium: 2612.04, fiber: 3.18, sugar: 10.31 },
        { bread: "Gluten Free Bread", servingLabel: "Regular, Gluten Free Bread", cal: 729.2, protein: 43.05, carbs: 56.42, fat: 38.82, satFat: 17.28, transFat: 0.82, chol: 133.26, sodium: 2467.31, fiber: 3.14, sugar: 12.34 },
      ] },
      { size: "Giant", breads: [
        { bread: "White Bread", servingLabel: "Giant, White Bread", cal: 1608.69, protein: 97.39, carbs: 151.84, fat: 69.49, satFat: 34.22, transFat: 1.67, chol: 266.52, sodium: 5435.34, fiber: 7.22, sugar: 21.45 },
        { bread: "Wheat Bread", servingLabel: "Giant, Wheat Bread", cal: 1606.14, protein: 97.9, carbs: 152.45, fat: 69.75, satFat: 34.4, transFat: 1.67, chol: 266.52, sodium: 5399.03, fiber: 11.87, sugar: 23.75 },
        { bread: "Rosemary Parmesan Bread", servingLabel: "Giant, Rosemary Parmesan Bread", cal: 1670.32, protein: 101.78, carbs: 153.82, fat: 73.67, satFat: 36.86, transFat: 1.81, chol: 279.68, sodium: 5596.53, fiber: 8.39, sugar: 21.49 },
        { bread: "Seeded Italian Bread", servingLabel: "Giant, Seeded Italian Bread", cal: 1529.43, protein: 94.35, carbs: 134.04, fat: 69.81, satFat: 34.12, transFat: 1.66, chol: 266.52, sodium: 5224.36, fiber: 6.49, sugar: 20.92 },
        { bread: "Gluten Free Bread", servingLabel: "Giant, Gluten Free Bread", cal: 1461.24, protein: 86.17, carbs: 113.5, fat: 77.65, satFat: 34.56, transFat: 1.64, chol: 266.52, sodium: 4934.9, fiber: 6.4, sugar: 24.98 },
      ] },
      { size: "Wrap", breads: [
        { bread: "White Wrap", servingLabel: "Wrap, White Wrap", cal: 784.2, protein: 45.05, carbs: 64.92, fat: 39.82, satFat: 20.78, transFat: 0.82, chol: 133.26, sodium: 2592.31, fiber: 3.14, sugar: 9.84 },
        { bread: "Wheat Wrap", servingLabel: "Wrap, Wheat Wrap", cal: 804.2, protein: 44.05, carbs: 65.92, fat: 40.82, satFat: 20.78, transFat: 0.82, chol: 133.26, sodium: 2482.31, fiber: 7.14, sugar: 12.84 },
        { bread: "Tomato Basil Wrap", servingLabel: "Wrap, Tomato Basil Wrap", cal: 794.2, protein: 46.05, carbs: 63.92, fat: 40.82, satFat: 20.78, transFat: 0.82, chol: 133.26, sodium: 2642.31, fiber: 3.14, sugar: 8.84 },
        { bread: "Spinach Herb Wrap", servingLabel: "Wrap, Spinach Herb Wrap", cal: 784.2, protein: 45.05, carbs: 63.92, fat: 39.82, satFat: 20.78, transFat: 0.82, chol: 133.26, sodium: 2662.31, fiber: 3.14, sugar: 8.84 },
        { bread: "Garlic Herb Wheat Wrap", servingLabel: "Wrap, Garlic Herb Wheat Wrap", cal: 804.2, protein: 45.05, carbs: 68.92, fat: 38.82, satFat: 19.78, transFat: 0.82, chol: 133.26, sodium: 2972.31, fiber: 3.14, sugar: 8.84 },
      ] },
      { size: "Bowl", breads: [
        { bread: "Bowl", servingLabel: "Bowl, Bowl", cal: 494.2, protein: 37.05, carbs: 16.92, fat: 31.82, satFat: 16.78, transFat: 0.82, chol: 133.26, sodium: 2022.31, fiber: 1.14, sugar: 8.84 },
      ] },
    ],
  },
};
