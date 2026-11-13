import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEnvironmentalImpact,
  calculateWholesaleQuote,
  calculateCafeRoi,
  BASE_WHOLESALE_BOX_PRICE,
  CUPS_PER_BOX,
} from './calculator';

test('environmental impact calculation handles standard café daily volume', () => {
  const result = calculateEnvironmentalImpact(100, 365);
  assert.equal(result.totalCups, 36500);
  // 36,500 * 12g / 1000 = 438 kg plastic saved
  assert.equal(result.plasticWasteSavedKg, 438);
  // 36,500 * 28g / 1000 = 1022 kg CO2 saved
  assert.equal(result.co2SavedKg, 1022);
  assert.ok(result.treesEquivalent > 40);
});

test('environmental impact clamps negative numbers safely', () => {
  const result = calculateEnvironmentalImpact(-5, -10);
  assert.equal(result.totalCups, 0);
  assert.equal(result.plasticWasteSavedKg, 0);
  assert.equal(result.co2SavedKg, 0);
});

test('wholesale quote calculates base price for single box', () => {
  const quote = calculateWholesaleQuote(1);
  assert.equal(quote.boxCount, 1);
  assert.equal(quote.totalCups, CUPS_PER_BOX);
  assert.equal(quote.totalPrice, BASE_WHOLESALE_BOX_PRICE);
  assert.equal(quote.discountPercent, 0);
  assert.equal(quote.freeShipping, true);
  assert.equal(quote.pricePerCup, 10.10); // 3999 / 396 ≈ 10.0984 -> 10.10
});

test('wholesale quote applies tier discounts for bulk orders', () => {
  const quote5 = calculateWholesaleQuote(5);
  assert.equal(quote5.discountPercent, 8);
  assert.equal(quote5.totalCups, 5 * 396);
  assert.ok(quote5.pricePerCup < 10.10);

  const quote10 = calculateWholesaleQuote(10);
  assert.equal(quote10.discountPercent, 12);
});

test('calculateCafeRoi correctly computes monthly profit and UGC estimate', () => {
  const roi = calculateCafeRoi(100, 30);
  assert.equal(roi.dailyCups, 100);
  assert.equal(roi.monthlyCups, 3000);
  assert.equal(roi.monthlyRevenue, 90000);
  // Cost: 3000 * 10.10 = 30300
  assert.equal(roi.monthlyProductCost, 30300);
  // Net profit: 90000 - 30300 = 59700
  assert.equal(roi.monthlyNetProfit, 59700);
  assert.equal(roi.annualNetProfit, 59700 * 12);
  assert.equal(roi.monthlyPlasticCupsSaved, 3000);
  // 3000 * 0.08 = 240
  assert.equal(roi.estimatedSocialTagsMonthly, 240);
});

