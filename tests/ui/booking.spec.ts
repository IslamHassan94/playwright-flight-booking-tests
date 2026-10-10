import { test, expect } from '../../src/fixtures/test';
import { buildPassenger } from '../../src/data/passengers';

test.describe('Booking a flight end to end', () => {
  test('books the cheapest flight and shows a confirmation', { tag: '@smoke' }, async ({ home, reserve, purchase, confirmation }) => {
    const passenger = buildPassenger();

    await test.step('search for a route', async () => {
      await home.open();
      await home.searchFlights('Paris', 'Berlin');
    });

    await test.step('choose the cheapest flight', async () => {
      await reserve.chooseCheapestFlight();
      await purchase.expectLoaded();
    });

    await test.step('enter passenger and payment details', async () => {
      await purchase.purchase(passenger);
    });

    await test.step('verify the confirmation', async () => {
      await confirmation.expectLoaded();
      await expect(confirmation.heading).toHaveText('Thank you for your purchase today!');
      expect(await confirmation.value('Status')).toBe('PendingCapture');
      expect(await confirmation.value('Id')).toMatch(/^\d+$/);
      expect(await confirmation.value('Auth Code')).not.toBe('');
    });
  });

  test('masks the card number on the confirmation page', { tag: '@regression' }, async ({ home, reserve, purchase, confirmation }) => {
    const passenger = buildPassenger({ cardNumber: '4111111111111111' });
    await home.open();
    await home.searchFlights('Boston', 'London');
    await reserve.chooseFlight(0);
    await purchase.purchase(passenger);

    const masked = await confirmation.value('Card Number');
    expect(masked).toMatch(/^x+1111$/);
    expect(masked).not.toContain(passenger.cardNumber);
  });

  for (const cardType of ['visa', 'amex', 'dinersclub'] as const) {
    test(`accepts ${cardType} as card type`, async ({ home, reserve, purchase, confirmation }) => {
      await home.open();
      await home.searchFlights('Portland', 'Rome');
      await reserve.chooseFlight(0);
      await purchase.purchase(buildPassenger({ cardType }), true);
      await expect(confirmation.heading).toHaveText('Thank you for your purchase today!');
    });
  }

  test('shows a total cost on the purchase page', async ({ home, reserve, purchase }) => {
    await home.open();
    await home.searchFlights('Paris', 'Rome');
    await reserve.chooseFlight(0);
    await expect(purchase.totalCost).toHaveText(/\d+(\.\d{1,2})?/);
  });
});
