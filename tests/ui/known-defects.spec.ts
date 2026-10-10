import { test, expect } from '../../src/fixtures/test';
import { buildPassenger } from '../../src/data/passengers';

/**
 * Bugs found while exploring the demo app. Each test describes the EXPECTED behaviour
 * and is marked test.fail(), so the suite stays green while the defect exists and
 * alerts us (by "unexpectedly passing") once it is fixed.
 */
test.describe('Known defects', { tag: '@defect' }, () => {
  test('BUG-01: purchase page should show the selected route', async ({ home, reserve, purchase }) => {
    test.fail(true, 'Purchase page always shows a hard-coded TLV to SFO flight');
    await home.open();
    await home.searchFlights('Paris', 'Berlin');
    await reserve.chooseFlight(0);
    await expect(purchase.heading).toContainText('Paris');
  });

  test('BUG-02: purchase page should show the airline of the chosen flight', async ({ home, reserve, purchase, page }) => {
    test.fail(true, 'Airline on purchase page is hard-coded');
    await home.open();
    await home.searchFlights('Paris', 'Berlin');
    const chosen = await reserve.chooseCheapestFlight();
    await expect(page.getByText(`Airline: ${chosen.airline}`)).toBeVisible();
  });

  test('BUG-03: confirmation should show the card expiry entered by the user', async ({ home, reserve, purchase, confirmation }) => {
    test.fail(true, 'Expiration on confirmation ignores the entered month and year');
    const passenger = buildPassenger({ cardMonth: '12', cardYear: '2030' });
    await home.open();
    await home.searchFlights('Boston', 'London');
    await reserve.chooseFlight(0);
    await purchase.purchase(passenger);
    expect(await confirmation.value('Expiration')).toContain('2030');
  });
});
