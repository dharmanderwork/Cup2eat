import test from 'node:test';
import assert from 'node:assert/strict';
import { getPageFromHash, getHashFromPage } from './router';

test('router correctly parses various hash paths', () => {
  assert.equal(getPageFromHash(''), 'home');
  assert.equal(getPageFromHash('#/'), 'home');
  assert.equal(getPageFromHash('#/flavours'), 'flavours');
  assert.equal(getPageFromHash('#/flavors'), 'flavours');
  assert.equal(getPageFromHash('#/story'), 'story');
  assert.equal(getPageFromHash('#/sustainability'), 'story');
  assert.equal(getPageFromHash('#/wholesale'), 'wholesale');
  assert.equal(getPageFromHash('#/founder'), 'founder');
  assert.equal(getPageFromHash('#/shop'), 'shop');
  assert.equal(getPageFromHash('#/track'), 'track');
  assert.equal(getPageFromHash('#/account'), 'account');
  assert.equal(getPageFromHash('#/admin'), 'admin');
  assert.equal(getPageFromHash('#/unknown'), 'home');
});

test('router generates standard hash from page id', () => {
  assert.equal(getHashFromPage('home'), '#/');
  assert.equal(getHashFromPage('shop'), '#/shop');
  assert.equal(getHashFromPage('track'), '#/track');
  assert.equal(getHashFromPage('flavours'), '#/flavours');
  assert.equal(getHashFromPage('wholesale'), '#/wholesale');
  assert.equal(getHashFromPage('account'), '#/account');
  assert.equal(getHashFromPage('admin'), '#/admin');
});
