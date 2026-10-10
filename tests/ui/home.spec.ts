import { test, expect } from '../../src/fixtures/test';
import { DEPARTURE_CITIES, DESTINATION_CITIES } from '../../src/data/routes';

test.describe('Home page', () => {
  test.beforeEach(async ({ home }) => {
    await home.open();
  });

  test('shows the welcome heading and search form', { tag: '@smoke' }, async ({ home }) => {
    await expect(home.heading).toHaveText('Welcome to the Simple Travel Agency!');
    await expect(home.departureSelect).toBeVisible();
    await expect(home.destinationSelect).toBeVisible();
    await expect(home.findFlightsButton).toBeEnabled();
  });

  test('lists all supported departure cities', async ({ home }) => {
    expect(await home.optionsOf(home.departureSelect)).toEqual(DEPARTURE_CITIES);
  });

  test('lists all supported destination cities', async ({ home }) => {
    expect(await home.optionsOf(home.destinationSelect)).toEqual(DESTINATION_CITIES);
  });

  test('a city never appears as both departure and destination', async ({ home }) => {
    const from = await home.optionsOf(home.departureSelect);
    const to = await home.optionsOf(home.destinationSelect);
    expect(from.filter((city) => to.includes(city))).toEqual([]);
  });

  test('destination of the week link opens the vacation page', async ({ home, page }) => {
    await home.destinationOfTheWeekLink.click();
    await expect(page).toHaveURL(/vacation\.html$/);
  });
});
