// AUTO-GENERATED from Jersey Mike's official "Menu Label Report" (Canadian portal —
// the US nutrition page is a JS-only interactive tool with no static export).
// Mechanically parsed from the source PDF's text table, not hand-transcribed, to
// avoid transcription error across ~27 subs x up to 3 sizes x up to 6 breads.
//
// Plugs into the generic SubBuilder picker (src/components/SizePicker/SubBuilder.tsx)
// — the same size-then-bread config system any sub shop with these variation axes
// can use (Jimmy John's, Subway, Firehouse Subs, etc. would each get their own data
// file like this one, merged into the shared SUB_FAMILIES registry).
import type { SubFamily } from '../components/SizePicker/SubBuilder';

export const JERSEY_MIKES_SUB_FAMILIES: Record<string, SubFamily> = {
  'seed-jm-1-blt': {
    itemName: "BLT",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 460, protein: 16, carbs: 41, fat: 26, satFat: 6, transFat: 0, chol: 40, sodium: 960, fiber: 2, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 460, protein: 17, carbs: 41, fat: 26, satFat: 6, transFat: 0, chol: 40, sodium: 940, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 470, protein: 18, carbs: 41, fat: 27, satFat: 7, transFat: 0, chol: 45, sodium: 1010, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 750, protein: 25, carbs: 60, fat: 46, satFat: 10, transFat: 0.2, chol: 70, sodium: 1480, fiber: 4, sugar: 5 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 750, protein: 26, carbs: 60, fat: 46, satFat: 10, transFat: 0.2, chol: 70, sodium: 1450, fiber: 5, sugar: 6 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 770, protein: 27, carbs: 61, fat: 47, satFat: 11, transFat: 0.3, chol: 75, sodium: 1550, fiber: 4, sugar: 5 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 770, protein: 23, carbs: 53, fat: 53, satFat: 13, transFat: 0.3, chol: 70, sodium: 1460, fiber: 4, sugar: 5 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 750, protein: 23, carbs: 51, fat: 52, satFat: 13, transFat: 0.3, chol: 70, sodium: 1330, fiber: 8, sugar: 5 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 460, protein: 15, carbs: 5, fat: 43, satFat: 10, transFat: 0.2, chol: 70, sodium: 820, fiber: 2, sugar: 3 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1480, protein: 49, carbs: 119, fat: 91, satFat: 20, transFat: 0.5, chol: 140, sodium: 2960, fiber: 7, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1480, protein: 52, carbs: 119, fat: 91, satFat: 20, transFat: 0.5, chol: 140, sodium: 2900, fiber: 10, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1540, protein: 53, carbs: 121, fat: 95, satFat: 22, transFat: 0.5, chol: 150, sodium: 3100, fiber: 7, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-2-jersey-shore': {
    itemName: "Jersey Shore's Favorite",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 450, protein: 21, carbs: 42, fat: 23, satFat: 7, transFat: 0, chol: 40, sodium: 1150, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 460, protein: 22, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 40, sodium: 1130, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 470, protein: 22, carbs: 43, fat: 24, satFat: 7, transFat: 0, chol: 45, sodium: 1200, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 770, protein: 37, carbs: 63, fat: 42, satFat: 11, transFat: 0.3, chol: 80, sodium: 2120, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 780, protein: 39, carbs: 63, fat: 42, satFat: 11, transFat: 0.3, chol: 80, sodium: 2100, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 790, protein: 39, carbs: 64, fat: 43, satFat: 12, transFat: 0.4, chol: 85, sodium: 2190, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 800, protein: 36, carbs: 56, fat: 49, satFat: 14, transFat: 0.4, chol: 80, sodium: 2100, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 780, protein: 36, carbs: 54, fat: 48, satFat: 14, transFat: 0.4, chol: 80, sodium: 1970, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 490, protein: 28, carbs: 8, fat: 39, satFat: 11, transFat: 0.3, chol: 80, sodium: 1460, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1310, protein: 47, carbs: 122, fat: 72, satFat: 16, transFat: 0.4, chol: 80, sodium: 2850, fiber: 7, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1320, protein: 50, carbs: 122, fat: 72, satFat: 16, transFat: 0.3, chol: 80, sodium: 2790, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1360, protein: 52, carbs: 124, fat: 75, satFat: 18, transFat: 0.5, chol: 90, sodium: 2990, fiber: 8, sugar: 11 },
      ] },
    ],
  },
  'seed-jm-3-ham-provolone': {
    itemName: "Ham and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 450, protein: 21, carbs: 42, fat: 23, satFat: 7, transFat: 0, chol: 45, sodium: 1180, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 460, protein: 22, carbs: 42, fat: 23, satFat: 7, transFat: 0, chol: 45, sodium: 1170, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 470, protein: 23, carbs: 42, fat: 24, satFat: 7, transFat: 0, chol: 45, sodium: 1230, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 750, protein: 36, carbs: 62, fat: 41, satFat: 11, transFat: 0.3, chol: 75, sodium: 2050, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 760, protein: 38, carbs: 62, fat: 41, satFat: 11, transFat: 0.3, chol: 75, sodium: 2020, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 780, protein: 38, carbs: 63, fat: 43, satFat: 12, transFat: 0.4, chol: 80, sodium: 2120, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 790, protein: 35, carbs: 55, fat: 49, satFat: 14, transFat: 0.4, chol: 75, sodium: 2020, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 770, protein: 35, carbs: 53, fat: 48, satFat: 14, transFat: 0.4, chol: 75, sodium: 1890, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 480, protein: 27, carbs: 7, fat: 39, satFat: 11, transFat: 0.3, chol: 75, sodium: 1380, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1440, protein: 63, carbs: 122, fat: 79, satFat: 20, transFat: 0.5, chol: 125, sodium: 3660, fiber: 7, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1450, protein: 66, carbs: 123, fat: 79, satFat: 20, transFat: 0.5, chol: 125, sodium: 3610, fiber: 10, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1490, protein: 68, carbs: 124, fat: 82, satFat: 22, transFat: 0.5, chol: 135, sodium: 3810, fiber: 8, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-4-number-four': {
    itemName: "The Number Four",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 450, protein: 21, carbs: 42, fat: 23, satFat: 7, transFat: 0, chol: 40, sodium: 1190, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 460, protein: 23, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 40, sodium: 1170, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 470, protein: 23, carbs: 43, fat: 24, satFat: 7, transFat: 0, chol: 45, sodium: 1240, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 750, protein: 35, carbs: 63, fat: 41, satFat: 11, transFat: 0.4, chol: 70, sodium: 1990, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 760, protein: 37, carbs: 63, fat: 41, satFat: 11, transFat: 0.3, chol: 70, sodium: 1970, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 790, protein: 38, carbs: 64, fat: 43, satFat: 12, transFat: 0.4, chol: 75, sodium: 2070, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 790, protein: 34, carbs: 56, fat: 49, satFat: 14, transFat: 0.4, chol: 70, sodium: 1970, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 770, protein: 34, carbs: 54, fat: 48, satFat: 14, transFat: 0.4, chol: 70, sodium: 1840, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 480, protein: 26, carbs: 8, fat: 39, satFat: 11, transFat: 0.3, chol: 70, sodium: 1330, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1440, protein: 62, carbs: 124, fat: 79, satFat: 20, transFat: 0.5, chol: 120, sodium: 3560, fiber: 7, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1450, protein: 65, carbs: 124, fat: 79, satFat: 20, transFat: 0.5, chol: 120, sodium: 3500, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1490, protein: 66, carbs: 125, fat: 82, satFat: 22, transFat: 0.5, chol: 130, sodium: 3700, fiber: 8, sugar: 11 },
      ] },
    ],
  },
  'seed-jm-5-super-sub': {
    itemName: "The Super Sub",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 470, protein: 25, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 55, sodium: 1440, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 480, protein: 26, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 55, sodium: 1420, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 500, protein: 26, carbs: 43, fat: 25, satFat: 8, transFat: 0, chol: 55, sodium: 1490, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 780, protein: 40, carbs: 63, fat: 42, satFat: 11, transFat: 0.4, chol: 85, sodium: 2300, fiber: 4, sugar: 7 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 790, protein: 41, carbs: 64, fat: 42, satFat: 11, transFat: 0.3, chol: 85, sodium: 2270, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 810, protein: 42, carbs: 64, fat: 44, satFat: 12, transFat: 0.4, chol: 90, sodium: 2370, fiber: 4, sugar: 7 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 810, protein: 39, carbs: 56, fat: 49, satFat: 15, transFat: 0.4, chol: 85, sodium: 2280, fiber: 4, sugar: 7 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 790, protein: 39, carbs: 54, fat: 48, satFat: 14, transFat: 0.4, chol: 85, sodium: 2150, fiber: 8, sugar: 7 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 500, protein: 31, carbs: 8, fat: 39, satFat: 11, transFat: 0.3, chol: 85, sodium: 1640, fiber: 2, sugar: 5 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1480, protein: 70, carbs: 124, fat: 80, satFat: 21, transFat: 0.5, chol: 145, sodium: 4100, fiber: 7, sugar: 12 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1490, protein: 73, carbs: 125, fat: 80, satFat: 21, transFat: 0.5, chol: 145, sodium: 4050, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1530, protein: 74, carbs: 126, fat: 83, satFat: 23, transFat: 0.5, chol: 155, sodium: 4250, fiber: 8, sugar: 12 },
      ] },
    ],
  },
  'seed-jm-6-roast-beef-provolone': {
    itemName: "Roast Beef and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 510, protein: 32, carbs: 41, fat: 25, satFat: 8, transFat: 0, chol: 70, sodium: 820, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 520, protein: 33, carbs: 42, fat: 25, satFat: 7, transFat: 0, chol: 70, sodium: 800, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 530, protein: 33, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 75, sodium: 860, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 820, protein: 48, carbs: 61, fat: 44, satFat: 12, transFat: 0.4, chol: 105, sodium: 1220, fiber: 4, sugar: 5 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 830, protein: 50, carbs: 61, fat: 44, satFat: 12, transFat: 0.4, chol: 105, sodium: 1190, fiber: 5, sugar: 6 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 850, protein: 50, carbs: 62, fat: 46, satFat: 13, transFat: 0.5, chol: 110, sodium: 1290, fiber: 4, sugar: 5 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 860, protein: 47, carbs: 54, fat: 52, satFat: 16, transFat: 0.5, chol: 105, sodium: 1190, fiber: 4, sugar: 5 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 840, protein: 47, carbs: 52, fat: 51, satFat: 15, transFat: 0.5, chol: 105, sodium: 1060, fiber: 8, sugar: 5 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 550, protein: 39, carbs: 6, fat: 42, satFat: 12, transFat: 0.4, chol: 105, sodium: 550, fiber: 2, sugar: 3 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1610, protein: 93, carbs: 121, fat: 85, satFat: 23, transFat: 0.5, chol: 205, sodium: 2380, fiber: 7, sugar: 9 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1620, protein: 96, carbs: 121, fat: 86, satFat: 23, transFat: 0.5, chol: 205, sodium: 2320, fiber: 10, sugar: 11 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1660, protein: 97, carbs: 122, fat: 89, satFat: 25, transFat: 1, chol: 210, sodium: 2520, fiber: 8, sugar: 9 },
      ] },
    ],
  },
  'seed-jm-7-turkey-provolone': {
    itemName: "Turkey and Provolone",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 460, protein: 21, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 45, sodium: 990, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 460, protein: 23, carbs: 43, fat: 23, satFat: 7, transFat: 0, chol: 45, sodium: 980, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 480, protein: 23, carbs: 43, fat: 25, satFat: 8, transFat: 0, chol: 45, sodium: 1040, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 780, protein: 36, carbs: 64, fat: 43, satFat: 12, transFat: 0.3, chol: 75, sodium: 1680, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 790, protein: 38, carbs: 64, fat: 43, satFat: 12, transFat: 0.3, chol: 75, sodium: 1650, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 800, protein: 39, carbs: 65, fat: 44, satFat: 13, transFat: 0.4, chol: 80, sodium: 1750, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 810, protein: 35, carbs: 56, fat: 50, satFat: 15, transFat: 0.4, chol: 75, sodium: 1650, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 780, protein: 35, carbs: 54, fat: 49, satFat: 14, transFat: 0.4, chol: 75, sodium: 1520, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 500, protein: 27, carbs: 8, fat: 40, satFat: 11, transFat: 0.3, chol: 75, sodium: 1010, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1470, protein: 64, carbs: 125, fat: 81, satFat: 21, transFat: 0.5, chol: 130, sodium: 3050, fiber: 7, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1480, protein: 67, carbs: 125, fat: 81, satFat: 21, transFat: 0.5, chol: 130, sodium: 2990, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1530, protein: 68, carbs: 126, fat: 85, satFat: 23, transFat: 0.5, chol: 140, sodium: 3190, fiber: 8, sugar: 11 },
      ] },
    ],
  },
  'seed-jm-8-club-sub': {
    itemName: "Club Sub",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 500, protein: 26, carbs: 43, fat: 26, satFat: 8, transFat: 0, chol: 60, sodium: 1360, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 510, protein: 28, carbs: 43, fat: 26, satFat: 8, transFat: 0, chol: 60, sodium: 1340, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 530, protein: 28, carbs: 43, fat: 28, satFat: 9, transFat: 0, chol: 60, sodium: 1400, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 850, protein: 44, carbs: 63, fat: 48, satFat: 14, transFat: 0.3, chol: 100, sodium: 2270, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 860, protein: 45, carbs: 64, fat: 48, satFat: 14, transFat: 0.3, chol: 100, sodium: 2240, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 880, protein: 46, carbs: 64, fat: 50, satFat: 15, transFat: 0.4, chol: 105, sodium: 2340, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 880, protein: 43, carbs: 56, fat: 55, satFat: 17, transFat: 0.4, chol: 100, sodium: 2240, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 860, protein: 43, carbs: 54, fat: 54, satFat: 16, transFat: 0.4, chol: 100, sodium: 2110, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 570, protein: 35, carbs: 8, fat: 45, satFat: 13, transFat: 0.3, chol: 100, sodium: 1600, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1610, protein: 75, carbs: 124, fat: 92, satFat: 25, transFat: 0.5, chol: 165, sodium: 3950, fiber: 7, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1620, protein: 79, carbs: 124, fat: 92, satFat: 25, transFat: 0.5, chol: 165, sodium: 3890, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1660, protein: 80, carbs: 126, fat: 95, satFat: 27, transFat: 0.5, chol: 175, sodium: 4090, fiber: 8, sugar: 11 },
      ] },
    ],
  },
  'seed-jm-9-club-supreme': {
    itemName: "Club Supreme",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 510, protein: 29, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 65, sodium: 1020, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 510, protein: 30, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 65, sodium: 1000, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 530, protein: 31, carbs: 43, fat: 27, satFat: 8, transFat: 0, chol: 65, sodium: 1070, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 870, protein: 48, carbs: 63, fat: 48, satFat: 13, transFat: 0.3, chol: 105, sodium: 1730, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 870, protein: 49, carbs: 63, fat: 48, satFat: 13, transFat: 0.3, chol: 105, sodium: 1700, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 900, protein: 50, carbs: 64, fat: 50, satFat: 14, transFat: 0.3, chol: 110, sodium: 1800, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 900, protein: 46, carbs: 56, fat: 56, satFat: 16, transFat: 0.4, chol: 105, sodium: 1700, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 880, protein: 46, carbs: 54, fat: 55, satFat: 16, transFat: 0.4, chol: 105, sodium: 1570, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 590, protein: 38, carbs: 8, fat: 46, satFat: 13, transFat: 0.3, chol: 105, sodium: 1060, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1640, protein: 82, carbs: 124, fat: 92, satFat: 24, transFat: 1, chol: 175, sodium: 3090, fiber: 7, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1640, protein: 85, carbs: 124, fat: 92, satFat: 24, transFat: 0.5, chol: 175, sodium: 3030, fiber: 10, sugar: 13 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1680, protein: 86, carbs: 125, fat: 95, satFat: 26, transFat: 0.5, chol: 185, sodium: 3230, fiber: 8, sugar: 11 },
      ] },
    ],
  },
  'seed-jm-10-tuna-fish': {
    itemName: "Tuna Fish",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 570, protein: 18, carbs: 41, fat: 38, satFat: 6, transFat: 0, chol: 45, sodium: 810, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 580, protein: 20, carbs: 41, fat: 38, satFat: 6, transFat: 0, chol: 45, sodium: 790, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 590, protein: 20, carbs: 42, fat: 39, satFat: 6, transFat: 0, chol: 50, sodium: 850, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 970, protein: 30, carbs: 61, fat: 68, satFat: 10, transFat: 0.3, chol: 80, sodium: 1270, fiber: 4, sugar: 5 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 970, protein: 31, carbs: 62, fat: 68, satFat: 10, transFat: 0.3, chol: 80, sodium: 1240, fiber: 6, sugar: 6 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 1000, protein: 32, carbs: 62, fat: 70, satFat: 11, transFat: 0.4, chol: 85, sodium: 1340, fiber: 5, sugar: 5 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 1010, protein: 29, carbs: 54, fat: 76, satFat: 13, transFat: 0.4, chol: 80, sodium: 1240, fiber: 4, sugar: 5 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 980, protein: 29, carbs: 52, fat: 75, satFat: 13, transFat: 0.4, chol: 80, sodium: 1110, fiber: 8, sugar: 5 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 700, protein: 21, carbs: 6, fat: 66, satFat: 10, transFat: 0.3, chol: 80, sodium: 600, fiber: 2, sugar: 3 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1860, protein: 56, carbs: 121, fat: 130, satFat: 19, transFat: 1, chol: 140, sodium: 2430, fiber: 8, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1870, protein: 59, carbs: 121, fat: 130, satFat: 19, transFat: 1, chol: 140, sodium: 2380, fiber: 11, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1910, protein: 60, carbs: 123, fat: 133, satFat: 21, transFat: 1, chol: 150, sodium: 2580, fiber: 8, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-11-stickball': {
    itemName: "Stickball Special",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 480, protein: 20, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 45, sodium: 1150, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 490, protein: 22, carbs: 42, fat: 26, satFat: 6, transFat: 0, chol: 45, sodium: 1140, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 500, protein: 22, carbs: 42, fat: 27, satFat: 9, transFat: 0, chol: 45, sodium: 1200, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 830, protein: 37, carbs: 62, fat: 48, satFat: 14, transFat: 0.4, chol: 85, sodium: 2200, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 850, protein: 39, carbs: 62, fat: 49, satFat: 14, transFat: 0.4, chol: 85, sodium: 2180, fiber: 5, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 860, protein: 39, carbs: 63, fat: 50, satFat: 15, transFat: 0.5, chol: 90, sodium: 2280, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 870, protein: 36, carbs: 55, fat: 56, satFat: 17, transFat: 0.5, chol: 85, sodium: 2180, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 840, protein: 36, carbs: 53, fat: 55, satFat: 17, transFat: 0.5, chol: 85, sodium: 2050, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 550, protein: 28, carbs: 7, fat: 46, satFat: 14, transFat: 0.4, chol: 85, sodium: 1540, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1570, protein: 65, carbs: 122, fat: 91, satFat: 25, transFat: 1, chol: 145, sodium: 3880, fiber: 7, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1580, protein: 68, carbs: 123, fat: 91, satFat: 25, transFat: 1, chol: 145, sodium: 3830, fiber: 10, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1630, protein: 69, carbs: 124, fat: 95, satFat: 27, transFat: 1, chol: 155, sodium: 4030, fiber: 8, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-12-cancro': {
    itemName: "Cancro Special",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 510, protein: 28, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 65, sodium: 850, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 510, protein: 30, carbs: 42, fat: 26, satFat: 8, transFat: 0, chol: 65, sodium: 840, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 530, protein: 30, carbs: 42, fat: 27, satFat: 9, transFat: 0, chol: 65, sodium: 900, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 880, protein: 51, carbs: 62, fat: 48, satFat: 14, transFat: 0.5, chol: 115, sodium: 1400, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 890, protein: 52, carbs: 62, fat: 49, satFat: 14, transFat: 0.5, chol: 115, sodium: 1370, fiber: 6, sugar: 6 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 910, protein: 53, carbs: 63, fat: 50, satFat: 15, transFat: 0.5, chol: 120, sodium: 1470, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 910, protein: 49, carbs: 54, fat: 56, satFat: 17, transFat: 0.5, chol: 115, sodium: 1370, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 880, protein: 49, carbs: 52, fat: 55, satFat: 17, transFat: 0.5, chol: 115, sodium: 1240, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 600, protein: 41, carbs: 6, fat: 46, satFat: 14, transFat: 0.5, chol: 115, sodium: 730, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1650, protein: 88, carbs: 122, fat: 92, satFat: 25, transFat: 1, chol: 195, sodium: 2610, fiber: 7, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1660, protein: 91, carbs: 122, fat: 92, satFat: 25, transFat: 1, chol: 195, sodium: 2560, fiber: 10, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1700, protein: 92, carbs: 123, fat: 95, satFat: 27, transFat: 1, chol: 205, sodium: 2760, fiber: 8, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-13-original-italian': {
    itemName: "The Original Italian",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 540, protein: 28, carbs: 43, fat: 29, satFat: 9, transFat: 0, chol: 65, sodium: 1700, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 540, protein: 29, carbs: 43, fat: 29, satFat: 9, transFat: 0, chol: 65, sodium: 1680, fiber: 4, sugar: 5 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 560, protein: 30, carbs: 44, fat: 30, satFat: 10, transFat: 0, chol: 70, sodium: 1750, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 900, protein: 45, carbs: 64, fat: 52, satFat: 15, transFat: 0.5, chol: 110, sodium: 2740, fiber: 4, sugar: 7 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 900, protein: 47, carbs: 64, fat: 52, satFat: 15, transFat: 0.5, chol: 110, sodium: 2720, fiber: 6, sugar: 8 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 920, protein: 47, carbs: 65, fat: 53, satFat: 16, transFat: 0.5, chol: 115, sodium: 2820, fiber: 4, sugar: 7 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 930, protein: 44, carbs: 57, fat: 59, satFat: 18, transFat: 0.5, chol: 110, sodium: 2720, fiber: 4, sugar: 7 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 900, protein: 44, carbs: 55, fat: 58, satFat: 18, transFat: 0.5, chol: 110, sodium: 2590, fiber: 8, sugar: 7 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 620, protein: 36, carbs: 9, fat: 49, satFat: 15, transFat: 0.5, chol: 110, sodium: 2080, fiber: 2, sugar: 5 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1700, protein: 80, carbs: 125, fat: 99, satFat: 28, transFat: 1, chol: 190, sodium: 4960, fiber: 7, sugar: 12 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1710, protein: 83, carbs: 126, fat: 99, satFat: 28, transFat: 1, chol: 190, sodium: 4910, fiber: 11, sugar: 14 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1750, protein: 85, carbs: 127, fat: 102, satFat: 30, transFat: 1, chol: 200, sodium: 5110, fiber: 8, sugar: 12 },
      ] },
    ],
  },
  'seed-jm-14-veggie': {
    itemName: "The Veggie",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Mini', breads: [
        { bread: 'White Sub', servingLabel: 'Mini, White Sub', cal: 550, protein: 22, carbs: 43, fat: 32, satFat: 13, transFat: 1, chol: 45, sodium: 750, fiber: 3, sugar: 4 },
        { bread: 'Wheat Sub', servingLabel: 'Mini, Wheat Sub', cal: 550, protein: 24, carbs: 43, fat: 31, satFat: 13, transFat: 1, chol: 45, sodium: 730, fiber: 4, sugar: 4 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Mini, Rosemary Parmesan', cal: 570, protein: 24, carbs: 43, fat: 33, satFat: 13, transFat: 1, chol: 50, sodium: 800, fiber: 3, sugar: 4 },
      ] },
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 900, protein: 36, carbs: 64, fat: 56, satFat: 22, transFat: 1, chol: 80, sodium: 1160, fiber: 4, sugar: 6 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 910, protein: 38, carbs: 64, fat: 56, satFat: 22, transFat: 1, chol: 80, sodium: 1140, fiber: 6, sugar: 7 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 940, protein: 39, carbs: 65, fat: 58, satFat: 23, transFat: 1, chol: 85, sodium: 1240, fiber: 4, sugar: 6 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 940, protein: 35, carbs: 57, fat: 64, satFat: 25, transFat: 1, chol: 80, sodium: 1140, fiber: 4, sugar: 6 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 910, protein: 35, carbs: 55, fat: 63, satFat: 25, transFat: 1, chol: 80, sodium: 1010, fiber: 8, sugar: 6 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 630, protein: 27, carbs: 9, fat: 54, satFat: 22, transFat: 1, chol: 80, sodium: 500, fiber: 2, sugar: 4 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1810, protein: 72, carbs: 126, fat: 113, satFat: 44, transFat: 2, chol: 155, sodium: 2330, fiber: 7, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1830, protein: 75, carbs: 127, fat: 113, satFat: 44, transFat: 2, chol: 155, sodium: 2270, fiber: 11, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1860, protein: 77, carbs: 128, fat: 116, satFat: 46, transFat: 2, chol: 165, sodium: 2470, fiber: 8, sugar: 10 },
      ] },
    ],
  },
  'seed-jm-16-chicken-philly': {
    itemName: "Chicken Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 600, protein: 51, carbs: 68, fat: 14, satFat: 7, transFat: 0.3, chol: 115, sodium: 2030, fiber: 3, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 600, protein: 52, carbs: 68, fat: 14, satFat: 7, transFat: 0.3, chol: 115, sodium: 2000, fiber: 5, sugar: 11 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 630, protein: 53, carbs: 69, fat: 16, satFat: 8, transFat: 0.4, chol: 120, sodium: 2100, fiber: 3, sugar: 10 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 630, protein: 50, carbs: 60, fat: 22, satFat: 10, transFat: 0.4, chol: 115, sodium: 2010, fiber: 3, sugar: 10 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 610, protein: 50, carbs: 58, fat: 21, satFat: 9, transFat: 0.4, chol: 115, sodium: 1880, fiber: 7, sugar: 10 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 320, protein: 42, carbs: 12, fat: 12, satFat: 6, transFat: 0.3, chol: 115, sodium: 1370, fiber: 1, sugar: 8 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1180, protein: 101, carbs: 136, fat: 27, satFat: 12, transFat: 1, chol: 225, sodium: 4000, fiber: 6, sugar: 20 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1190, protein: 104, carbs: 136, fat: 27, satFat: 12, transFat: 1, chol: 225, sodium: 3950, fiber: 9, sugar: 22 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1240, protein: 105, carbs: 137, fat: 31, satFat: 15, transFat: 1, chol: 235, sodium: 4150, fiber: 6, sugar: 20 },
      ] },
    ],
  },
  'seed-jm-17-steak-philly': {
    itemName: "Steak Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 660, protein: 44, carbs: 67, fat: 25, satFat: 11, transFat: 0.3, chol: 120, sodium: 2090, fiber: 3, sugar: 10 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 670, protein: 46, carbs: 67, fat: 25, satFat: 11, transFat: 0.3, chol: 120, sodium: 2060, fiber: 5, sugar: 11 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 680, protein: 46, carbs: 67, fat: 26, satFat: 12, transFat: 0.4, chol: 125, sodium: 2160, fiber: 3, sugar: 10 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 690, protein: 43, carbs: 59, fat: 32, satFat: 14, transFat: 0.4, chol: 120, sodium: 2060, fiber: 3, sugar: 10 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 670, protein: 43, carbs: 57, fat: 31, satFat: 14, transFat: 0.4, chol: 120, sodium: 1930, fiber: 7, sugar: 10 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 380, protein: 35, carbs: 11, fat: 22, satFat: 11, transFat: 0.3, chol: 120, sodium: 1420, fiber: 1, sugar: 8 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1320, protein: 89, carbs: 134, fat: 49, satFat: 22, transFat: 1, chol: 245, sodium: 4200, fiber: 6, sugar: 20 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1330, protein: 92, carbs: 134, fat: 49, satFat: 22, transFat: 1, chol: 245, sodium: 4150, fiber: 9, sugar: 22 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1380, protein: 93, carbs: 135, fat: 53, satFat: 25, transFat: 1, chol: 255, sodium: 4350, fiber: 6, sugar: 20 },
      ] },
    ],
  },
  'seed-jm-26-chicken-bacon-ranch': {
    itemName: "Chicken Bacon Ranch Cheesesteak",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 850, protein: 56, carbs: 67, fat: 40, satFat: 11, transFat: 1, chol: 140, sodium: 2350, fiber: 3, sugar: 8 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 850, protein: 57, carbs: 67, fat: 40, satFat: 11, transFat: 1, chol: 140, sodium: 2320, fiber: 5, sugar: 9 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 870, protein: 58, carbs: 68, fat: 41, satFat: 12, transFat: 1, chol: 145, sodium: 2420, fiber: 4, sugar: 8 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 870, protein: 55, carbs: 59, fat: 47, satFat: 14, transFat: 1, chol: 140, sodium: 2320, fiber: 3, sugar: 8 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 850, protein: 55, carbs: 57, fat: 46, satFat: 14, transFat: 1, chol: 140, sodium: 2190, fiber: 7, sugar: 8 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 560, protein: 47, carbs: 11, fat: 37, satFat: 11, transFat: 0.5, chol: 140, sodium: 1680, fiber: 1, sugar: 6 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1680, protein: 111, carbs: 133, fat: 79, satFat: 22, transFat: 2, chol: 285, sodium: 4700, fiber: 6, sugar: 16 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1680, protein: 114, carbs: 133, fat: 79, satFat: 22, transFat: 2, chol: 285, sodium: 4650, fiber: 10, sugar: 18 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1740, protein: 116, carbs: 135, fat: 83, satFat: 24, transFat: 2, chol: 295, sodium: 4840, fiber: 7, sugar: 16 },
      ] },
    ],
  },
  'seed-jm-31-california-chicken': {
    itemName: "California Chicken Cheesesteak",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 810, protein: 51, carbs: 64, fat: 40, satFat: 10, transFat: 0.5, chol: 135, sodium: 1990, fiber: 3, sugar: 7 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 820, protein: 53, carbs: 64, fat: 40, satFat: 10, transFat: 0.5, chol: 135, sodium: 1960, fiber: 5, sugar: 8 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 830, protein: 53, carbs: 65, fat: 41, satFat: 11, transFat: 0.5, chol: 140, sodium: 2060, fiber: 4, sugar: 7 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 840, protein: 50, carbs: 56, fat: 47, satFat: 13, transFat: 0.5, chol: 135, sodium: 1960, fiber: 3, sugar: 7 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 820, protein: 50, carbs: 54, fat: 46, satFat: 12, transFat: 0.5, chol: 135, sodium: 1830, fiber: 7, sugar: 7 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 530, protein: 42, carbs: 8, fat: 37, satFat: 9, transFat: 0.5, chol: 135, sodium: 1320, fiber: 1, sugar: 5 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1620, protein: 102, carbs: 127, fat: 79, satFat: 20, transFat: 1, chol: 270, sodium: 3980, fiber: 6, sugar: 13 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1630, protein: 105, carbs: 127, fat: 80, satFat: 20, transFat: 1, chol: 270, sodium: 3920, fiber: 10, sugar: 15 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1670, protein: 107, carbs: 128, fat: 83, satFat: 22, transFat: 1, chol: 280, sodium: 4120, fiber: 7, sugar: 13 },
      ] },
    ],
  },
  'seed-jm-42-chipotle-chicken-philly': {
    itemName: "Chipotle Chicken Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 880, protein: 51, carbs: 70, fat: 45, satFat: 11, transFat: 0.5, chol: 135, sodium: 2360, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 880, protein: 52, carbs: 70, fat: 45, satFat: 11, transFat: 0.5, chol: 135, sodium: 2330, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 910, protein: 53, carbs: 70, fat: 47, satFat: 12, transFat: 0.5, chol: 140, sodium: 2430, fiber: 3, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 920, protein: 50, carbs: 62, fat: 53, satFat: 14, transFat: 0.5, chol: 135, sodium: 2330, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 890, protein: 50, carbs: 60, fat: 52, satFat: 14, transFat: 0.5, chol: 135, sodium: 2200, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 610, protein: 42, carbs: 14, fat: 43, satFat: 11, transFat: 0.5, chol: 135, sodium: 1690, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1770, protein: 102, carbs: 139, fat: 91, satFat: 22, transFat: 1, chol: 270, sodium: 4720, fiber: 6, sugar: 23 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1780, protein: 105, carbs: 140, fat: 91, satFat: 22, transFat: 1, chol: 270, sodium: 4670, fiber: 9, sugar: 24 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1820, protein: 106, carbs: 141, fat: 94, satFat: 24, transFat: 1, chol: 280, sodium: 4870, fiber: 7, sugar: 23 },
      ] },
    ],
  },
  'seed-jm-43-chipotle-steak-philly': {
    itemName: "Chipotle Steak Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 950, protein: 45, carbs: 68, fat: 56, satFat: 16, transFat: 0.5, chol: 145, sodium: 2450, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 950, protein: 46, carbs: 69, fat: 56, satFat: 16, transFat: 0.5, chol: 145, sodium: 2420, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 980, protein: 47, carbs: 69, fat: 58, satFat: 17, transFat: 0.5, chol: 150, sodium: 2520, fiber: 3, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 990, protein: 44, carbs: 61, fat: 64, satFat: 19, transFat: 0.5, chol: 145, sodium: 2420, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 970, protein: 44, carbs: 59, fat: 63, satFat: 19, transFat: 0.5, chol: 145, sodium: 2290, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 680, protein: 36, carbs: 13, fat: 54, satFat: 16, transFat: 0.5, chol: 145, sodium: 1780, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1910, protein: 90, carbs: 137, fat: 113, satFat: 32, transFat: 1, chol: 290, sodium: 4920, fiber: 9, sugar: 23 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1920, protein: 93, carbs: 138, fat: 113, satFat: 32, transFat: 1, chol: 290, sodium: 4870, fiber: 9, sugar: 24 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1960, protein: 94, carbs: 139, fat: 116, satFat: 34, transFat: 1, chol: 300, sodium: 5070, fiber: 7, sugar: 23 },
      ] },
    ],
  },
  'seed-jm-44-buffalo-chicken': {
    itemName: "Buffalo Chicken Cheesesteak",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 790, protein: 52, carbs: 69, fat: 35, satFat: 9, transFat: 1, chol: 125, sodium: 3530, fiber: 3, sugar: 8 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 790, protein: 53, carbs: 69, fat: 35, satFat: 9, transFat: 1, chol: 125, sodium: 3500, fiber: 5, sugar: 9 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 820, protein: 54, carbs: 69, fat: 37, satFat: 10, transFat: 1, chol: 130, sodium: 3600, fiber: 4, sugar: 8 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 820, protein: 50, carbs: 61, fat: 42, satFat: 12, transFat: 1, chol: 125, sodium: 3500, fiber: 3, sugar: 8 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 790, protein: 50, carbs: 59, fat: 41, satFat: 12, transFat: 1, chol: 125, sodium: 3370, fiber: 7, sugar: 8 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 510, protein: 42, carbs: 13, fat: 32, satFat: 9, transFat: 0.5, chol: 125, sodium: 2860, fiber: 1, sugar: 6 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1570, protein: 103, carbs: 136, fat: 70, satFat: 18, transFat: 2, chol: 250, sodium: 7060, fiber: 6, sugar: 16 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1580, protein: 106, carbs: 137, fat: 70, satFat: 18, transFat: 2, chol: 250, sodium: 7000, fiber: 10, sugar: 18 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1620, protein: 107, carbs: 138, fat: 73, satFat: 20, transFat: 2, chol: 260, sodium: 7200, fiber: 7, sugar: 16 },
      ] },
    ],
  },
  'seed-jm-54-hot-veggie': {
    itemName: "Hot Veggie",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 540, protein: 26, carbs: 73, fat: 17, satFat: 10, transFat: 0.5, chol: 50, sodium: 1750, fiber: 6, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 540, protein: 27, carbs: 73, fat: 17, satFat: 10, transFat: 0.5, chol: 50, sodium: 1720, fiber: 8, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 570, protein: 28, carbs: 74, fat: 19, satFat: 11, transFat: 0.5, chol: 55, sodium: 1820, fiber: 6, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 570, protein: 24, carbs: 66, fat: 25, satFat: 13, transFat: 0.5, chol: 50, sodium: 1720, fiber: 6, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 550, protein: 24, carbs: 64, fat: 24, satFat: 12, transFat: 0.5, chol: 50, sodium: 1590, fiber: 10, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 260, protein: 16, carbs: 18, fat: 15, satFat: 9, transFat: 0.5, chol: 50, sodium: 1080, fiber: 4, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1080, protein: 51, carbs: 146, fat: 35, satFat: 20, transFat: 1, chol: 100, sodium: 3490, fiber: 11, sugar: 21 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1090, protein: 54, carbs: 146, fat: 35, satFat: 20, transFat: 1, chol: 100, sodium: 3440, fiber: 15, sugar: 23 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1130, protein: 55, carbs: 147, fat: 38, satFat: 22, transFat: 1, chol: 110, sodium: 3640, fiber: 12, sugar: 21 },
      ] },
    ],
  },
  'seed-jm-55-chicken-big-kahuna': {
    itemName: "Chicken Big Kahuna",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 640, protein: 54, carbs: 70, fat: 17, satFat: 8, transFat: 0.4, chol: 120, sodium: 2360, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 640, protein: 55, carbs: 70, fat: 17, satFat: 8, transFat: 0.4, chol: 120, sodium: 2330, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 660, protein: 56, carbs: 71, fat: 18, satFat: 9, transFat: 0.5, chol: 125, sodium: 2430, fiber: 4, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 670, protein: 52, carbs: 63, fat: 24, satFat: 11, transFat: 0.5, chol: 120, sodium: 2330, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 650, protein: 52, carbs: 61, fat: 23, satFat: 11, transFat: 0.5, chol: 120, sodium: 2200, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 360, protein: 44, carbs: 15, fat: 14, satFat: 8, transFat: 0.4, chol: 120, sodium: 1690, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1270, protein: 107, carbs: 140, fat: 33, satFat: 16, transFat: 1, chol: 245, sodium: 4690, fiber: 7, sugar: 21 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1280, protein: 110, carbs: 140, fat: 33, satFat: 16, transFat: 1, chol: 245, sodium: 4630, fiber: 10, sugar: 23 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1330, protein: 111, carbs: 141, fat: 37, satFat: 18, transFat: 1, chol: 255, sodium: 4830, fiber: 8, sugar: 21 },
      ] },
    ],
  },
  'seed-jm-56-big-kahuna': {
    itemName: "Big Kahuna",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 710, protein: 48, carbs: 69, fat: 28, satFat: 13, transFat: 0.4, chol: 130, sodium: 2460, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 710, protein: 49, carbs: 69, fat: 28, satFat: 13, transFat: 0.4, chol: 130, sodium: 2430, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 730, protein: 50, carbs: 70, fat: 29, satFat: 14, transFat: 0.5, chol: 135, sodium: 2530, fiber: 4, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 740, protein: 46, carbs: 62, fat: 35, satFat: 16, transFat: 0.5, chol: 130, sodium: 2430, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 720, protein: 46, carbs: 60, fat: 34, satFat: 16, transFat: 0.5, chol: 130, sodium: 2300, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 430, protein: 38, carbs: 14, fat: 25, satFat: 13, transFat: 0.4, chol: 130, sodium: 1790, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1410, protein: 95, carbs: 138, fat: 55, satFat: 26, transFat: 1, chol: 265, sodium: 4920, fiber: 7, sugar: 21 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1420, protein: 98, carbs: 138, fat: 55, satFat: 26, transFat: 1, chol: 265, sodium: 4860, fiber: 10, sugar: 23 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1470, protein: 99, carbs: 140, fat: 59, satFat: 29, transFat: 1, chol: 275, sodium: 5060, fiber: 8, sugar: 21 },
      ] },
    ],
  },
  'seed-jm-64-portabella-swiss': {
    itemName: "Portabella Mushroom & Swiss",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 620, protein: 24, carbs: 68, fat: 29, satFat: 10, transFat: 0.4, chol: 30, sodium: 850, fiber: 5, sugar: 8 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 620, protein: 25, carbs: 68, fat: 29, satFat: 10, transFat: 0.4, chol: 30, sodium: 820, fiber: 7, sugar: 9 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 650, protein: 26, carbs: 69, fat: 31, satFat: 11, transFat: 0.4, chol: 35, sodium: 920, fiber: 5, sugar: 8 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 650, protein: 22, carbs: 61, fat: 36, satFat: 14, transFat: 0.5, chol: 30, sodium: 820, fiber: 5, sugar: 8 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 620, protein: 22, carbs: 59, fat: 35, satFat: 13, transFat: 0.5, chol: 30, sodium: 690, fiber: 9, sugar: 8 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 340, protein: 14, carbs: 13, fat: 26, satFat: 10, transFat: 0.4, chol: 30, sodium: 180, fiber: 3, sugar: 6 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1230, protein: 47, carbs: 136, fat: 58, satFat: 21, transFat: 1, chol: 65, sodium: 1690, fiber: 10, sugar: 16 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1240, protein: 50, carbs: 136, fat: 58, satFat: 21, transFat: 1, chol: 65, sodium: 1640, fiber: 13, sugar: 18 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1290, protein: 52, carbs: 138, fat: 61, satFat: 23, transFat: 1, chol: 75, sodium: 1840, fiber: 11, sugar: 16 },
      ] },
    ],
  },
  'seed-jm-65-portabella-chicken-philly': {
    itemName: "Portabella Chicken Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 600, protein: 51, carbs: 69, fat: 14, satFat: 6, transFat: 0.3, chol: 110, sodium: 2000, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 600, protein: 52, carbs: 69, fat: 14, satFat: 6, transFat: 0.3, chol: 110, sodium: 1980, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 620, protein: 53, carbs: 70, fat: 15, satFat: 7, transFat: 0.4, chol: 115, sodium: 2080, fiber: 4, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 630, protein: 50, carbs: 62, fat: 21, satFat: 9, transFat: 0.4, chol: 110, sodium: 1980, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 610, protein: 50, carbs: 60, fat: 20, satFat: 9, transFat: 0.4, chol: 110, sodium: 1850, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 320, protein: 42, carbs: 14, fat: 11, satFat: 6, transFat: 0.3, chol: 110, sodium: 1340, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1190, protein: 102, carbs: 138, fat: 27, satFat: 12, transFat: 1, chol: 225, sodium: 4010, fiber: 6, sugar: 21 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1200, protein: 105, carbs: 138, fat: 28, satFat: 12, transFat: 1, chol: 225, sodium: 3950, fiber: 10, sugar: 23 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1250, protein: 106, carbs: 140, fat: 31, satFat: 15, transFat: 1, chol: 235, sodium: 4150, fiber: 7, sugar: 21 },
      ] },
    ],
  },
  'seed-jm-66-portabella-steak-philly': {
    itemName: "Portabella Steak Philly",
    brand: "Jersey Mike's",
    sizes: [
      { size: 'Regular', breads: [
        { bread: 'White Sub', servingLabel: 'Regular, White Sub', cal: 670, protein: 45, carbs: 68, fat: 25, satFat: 11, transFat: 0.3, chol: 120, sodium: 2100, fiber: 3, sugar: 11 },
        { bread: 'Wheat Sub', servingLabel: 'Regular, Wheat Sub', cal: 670, protein: 46, carbs: 68, fat: 25, satFat: 11, transFat: 0.3, chol: 120, sodium: 2080, fiber: 5, sugar: 12 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Regular, Rosemary Parmesan', cal: 690, protein: 47, carbs: 69, fat: 26, satFat: 12, transFat: 0.4, chol: 125, sodium: 2180, fiber: 4, sugar: 11 },
        { bread: 'White Wrap', servingLabel: 'Regular, White Wrap', cal: 700, protein: 44, carbs: 61, fat: 32, satFat: 14, transFat: 0.4, chol: 120, sodium: 2080, fiber: 3, sugar: 11 },
        { bread: 'Wheat Wrap', servingLabel: 'Regular, Wheat Wrap', cal: 680, protein: 44, carbs: 59, fat: 31, satFat: 14, transFat: 0.4, chol: 120, sodium: 1950, fiber: 7, sugar: 11 },
        { bread: 'Sub in a Tub', servingLabel: 'Regular, Sub in a Tub', cal: 390, protein: 36, carbs: 13, fat: 22, satFat: 11, transFat: 0.3, chol: 120, sodium: 1440, fiber: 1, sugar: 9 },
      ] },
      { size: 'Giant', breads: [
        { bread: 'White Sub', servingLabel: 'Giant, White Sub', cal: 1330, protein: 90, carbs: 136, fat: 49, satFat: 22, transFat: 1, chol: 245, sodium: 4210, fiber: 6, sugar: 21 },
        { bread: 'Wheat Sub', servingLabel: 'Giant, Wheat Sub', cal: 1350, protein: 93, carbs: 136, fat: 50, satFat: 22, transFat: 1, chol: 245, sodium: 4150, fiber: 10, sugar: 23 },
        { bread: 'Rosemary Parmesan', servingLabel: 'Giant, Rosemary Parmesan', cal: 1390, protein: 94, carbs: 138, fat: 53, satFat: 25, transFat: 1, chol: 255, sodium: 4350, fiber: 7, sugar: 21 },
      ] },
    ],
  },
};
