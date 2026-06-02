import { useState } from 'react';
import type { MealEntry } from '../../types';

export interface SizeVariant {
  label: string;
  servingLabel: string;
  cal: number;
  protein: number;
  carbs: number;
  fat: number;
  satFat: number;
  sodium: number;
  fiber: number;
  sugar: number;
}

export interface SizeFamily {
  itemName: string;
  brand: string;
  emoji: string;
  sizes: SizeVariant[];
}

export const SIZE_FAMILIES: Record<string, SizeFamily> = {
  // ── McDonald's ──────────────────────────────────────────────────
  'seed-mcd-fries-sizer': {
    itemName: "French Fries", brand: "McDonald's", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 230, protein: 3, carbs: 30, fat: 11, satFat: 2, sodium: 190, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 320, protein: 4, carbs: 43, fat: 15, satFat: 2, sodium: 270, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 480, protein: 7, carbs: 66, fat: 22, satFat: 3, sodium: 400, fiber: 6, sugar: 0 },
    ],
  },
  // ── Burger King ─────────────────────────────────────────────────
  'seed-bk-fries-sizer': {
    itemName: "French Fries", brand: "Burger King", emoji: "🍟",
    sizes: [
      { label: 'Value',  servingLabel: '1 value',  cal: 230, protein: 3, carbs: 33, fat: 10, satFat: 1, sodium: 170, fiber: 2, sugar: 1 },
      { label: 'Small',  servingLabel: '1 small',  cal: 300, protein: 4, carbs: 43, fat: 13, satFat: 2, sodium: 220, fiber: 3, sugar: 1 },
      { label: 'Medium', servingLabel: '1 medium', cal: 370, protein: 5, carbs: 54, fat: 16, satFat: 2, sodium: 270, fiber: 4, sugar: 1 },
      { label: 'Large',  servingLabel: '1 large',  cal: 440, protein: 5, carbs: 64, fat: 19, satFat: 3, sodium: 320, fiber: 5, sugar: 1 },
    ],
  },
  'seed-bk-onion-rings-sizer': {
    itemName: "Onion Rings", brand: "Burger King", emoji: "🧅",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 280, protein: 4, carbs: 37, fat: 13, satFat: 2, sodium: 510, fiber: 4, sugar: 4 },
      { label: 'Medium', servingLabel: '1 medium', cal: 360, protein: 4, carbs: 48, fat: 16, satFat: 3, sodium: 640, fiber: 5, sugar: 5 },
      { label: 'Large',  servingLabel: '1 large',  cal: 520, protein: 7, carbs: 70, fat: 24, satFat: 4, sodium: 950, fiber: 7, sugar: 7 },
    ],
  },
  // ── Culver's ─────────────────────────────────────────────────────
  'seed-culv-onion-rings-sizer': {
    itemName: "Onion Rings", brand: "Culver's", emoji: "🧅",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 240, protein: 3, carbs: 26, fat: 13, satFat: 2, sodium: 420, fiber: 2, sugar: 1 },
      { label: 'Medium', servingLabel: '1 medium', cal: 350, protein: 4, carbs: 38, fat: 19, satFat: 3, sodium: 610, fiber: 3, sugar: 2 },
      { label: 'Large',  servingLabel: '1 large',  cal: 480, protein: 6, carbs: 52, fat: 26, satFat: 4, sodium: 840, fiber: 4, sugar: 2 },
    ],
  },
  // ── Chick-fil-A ─────────────────────────────────────────────────
  'seed-cfa-waffle-fries-sizer': {
    itemName: "Waffle Fries", brand: "Chick-fil-A", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 310, protein: 4, carbs: 38, fat: 15, satFat: 3, sodium: 190, fiber: 4, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 420, protein: 5, carbs: 50, fat: 22, satFat: 4, sodium: 260, fiber: 5, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 510, protein: 6, carbs: 62, fat: 27, satFat: 5, sodium: 320, fiber: 6, sugar: 0 },
    ],
  },
  'seed-cfa-mac-sizer': {
    itemName: "Mac & Cheese", brand: "Chick-fil-A", emoji: "🧀",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 260, protein: 10, carbs: 27, fat: 13, satFat: 7, sodium: 650, fiber: 1, sugar: 3 },
      { label: 'Medium', servingLabel: '1 medium', cal: 440, protein: 17, carbs: 46, fat: 21, satFat: 12, sodium: 1100, fiber: 2, sugar: 5 },
      { label: 'Large',  servingLabel: '1 large',  cal: 670, protein: 26, carbs: 70, fat: 32, satFat: 18, sodium: 1680, fiber: 3, sugar: 7 },
    ],
  },
  // ── Sonic ────────────────────────────────────────────────────────
  'seed-sonic-fries-sizer': {
    itemName: "French Fries", brand: "Sonic", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 220, protein: 3, carbs: 29, fat: 11, satFat: 2, sodium: 240, fiber: 2, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 350, protein: 4, carbs: 46, fat: 17, satFat: 3, sodium: 380, fiber: 3, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 490, protein: 6, carbs: 65, fat: 24, satFat: 4, sodium: 530, fiber: 5, sugar: 0 },
    ],
  },
  'seed-sonic-tots-sizer': {
    itemName: "Tater Tots", brand: "Sonic", emoji: "🥔",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 200, protein: 2, carbs: 25, fat: 10, satFat: 2, sodium: 350, fiber: 2, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 310, protein: 3, carbs: 39, fat: 16, satFat: 3, sodium: 560, fiber: 3, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 450, protein: 5, carbs: 57, fat: 23, satFat: 4, sodium: 800, fiber: 5, sugar: 0 },
    ],
  },
  'seed-sonic-onion-rings-sizer': {
    itemName: "Onion Rings", brand: "Sonic", emoji: "🧅",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 260, protein: 4, carbs: 31, fat: 13, satFat: 2, sodium: 410, fiber: 3, sugar: 4 },
      { label: 'Medium', servingLabel: '1 medium', cal: 440, protein: 5, carbs: 54, fat: 22, satFat: 4, sodium: 740, fiber: 3, sugar: 6 },
      { label: 'Large',  servingLabel: '1 large',  cal: 640, protein: 8, carbs: 78, fat: 32, satFat: 5, sodium:1060, fiber: 5, sugar: 9 },
    ],
  },
  // ── Arby's ───────────────────────────────────────────────────────
  'seed-arb-curly-fries-sizer': {
    itemName: "Curly Fries", brand: "Arby's", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 310, protein: 4, carbs: 39, fat: 15, satFat: 3, sodium: 770, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 410, protein: 6, carbs: 51, fat: 20, satFat: 4, sodium:1010, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 560, protein: 8, carbs: 70, fat: 28, satFat: 5, sodium:1370, fiber: 5, sugar: 0 },
    ],
  },
  // ── Dairy Queen ──────────────────────────────────────────────────
  'seed-dq-fries-sizer': {
    itemName: "French Fries", brand: "Dairy Queen", emoji: "🍟",
    sizes: [
      { label: 'Small',   servingLabel: '1 small',   cal: 210, protein: 3, carbs: 29, fat:  9, satFat: 2, sodium: 380, fiber: 3, sugar: 0 },
      { label: 'Regular', servingLabel: '1 regular', cal: 300, protein: 4, carbs: 41, fat: 13, satFat: 2, sodium: 530, fiber: 3, sugar: 0 },
      { label: 'Large',   servingLabel: '1 large',   cal: 400, protein: 5, carbs: 56, fat: 18, satFat: 3, sodium: 710, fiber: 4, sugar: 0 },
    ],
  },
  'seed-dq-onion-rings-sizer': {
    itemName: "Onion Rings", brand: "Dairy Queen", emoji: "🧅",
    sizes: [
      { label: 'Small',   servingLabel: '1 small',   cal: 250, protein: 4, carbs: 32, fat: 12, satFat: 2, sodium: 520, fiber: 1, sugar: 4 },
      { label: 'Regular', servingLabel: '1 regular', cal: 360, protein: 5, carbs: 47, fat: 17, satFat: 3, sodium: 740, fiber: 2, sugar: 5 },
      { label: 'Large',   servingLabel: '1 large',   cal: 490, protein: 7, carbs: 63, fat: 23, satFat: 4, sodium: 990, fiber: 3, sugar: 6 },
    ],
  },
  // ── Jack in the Box ──────────────────────────────────────────────
  'seed-jitb-fries-sizer': {
    itemName: "Regular Fries", brand: "Jack in the Box", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 230, protein: 3, carbs: 29, fat: 11, satFat: 2, sodium: 380, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 380, protein: 5, carbs: 47, fat: 19, satFat: 4, sodium: 590, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 530, protein: 7, carbs: 67, fat: 26, satFat: 5, sodium: 810, fiber: 5, sugar: 0 },
    ],
  },
  'seed-jitb-curly-fries-sizer': {
    itemName: "Seasoned Curly Fries", brand: "Jack in the Box", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 260, protein: 4, carbs: 32, fat: 13, satFat: 3, sodium: 560, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 400, protein: 6, carbs: 49, fat: 20, satFat: 4, sodium: 870, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 550, protein: 8, carbs: 67, fat: 27, satFat: 5, sodium:1190, fiber: 5, sugar: 0 },
    ],
  },
  // ── Hardee's / Carl's Jr. ────────────────────────────────────────
  'seed-hrd-fries-sizer': {
    itemName: "Natural Cut Fries", brand: "Hardee's", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 290, protein: 3, carbs: 38, fat: 13, satFat: 3, sodium: 430, fiber: 4, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 430, protein: 5, carbs: 57, fat: 20, satFat: 4, sodium: 640, fiber: 5, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 570, protein: 6, carbs: 75, fat: 26, satFat: 5, sodium: 840, fiber: 7, sugar: 0 },
    ],
  },
  // ── Whataburger ──────────────────────────────────────────────────
  'seed-wb-fries-sizer': {
    itemName: "French Fries", brand: "Whataburger", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 280, protein: 4, carbs: 36, fat: 13, satFat: 2, sodium: 340, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 380, protein: 5, carbs: 50, fat: 18, satFat: 3, sodium: 470, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 490, protein: 7, carbs: 63, fat: 23, satFat: 4, sodium: 600, fiber: 5, sugar: 0 },
    ],
  },
  'seed-wb-onion-rings-sizer': {
    itemName: "Onion Rings", brand: "Whataburger", emoji: "🧅",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 290, protein: 4, carbs: 35, fat: 15, satFat: 3, sodium: 440, fiber: 2, sugar: 5 },
      { label: 'Medium', servingLabel: '1 medium', cal: 430, protein: 6, carbs: 53, fat: 22, satFat: 4, sodium: 660, fiber: 3, sugar: 8 },
      { label: 'Large',  servingLabel: '1 large',  cal: 570, protein: 8, carbs: 70, fat: 29, satFat: 5, sodium: 870, fiber: 4, sugar: 10 },
    ],
  },
  // ── Popeyes ──────────────────────────────────────────────────────
  'seed-pop-cajun-fries-sizer': {
    itemName: "Cajun Fries", brand: "Popeyes", emoji: "🍟",
    sizes: [
      { label: 'Regular', servingLabel: '1 regular', cal: 260, protein: 3, carbs: 32, fat: 13, satFat: 3, sodium: 630, fiber: 3, sugar: 0 },
      { label: 'Large',   servingLabel: '1 large',   cal: 390, protein: 5, carbs: 48, fat: 20, satFat: 4, sodium: 950, fiber: 4, sugar: 0 },
    ],
  },
  // ── Wingstop ─────────────────────────────────────────────────────
  'seed-ws-fries-sizer': {
    itemName: "Seasoned Fries", brand: "Wingstop", emoji: "🍟",
    sizes: [
      { label: 'Regular', servingLabel: '1 regular', cal: 310, protein: 4, carbs: 41, fat: 15, satFat: 3, sodium: 840, fiber: 3, sugar: 0 },
      { label: 'Large',   servingLabel: '1 large',   cal: 500, protein: 6, carbs: 67, fat: 24, satFat: 4, sodium:1350, fiber: 5, sugar: 0 },
    ],
  },
  // ── Five Guys ────────────────────────────────────────────────────
  'seed-fg-fries-sizer': {
    itemName: "Fries", brand: "Five Guys", emoji: "🍟",
    sizes: [
      { label: 'Little',  servingLabel: '1 little',  cal:  528, protein:  7, carbs:  67, fat: 23, satFat: 4, sodium:  470, fiber:  4, sugar: 1 },
      { label: 'Regular', servingLabel: '1 regular', cal:  953, protein: 13, carbs: 131, fat: 41, satFat: 7, sodium:  962, fiber:  9, sugar: 1 },
      { label: 'Large',   servingLabel: '1 large',   cal: 1314, protein: 18, carbs: 181, fat: 57, satFat: 9, sodium: 1327, fiber: 12, sugar: 2 },
    ],
  },
  'seed-fg-cajun-fries-sizer': {
    itemName: "Cajun Fries", brand: "Five Guys", emoji: "🍟",
    sizes: [
      { label: 'Little',  servingLabel: '1 little',  cal:  528, protein:  7, carbs:  67, fat: 23, satFat: 4, sodium:  648, fiber:  4, sugar: 1 },
      { label: 'Regular', servingLabel: '1 regular', cal:  953, protein: 13, carbs: 131, fat: 41, satFat: 7, sodium: 1327, fiber:  9, sugar: 1 },
      { label: 'Large',   servingLabel: '1 large',   cal: 1314, protein: 18, carbs: 181, fat: 57, satFat: 9, sodium: 1831, fiber: 12, sugar: 2 },
    ],
  },
  // ── Wendy's ──────────────────────────────────────────────────────
  'seed-wend-fries-sizer': {
    itemName: "Natural-Cut Fries", brand: "Wendy's", emoji: "🍟",
    sizes: [
      { label: 'Small',  servingLabel: '1 small',  cal: 240, protein: 4, carbs: 33, fat: 10, satFat: 2, sodium: 370, fiber: 3, sugar: 0 },
      { label: 'Medium', servingLabel: '1 medium', cal: 320, protein: 5, carbs: 44, fat: 14, satFat: 2, sodium: 490, fiber: 4, sugar: 0 },
      { label: 'Large',  servingLabel: '1 large',  cal: 450, protein: 7, carbs: 61, fat: 19, satFat: 3, sodium: 680, fiber: 5, sugar: 0 },
    ],
  },
  // ── Wendy's Baconator Fries (sized) ─────────────────────────────
  'seed-cfa-nuggets-sizer': {
    itemName: "Chicken Nuggets", brand: "Chick-fil-A", emoji: "🍗",
    sizes: [
      { label: '5 pc',   servingLabel: '5 pieces',  cal: 160, protein: 17, carbs:  7, fat:  7, satFat: 2, sodium: 755, fiber: 0, sugar: 1 },
      { label: '8 pc',   servingLabel: '8 pieces',  cal: 260, protein: 27, carbs: 11, fat: 12, satFat: 2, sodium:1210, fiber: 0, sugar: 1 },
      { label: '12 pc',  servingLabel: '12 pieces', cal: 390, protein: 40, carbs: 17, fat: 18, satFat: 3, sodium:1820, fiber: 0, sugar: 1 },
    ],
  },
  'seed-mcd-nuggets-sizer': {
    itemName: "Chicken McNuggets", brand: "McDonald's", emoji: "🍗",
    sizes: [
      { label: '4 pc',   servingLabel: '4 pieces',  cal: 170, protein:  9, carbs: 10, fat: 10, satFat: 2, sodium:  340, fiber: 0, sugar: 0 },
      { label: '6 pc',   servingLabel: '6 pieces',  cal: 250, protein: 13, carbs: 15, fat: 15, satFat: 3, sodium:  510, fiber: 1, sugar: 0 },
      { label: '10 pc',  servingLabel: '10 pieces', cal: 420, protein: 22, carbs: 27, fat: 25, satFat: 4, sodium:  840, fiber: 1, sugar: 0 },
      { label: '20 pc',  servingLabel: '20 pieces', cal: 830, protein: 44, carbs: 52, fat: 49, satFat: 8, sodium: 1680, fiber: 2, sugar: 0 },
    ],
  },
  'seed-bk-nuggets-sizer': {
    itemName: "Chicken Nuggets", brand: "Burger King", emoji: "🍗",
    sizes: [
      { label: '4 pc',   servingLabel: '4 pieces',  cal: 190, protein:  9, carbs: 12, fat: 12, satFat: 3, sodium:  490, fiber: 1, sugar: 0 },
      { label: '8 pc',   servingLabel: '8 pieces',  cal: 380, protein: 20, carbs: 20, fat: 22, satFat: 5, sodium:  610, fiber: 2, sugar: 0 },
      { label: '10 pc',  servingLabel: '10 pieces', cal: 480, protein: 22, carbs: 30, fat: 31, satFat: 6, sodium: 1220, fiber: 2, sugar: 0 },
    ],
  },
  // ── McDonald's Specialty Drinks ──────────────────────────────────
  'seed-mcd-dirty-drp-sizer': {
    itemName: "Dirty Dr Pepper", brand: "McDonald's", emoji: "🥤",
    sizes: [
      { label: 'Small',  servingLabel: '16 fl oz', cal: 200, protein: 0, carbs: 51, fat: 2, satFat: 1, sodium:  60, fiber: 0, sugar: 49 },
      { label: 'Medium', servingLabel: '22 fl oz', cal: 280, protein: 0, carbs: 63, fat: 3, satFat: 2, sodium:  85, fiber: 0, sugar: 61 },
      { label: 'Large',  servingLabel: '30 fl oz', cal: 370, protein: 0, carbs: 82, fat: 4, satFat: 2, sodium: 110, fiber: 0, sugar: 79 },
    ],
  },
  'seed-mcd-orange-dream-sizer': {
    itemName: "Orange Dream", brand: "McDonald's", emoji: "🍊",
    sizes: [
      { label: 'Small',  servingLabel: '16 fl oz', cal: 190, protein: 1, carbs: 38, fat: 5, satFat: 3, sodium:  50, fiber: 0, sugar: 36 },
      { label: 'Medium', servingLabel: '22 fl oz', cal: 250, protein: 1, carbs: 50, fat: 6, satFat: 4, sodium:  65, fiber: 0, sugar: 48 },
      { label: 'Large',  servingLabel: '30 fl oz', cal: 330, protein: 2, carbs: 66, fat: 8, satFat: 5, sodium:  85, fiber: 0, sugar: 63 },
    ],
  },
  'seed-mcd-lavender-lemon-sizer': {
    itemName: "Lavender Lemonade", brand: "McDonald's", emoji: "💜",
    sizes: [
      { label: 'Small',  servingLabel: '16 fl oz', cal: 180, protein: 0, carbs: 47, fat: 0, satFat: 0, sodium:  10, fiber: 0, sugar: 45 },
      { label: 'Medium', servingLabel: '22 fl oz', cal: 240, protein: 0, carbs: 63, fat: 0, satFat: 0, sodium:  10, fiber: 0, sugar: 61 },
      { label: 'Large',  servingLabel: '30 fl oz', cal: 320, protein: 0, carbs: 84, fat: 0, satFat: 0, sodium:  15, fiber: 0, sugar: 81 },
    ],
  },
  'seed-mcd-spicy-straw-lemon-sizer': {
    itemName: "Spicy Strawberry Lemonade", brand: "McDonald's", emoji: "🍓",
    sizes: [
      { label: 'Small',  servingLabel: '16 fl oz', cal: 190, protein: 0, carbs: 50, fat: 0, satFat: 0, sodium:  10, fiber: 0, sugar: 48 },
      { label: 'Medium', servingLabel: '22 fl oz', cal: 250, protein: 0, carbs: 66, fat: 0, satFat: 0, sodium:  10, fiber: 0, sugar: 64 },
      { label: 'Large',  servingLabel: '30 fl oz', cal: 330, protein: 0, carbs: 88, fat: 0, satFat: 0, sodium:  15, fiber: 0, sugar: 85 },
    ],
  },
  'seed-mcd-peach-mango-ref-sizer': {
    itemName: "Peach Mango Refresher", brand: "McDonald's", emoji: "🍑",
    sizes: [
      { label: 'Small',  servingLabel: '16 fl oz', cal: 170, protein: 0, carbs: 44, fat: 0, satFat: 0, sodium:  15, fiber: 0, sugar: 42 },
      { label: 'Medium', servingLabel: '22 fl oz', cal: 230, protein: 0, carbs: 60, fat: 0, satFat: 0, sodium:  20, fiber: 0, sugar: 57 },
      { label: 'Large',  servingLabel: '30 fl oz', cal: 300, protein: 0, carbs: 79, fat: 0, satFat: 0, sodium:  25, fiber: 0, sugar: 75 },
    ],
  },
  'seed-mcd-creamy-cold-brew-sizer': {
    itemName: "Creamy Cold Brew", brand: "McDonald's", emoji: "☕",
    sizes: [
      { label: 'Small',  servingLabel: '12 fl oz', cal:  80, protein: 1, carbs: 10, fat: 4, satFat: 2, sodium:  50, fiber: 0, sugar:  9 },
      { label: 'Medium', servingLabel: '16 fl oz', cal: 110, protein: 1, carbs: 14, fat: 5, satFat: 3, sodium:  70, fiber: 0, sugar: 12 },
      { label: 'Large',  servingLabel: '22 fl oz', cal: 150, protein: 2, carbs: 20, fat: 7, satFat: 4, sodium:  90, fiber: 0, sugar: 17 },
    ],
  },
  'seed-mcd-shamrock-shake-sizer': {
    itemName: "Shamrock Shake", brand: "McDonald's", emoji: "☘️",
    sizes: [
      { label: 'Small',  servingLabel: '12 fl oz', cal: 460, protein: 11, carbs:  73, fat: 15, satFat:  9, sodium: 180, fiber: 0, sugar:  60 },
      { label: 'Medium', servingLabel: '16 fl oz', cal: 570, protein: 13, carbs:  91, fat: 17, satFat: 11, sodium: 230, fiber: 0, sugar:  75 },
      { label: 'Large',  servingLabel: '22 fl oz', cal: 740, protein: 17, carbs: 118, fat: 22, satFat: 14, sodium: 290, fiber: 0, sugar:  97 },
    ],
  },
};

