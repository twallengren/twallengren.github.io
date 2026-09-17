import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activateCell, CELL_LIFETIME, seedGrid, stepGrid, type Grid } from '../src/scripts/simulation.ts';

const bounds = { columns: 8, rows: 8 };
const live = (coordinates: [number, number][]): Grid => new Map(coordinates.map(([x, y]) => [`${x},${y}`, { on: true, born: 0 }]));

test('three live cells birth neighbours; an isolated cell dies', () => {
  const next = stepGrid(live([[2, 3], [3, 3], [4, 3]]), 100, bounds);
  assert.equal(next.get('3,2')?.on, true);
  assert.equal(next.get('3,4')?.on, true);
  assert.equal(next.get('3,3')?.on, true);
  assert.equal(next.has('2,3'), false);
  assert.equal(stepGrid(live([[3, 3]]), 100, bounds).has('3,3'), false);
});

test('the original short lifetime expires even a stable block', () => {
  const grid = live([[2, 2], [2, 3], [3, 2], [3, 3]]);
  assert.equal(stepGrid(grid, CELL_LIFETIME, bounds).get('2,2')?.on, true);
  assert.equal(stepGrid(grid, CELL_LIFETIME + 1, bounds).size, 0);
});

test('inactive neighbours are retained and can be born before expiry', () => {
  const grid = live([[2, 3], [3, 3], [4, 3]]);
  grid.set('3,2', { on: false, born: 0 });
  const next = stepGrid(grid, 100, bounds);
  assert.deepEqual(next.get('3,2'), { on: true, born: 0 });
  assert.deepEqual(next.get('1,2'), { on: false, born: 100 });
});

test('stepping does not mutate its input and is independent of insertion order', () => {
  const grid = live([[2, 2], [2, 3], [3, 2], [4, 3]]);
  grid.set('3,3', { on: false, born: 0 });
  const snapshot = structuredClone(grid);
  assert.deepEqual(stepGrid(grid, 100, bounds), stepGrid(new Map([...grid].reverse()), 100, bounds));
  assert.deepEqual(grid, snapshot);
});

test('pointer activation refreshes age and rejects out-of-bounds positions', () => {
  const grid = live([[1, 1]]);
  activateCell(grid, 1, 1, 200, bounds);
  activateCell(grid, -1, 1, 200, bounds);
  activateCell(grid, 8, 1, 200, bounds);
  activateCell(grid, 1.5, 1, 200, bounds);
  assert.deepEqual([...grid], [['1,1', { on: true, born: 200 }]]);
});

test('seeding and stepping respect small container boundaries', () => {
  for (const size of [1, 2, 8]) {
    const area = { columns: size, rows: size };
    for (const grid of [seedGrid(area), stepGrid(seedGrid(area), 100, area)]) {
      for (const key of grid.keys()) {
        const [x, y] = key.split(',').map(Number);
        assert.ok(x >= 0 && x < size && y >= 0 && y < size);
      }
    }
  }
});
