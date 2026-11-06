import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('C to G', () => {
  assert.equal(api.fifthPitch(1), 7);
  assert.equal(api.fifthPitch(-1), 5);
});
test('major sharp key', () => {
  assert.deepEqual(api.keySignature(2), {
    tonic: 'D',
    accidentals: 2,
    kind: 'sharp',
    notes: ['F#', 'C#'],
  });
});
test('flat relative minor', () => {
  assert.equal(api.keySignature(-3, true).tonic, 'C');
  assert.deepEqual(api.keySignature(-3).notes, ['Bb', 'Eb', 'Ab']);
});
test('natural key', () => {
  assert.deepEqual(api.keySignature(0), { tonic: 'C', accidentals: 0, kind: 'natural', notes: [] });
});
test('bounds', () => {
  assert.throws(() => api.keySignature(8));
  assert.throws(() => api.fifthPitch(1, 12));
});
test('cycle permutation', () => {
  assert.equal(new Set(Array.from({ length: 12 }, (_, i) => api.fifthPitch(i))).size, 12);
  assert.equal(api.fifthPitch(12), 0);
});
