import { test, expect } from '../../src/fixtures/test';
import { ROUTES } from '../../src/data/routes';

test.describe('Flight search', () => {
  for (const { from, to } of ROUTES) {
    test(`returns flights from ${from} to ${to}`, { tag: '@regression' }, async ({ home, reserve }) => {
      await home.open();
      await home.searchFlights(from, to);

      await reserve.expectLoaded();
      await expect(reserve.heading).toHaveText(`Flights from ${from} to ${to}:`);
      await expect(reserve.rows).not.toHaveCount(0);
    });
  }

  test('every result has a flight number, airline, times and a positive price', { tag: '@smoke' }, async ({ home, reserve }) => {
    await home.open();
    await home.searchFlights('Paris', 'Berlin');

    const flights = await reserve.flights();
    expect(flights.length).toBeGreaterThan(0);
    for (const f of flights) {
      expect(f.flightNumber).toMatch(/^\d+$/);
      expect(f.airline).not.toBe('');
      expect(f.departs).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
      expect(f.arrives).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
      expect(f.price).toBeGreaterThan(0);
    }
  });

  test('table headers show the selected cities', async ({ home, page }) => {
    await home.open();
    await home.searchFlights('Boston', 'Dublin');
    await expect(page.getByRole('columnheader', { name: 'Departs: Boston' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Arrives: Dublin' })).toBeVisible();
  });
});
