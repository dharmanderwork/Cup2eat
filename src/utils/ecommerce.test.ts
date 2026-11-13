import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  calculateCartTotals,
  buildUpdatedOrderTimeline,
  findOrderByQuery,
} from './ecommerce';

test('calculateCartTotals computes subtotal, free shipping, and CUP2EAT10 discount accurately', () => {
  const item1 = { productId: INITIAL_PRODUCTS[0].id, product: INITIAL_PRODUCTS[0], quantity: 2 }; // 2 * 249 = 498
  const totalsNoFreeShip = calculateCartTotals([item1]);
  assert.equal(totalsNoFreeShip.subtotal, 498);
  assert.equal(totalsNoFreeShip.shippingCost, 49);
  assert.equal(totalsNoFreeShip.grandTotal, 547);
  assert.equal(totalsNoFreeShip.totalCups, 24);

  const item2 = { productId: INITIAL_PRODUCTS[6].id, product: INITIAL_PRODUCTS[6], quantity: 1 }; // 3999
  const totalsWithPromo = calculateCartTotals([item2], 'CUP2EAT10');
  assert.equal(totalsWithPromo.subtotal, 3999);
  assert.equal(totalsWithPromo.discountAmount, 400);
  assert.equal(totalsWithPromo.shippingCost, 0);
  assert.equal(totalsWithPromo.grandTotal, 3599);
});

test('buildUpdatedOrderTimeline advances order stages deterministically', () => {
  const initialTimeline = INITIAL_ORDERS[0].timeline;
  const updated = buildUpdatedOrderTimeline(initialTimeline, 'Delivered', '14 Nov 2026, 04:00 PM');
  assert.equal(updated.length, 5);
  assert.equal(updated.every((s) => s.completed), true);
  assert.equal(updated[4].timestamp, '14 Nov 2026, 04:00 PM');
});

test('findOrderByQuery locates orders by Order ID, AWB code, or Invoice number', () => {
  const byId = findOrderByQuery(INITIAL_ORDERS, 'ORD-2026-8492');
  assert.ok(byId);
  assert.equal(byId.customerName, 'Aarav Sharma');

  const byAwb = findOrderByQuery(INITIAL_ORDERS, 'BD904182736IN');
  assert.ok(byAwb);
  assert.equal(byAwb.id, 'ORD-2026-8492');

  const byMissing = findOrderByQuery(INITIAL_ORDERS, 'NON-EXISTENT-999');
  assert.equal(byMissing, undefined);
});
