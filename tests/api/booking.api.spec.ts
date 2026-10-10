import { test, expect } from '../../src/fixtures/test';
import { buildPassenger } from '../../src/data/passengers';
import { ROUTES } from '../../src/data/routes';

test.describe('Booking endpoints (API level)', () => {
  for (const { from, to } of ROUTES) {
    test(`POST /reserve.php returns flights for ${from} to ${to}`, { tag: '@smoke' }, async ({ api }) => {
      const response = await api.searchFlights(from, to);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(`Flights from ${from} to ${to}`);
      expect(html.match(/Choose This Flight/g)?.length ?? 0).toBeGreaterThan(0);
    });
  }

  test('POST /confirmation.php returns a pending payment with a masked card', async ({ api }) => {
    const response = await api.purchase(buildPassenger());
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('Thank you for your purchase today!');
    expect(html).toContain('PendingCapture');
    expect(html).toMatch(/x{12}1111/);
    expect(html).not.toContain('4111111111111111');
  });

  test('responds within an acceptable time', async ({ api }) => {
    const start = Date.now();
    const response = await api.searchFlights('Paris', 'Berlin');
    expect(response.ok()).toBeTruthy();
    expect(Date.now() - start).toBeLessThan(5_000);
  });
});