/** Returns the sizer ID if this food item has a matching size picker, else null. */
export function findSizerForFood(food: { id: string; brand?: string; name: string }): string | null {
  // Direct match: the food IS a sizer trigger
  if (SIZE_FAMILIES[food.id]) return food.id;

  const nameLower = food.name.toLowerCase();
  const brandLower = (food.brand ?? '').toLowerCase();
  // Full text combining brand + name (covers external API results that embed brand in name)
  const fullText = `${brandLower} ${nameLower}`.trim();

  for (const [sizerId, family] of Object.entries(SIZE_FAMILIES)) {
    const familyBrand = family.brand.toLowerCase();
    // Strip possessive for looser matching: "mcdonald's" → "mcdonald"
    const familyBrandCore = familyBrand.replace(/['''s]+$/, '').replace(/[''']/g, '');

    // Brand must appear in the explicit brand field OR embedded in the food name
    const brandMatch =
      brandLower.includes(familyBrandCore) ||
      nameLower.includes(familyBrandCore) ||
      familyBrand === brandLower;

    if (!brandMatch) continue;

    // Every meaningful keyword in the sizer's itemName must appear in the food name
    const keywords = family.itemName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    if (keywords.length > 0 && keywords.every(kw => fullText.includes(kw))) {
      return sizerId;
    }
  }
  return null;
}

