/** The original ephemeral-cell variation on Life, independent of the browser. */
export interface Cell { on: boolean; born: number; }
export type Grid = Map<string, Cell>;
export interface Bounds { columns: number; rows: number; }
export const CELL_LIFETIME = 150;
export const STEP_MS = 100;

const keyAt = (x: number, y: number) => `${x},${y}`;
const inside = (x: number, y: number, bounds: Bounds) => x >= 0 && y >= 0 && x < bounds.columns && y < bounds.rows;

function neighbours(x: number, y: number): [number, number][] {
  const result: [number, number][] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx || dy) result.push([x + dx, y + dy]);
    }
  }
  return result;
}

/** Retains inactive neighbours and 150ms expiry, rather than strict Conway rules.
 * All decisions use one snapshot so iteration order cannot change the result.
 */
export function stepGrid(grid: Grid, now: number, bounds: Bounds): Grid {
  const next: Grid = new Map();
  const candidates = new Set<string>();
  const liveCount = (x: number, y: number) => neighbours(x, y).reduce(
    (count, [nx, ny]) => count + (grid.get(keyAt(nx, ny))?.on ? 1 : 0), 0,
  );

  for (const [key, cell] of grid) {
    const [x, y] = key.split(',').map(Number);
    if (!inside(x, y, bounds) || now - cell.born > CELL_LIFETIME) continue;
    for (const [nx, ny] of neighbours(x, y)) {
      const neighbourKey = keyAt(nx, ny);
      if (inside(nx, ny, bounds) && !grid.has(neighbourKey)) candidates.add(neighbourKey);
    }
    const count = liveCount(x, y);
    if (count === 3 || (cell.on && count === 2)) next.set(key, { ...cell, on: true });
  }

  for (const key of candidates) {
    const [x, y] = key.split(',').map(Number);
    next.set(key, { on: liveCount(x, y) === 3, born: now });
  }
  return next;
}

export function activateCell(grid: Grid, x: number, y: number, now: number, bounds: Bounds): void {
  if (Number.isInteger(x) && Number.isInteger(y) && inside(x, y, bounds)) {
    grid.set(keyAt(x, y), { on: true, born: now });
  }
}

/** A few outlined clusters give reduced-motion visitors a still composition. */
export function seedGrid(bounds: Bounds, now = 0): Grid {
  const grid: Grid = new Map();
  for (const [fx, fy] of [[.72, .17], [.91, .7], [.45, .84]]) {
    const x = Math.floor(bounds.columns * fx);
    const y = Math.floor(bounds.rows * fy);
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [2, 1], [1, 2]]) {
      activateCell(grid, x + dx, y + dy, now, bounds);
    }
  }
  return grid;
}
