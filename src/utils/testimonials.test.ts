import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TESTIMONIALS_DATA,
  getNextIndex,
  getPrevIndex,
} from './testimonials';

test('testimonials data has valid records with required attributes', () => {
  assert.ok(TESTIMONIALS_DATA.length >= 4);
  for (const t of TESTIMONIALS_DATA) {
    assert.ok(t.name.length > 0);
    assert.ok(t.company.length > 0);
    assert.ok(t.city.length > 0);
    assert.equal(t.rating, 5);
    assert.ok(t.quote.length > 20);
    assert.ok(t.highlightMetric.length > 5);
  }
});

test('carousel index helpers cycle correctly in forward and reverse loops', () => {
  const total = 5;
  assert.equal(getNextIndex(0, total), 1);
  assert.equal(getNextIndex(4, total), 0);
  assert.equal(getPrevIndex(0, total), 4);
  assert.equal(getPrevIndex(2, total), 1);
});
