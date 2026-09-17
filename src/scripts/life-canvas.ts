import { activateCell, seedGrid, stepGrid, STEP_MS, type Bounds } from './simulation';
import { drawGrid } from './life-renderer';

/** Mount on any container; no framework, global input handlers, or data fetching. */
export function mountLifeCanvas(host: HTMLElement): () => void {
  const canvas = host.querySelector('canvas');
  const button = host.querySelector('button');
  const controls = host.querySelector<HTMLElement>('.canvas-controls');
  const surface = host.closest<HTMLElement>('[data-life-surface]') ?? host;
  const context = canvas?.getContext('2d');
  if (!canvas || !context || !button || !controls) return () => {};

  const abort = new AbortController();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches;
  let visible = false;
  let disposed = false;
  let frame: number | undefined;
  let previousFrame = 0;
  let elapsed = 0;
  let simulationTime = 0;
  let width = 0;
  let height = 0;
  let density = 0;
  let bounds: Bounds = { columns: 1, rows: 1 };
  let grid = seedGrid(bounds);

  const render = () => drawGrid(context, grid, bounds, width, height);
  const running = () => !disposed && !paused && visible && !document.hidden;
  const tick = (timestamp: number) => {
    frame = undefined;
    if (!running()) return;
    if (previousFrame) elapsed += Math.min(timestamp - previousFrame, STEP_MS);
    previousFrame = timestamp;
    if (elapsed >= STEP_MS) {
      simulationTime += STEP_MS;
      grid = stepGrid(grid, simulationTime, bounds);
      render();
      elapsed %= STEP_MS;
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    previousFrame = 0;
    elapsed = 0;
    button.textContent = paused ? 'Resume animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(paused));
    if (running()) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextWidth = Math.max(1, rect.width);
    const nextHeight = Math.max(1, rect.height);
    const nextDensity = window.devicePixelRatio || 1;
    if (nextWidth === width && nextHeight === height && nextDensity === density) return;
    width = nextWidth;
    height = nextHeight;
    density = nextDensity;
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    context.setTransform(density, 0, 0, density, 0, 0);
    bounds = { columns: Math.max(1, Math.floor(width / 30)), rows: Math.max(1, Math.floor(height / 30)) };
    grid = seedGrid(bounds, simulationTime);
    render();
  };
  const interact = (event: PointerEvent) => {
    if (!running() || (event.target instanceof Element && event.target.closest('a, button'))) return;
    const rect = canvas.getBoundingClientRect();
    // Client coordinates are local to the canvas even after scrolling/resizing.
    const x = Math.floor((event.clientX - rect.left) / width * bounds.columns);
    const y = Math.floor((event.clientY - rect.top) / height * bounds.rows);
    activateCell(grid, x, y, simulationTime, bounds);
    render();
  };

  button.addEventListener('click', () => { paused = !paused; sync(); }, { signal: abort.signal });
  motion.addEventListener('change', () => {
    paused = motion.matches;
    if (paused) { grid = seedGrid(bounds, simulationTime); render(); }
    sync();
  }, { signal: abort.signal });
  document.addEventListener('visibilitychange', sync, { signal: abort.signal });
  // Passive input with no pointer capture or touch-action override preserves scrolling.
  surface.addEventListener('pointermove', interact, { passive: true, signal: abort.signal });
  surface.addEventListener('pointerdown', interact, { passive: true, signal: abort.signal });
  window.addEventListener('resize', resize, { passive: true, signal: abort.signal });
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  intersectionObserver.observe(host);
  resize();
  controls.hidden = false;
  sync();

  return () => {
    disposed = true;
    if (frame !== undefined) cancelAnimationFrame(frame);
    abort.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    controls.hidden = true;
  };
}

export class LifeCanvasElement extends HTMLElement {
  private cleanup?: () => void;
  connectedCallback() {
    this.cleanup?.();
    this.cleanup = mountLifeCanvas(this);
  }
  disconnectedCallback() {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}
