import type { Bounds, Grid } from './simulation';

export function drawGrid(context: CanvasRenderingContext2D, grid: Grid, bounds: Bounds, width: number, height: number): void {
  context.clearRect(0, 0, width, height);
  context.strokeStyle = 'rgba(216, 241, 228, 0.7)';
  context.lineWidth = 1;
  const cellWidth = width / bounds.columns;
  const cellHeight = height / bounds.rows;
  for (const [key, cell] of grid) {
    if (!cell.on) continue;
    const [x, y] = key.split(',').map(Number);
    context.strokeRect(x * cellWidth + .5, y * cellHeight + .5, cellWidth - 1, cellHeight - 1);
  }
}