interface Props {
  sizerId: string;
  onAdd: (entry: MealEntry) => void;
  onCancel: () => void;
}

export default function SizePicker({ sizerId, onAdd, onCancel }: Props) {
  const family = SIZE_FAMILIES[sizerId];
  const [selected, setSelected] = useState<SizeVariant>(family?.sizes[Math.floor((family.sizes.length - 1) / 2)] ?? family?.sizes[0]);

  if (!family) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Size options not found.</p>
        <button onClick={onCancel} className="mt-4 px-4 py-2 bg-gray-100 rounded-xl text-sm">Go back</button>
      </div>
    );
  }

  const handleAdd = () => {
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food: {
        id: `${sizerId}-${selected.label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        name: `${selected.label} ${family.itemName}`,
        brand: family.brand,
        servingSizeG: 1,
        servingLabel: selected.servingLabel,
        source: 'custom',
        nutrition: {
          calories: selected.cal,
          protein: selected.protein,
          carbs: selected.carbs,
          fat: selected.fat,
          saturatedFat: selected.satFat,
          cholesterol: 0,
          sodium: selected.sodium,
          fiber: selected.fiber,
          sugar: selected.sugar,
          vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminB12: 0,
          iron: 0, calcium: 0, potassium: 0, caffeine: 0,
          alcohol: 0, addedSugar: selected.sugar, transFat: 0,
          magnesium: 0, zinc: 0, omega3: 0, folate: 0,
        },
      },
      servings: 1,
      timeAdded: new Date().toISOString(),
    };
    onAdd(entry);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Item header */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div className="text-xs text-gray-500 mb-0.5">{family.brand}</div>
        <div className="text-base font-bold text-gray-900">{family.emoji} {family.itemName}</div>
      </div>

      {/* Size grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-3">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-semibold">Choose a size</p>
        <div className="grid grid-cols-2 gap-3">
          {family.sizes.map(size => {
            const isSelected = selected.label === size.label;
            return (
              <button
                key={size.label}
                onClick={() => setSelected(size)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-brand-400/15 border-brand-400 shadow-glow-brand'
                    : 'bg-surface-raised border-brand-400/20 hover:border-brand-400/50'
                }`}
              >
                <div className={`text-lg font-bold mb-0.5 ${isSelected ? 'text-brand-600' : 'text-gray-900'}`}>
                  {size.label}
                </div>
                <div className={`text-2xl font-black leading-none ${isSelected ? 'text-brand-500' : 'text-gray-700'}`}>
                  {size.cal}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">calories</div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-blue-500 font-medium">{size.protein}g P</span>
                  <span className="text-amber-500 font-medium">{size.carbs}g C</span>
                  <span className="text-rose-500 font-medium">{size.fat}g F</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded nutrition for selected */}
        <div className="mt-4 bg-surface-raised rounded-2xl p-3 grid grid-cols-3 gap-y-2 text-center text-xs">
          <div><div className="font-bold text-gray-900">{selected.sodium}mg</div><div className="text-gray-500">sodium</div></div>
          <div><div className="font-bold text-gray-900">{selected.fiber}g</div><div className="text-gray-500">fiber</div></div>
          <div><div className="font-bold text-gray-900">{selected.satFat}g</div><div className="text-gray-500">sat fat</div></div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 px-4 pb-4 pt-2 border-t border-brand-400/20 bg-white flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          className="flex-[2] py-3 rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-glow-brand"
        >
          Add {selected.label} — {selected.cal} cal
        </button>
      </div>
    </div>
  );
}
