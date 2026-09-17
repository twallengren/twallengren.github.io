import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function observeCanvas(page: Page) {
  await page.addInitScript(() => {
    const state = { draws: 0, frames: 0, strokes: [] as number[][] };
    Object.assign(window, { canvasProbe: state });
    const requestFrame = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => { state.frames++; return requestFrame(callback); };
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      state.draws++;
      return clear.apply(this, args);
    };
    const stroke = CanvasRenderingContext2D.prototype.strokeRect;
    CanvasRenderingContext2D.prototype.strokeRect = function (...args) {
      state.strokes.push(args);
      return stroke.apply(this, args);
    };
  });
}
const draws = (page: Page) => page.evaluate(() => (window as unknown as { canvasProbe: { draws: number } }).canvasProbe.draws);

test('navigation, images, layout, and accessibility', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Toren Wallengren.');
  await expect(page.getByText('Staff Product Manager, Calculations at Addepar')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pause animation' })).toBeVisible();
  await expect(page.locator('.hero .social-links')).toBeInViewport();
  await expect(page.locator('.navigation')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0 && !!image.alt && image.width > 0 && image.height > 0))).toBe(true);
  const canvasSize = await page.locator('canvas').evaluate(canvas => ({ width: (canvas as HTMLCanvasElement).width, cssWidth: canvas.getBoundingClientRect().width, density: devicePixelRatio }));
  expect(canvasSize.width).toBe(Math.round(canvasSize.cssWidth * canvasSize.density));
  for (const anchor of ['about', 'experience', 'projects', 'research']) {
    await page.locator(`nav a[href="#${anchor}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
  }
  expect(await page.locator('a[href^="#"]').evaluateAll(links => links.every(link => document.getElementById(link.getAttribute('href')!.slice(1))))).toBe(true);
  expect(await page.locator('.project-card h3').allTextContents()).toEqual(['path-planning-ode', 'calendar-project', 'field-sim', 'nBodyProblem']);
  expect(await page.locator('p p').count()).toBe(0);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('keyboard skip link and animation control', async ({ page, browserName }) => {
  await page.goto('/');
  // Safari on macOS uses Option+Tab to include links in keyboard navigation.
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause animation' }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', { name: 'Resume animation' })).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Pause animation' })).toHaveAttribute('aria-pressed', 'false');
});

test('pointer draws in container coordinates; pause freezes interaction and time', async ({ page }) => {
  await observeCanvas(page);
  await page.goto('/');
  await page.waitForTimeout(350);
  await page.evaluate(() => scrollTo(0, 80));
  const rect = await page.locator('canvas').boundingBox();
  if (!rect) throw new Error('Missing canvas');
  await page.locator('.hero').dispatchEvent('pointermove', { clientX: rect.x + 20, clientY: rect.y + 100, pointerType: 'mouse' });
  const strokes = await page.evaluate(() => (window as unknown as { canvasProbe: { strokes: number[][] } }).canvasProbe.strokes);
  const expectedY = Math.floor(100 / rect.height * Math.floor(rect.height / 30)) * rect.height / Math.floor(rect.height / 30) + .5;
  expect(strokes.some(([x, y]) => x === .5 && Math.abs(y - expectedY) < .01)).toBe(true);
  await page.getByRole('button', { name: 'Pause animation' }).click();
  const before = await draws(page);
  await page.locator('.hero').dispatchEvent('pointermove', { clientX: 50, clientY: 150 });
  await page.waitForTimeout(350);
  expect(await draws(page)).toBe(before);
  await page.getByRole('button', { name: 'Resume animation' }).click();
  await expect.poll(() => draws(page)).toBeGreaterThan(before);
});

test('reduced motion starts still and responds to preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await observeCanvas(page);
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Resume animation' })).toBeVisible();
  const before = await draws(page);
  await page.waitForTimeout(300);
  // Layout/resize may redraw the still image, but must never schedule animation.
  expect(await page.evaluate(() => (window as unknown as { canvasProbe: { frames: number } }).canvasProbe.frames)).toBe(0);
  await page.getByRole('button', { name: 'Resume animation' }).click();
  await expect.poll(() => draws(page)).toBeGreaterThan(before);
  await page.evaluate(() => {
    const state = { changes: 0 };
    Object.assign(window, { motionProbe: state });
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => state.changes++);
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Wait for the browser to deliver the first event before changing it again.
  await expect.poll(() => page.evaluate(() => (window as unknown as { motionProbe: { changes: number } }).motionProbe.changes)).toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: 'Resume animation' })).toBeVisible();
});

test('suspends offscreen and in a hidden tab, and cleans up on disconnect', async ({ page }) => {
  await observeCanvas(page);
  await page.goto('/');
  await expect.poll(() => draws(page)).toBeGreaterThan(3);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const offscreen = await draws(page);
  await page.waitForTimeout(300);
  expect(await draws(page)).toBe(offscreen);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => draws(page)).toBeGreaterThan(offscreen);
  // Inject the platform visibility signal; browser tabs are not backgrounded reliably in headless mode.
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  const hidden = await draws(page);
  await page.waitForTimeout(300);
  expect(await draws(page)).toBe(hidden);
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); });
  await expect.poll(() => draws(page)).toBeGreaterThan(hidden);
  await page.evaluate(() => { const element = document.querySelector('life-canvas')!; Object.assign(window, { detachedCanvas: element }); element.remove(); });
  const disconnected = await draws(page);
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  expect(await draws(page)).toBe(disconnected);
  await page.evaluate(() => document.querySelector('.hero')!.append((window as unknown as { detachedCanvas: HTMLElement }).detachedCanvas));
  await expect(page.getByRole('button', { name: 'Resume animation' })).toBeVisible();
});

test('all content and links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole('heading', { name: 'About & experience' })).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await expect(page.getByRole('link', { name: 'Read the preprint on arXiv' })).toHaveAttribute('href', 'https://arxiv.org/abs/1806.07046');
  await expect(page.locator('.canvas-controls')).toBeHidden();
  await page.locator('nav a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await context.close();
});

test('touch scrolling remains native over the hero', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile, 'Chromium mobile touch gesture');
  await page.goto('/');
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 440 }] });
  for (const y of [410, 370, 320, 260, 180]) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y }] });
    await page.waitForTimeout(30);
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
});
