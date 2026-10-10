import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly departureSelect: Locator;
  readonly destinationSelect: Locator;
  readonly findFlightsButton: Locator;
  readonly destinationOfTheWeekLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.heading = page.getByRole('heading', { level: 1 });
    this.departureSelect = page.locator('select[name="fromPort"]');
    this.destinationSelect = page.locator('select[name="toPort"]');
    this.findFlightsButton = page.getByRole('button', { name: 'Find Flights' });
    this.destinationOfTheWeekLink = page.getByRole('link', { name: /destination of the week/i });
  }

  async searchFlights(from: string, to: string): Promise<void> {
    await this.departureSelect.selectOption(from);
    await this.destinationSelect.selectOption(to);
    await this.findFlightsButton.click();
  }

  async optionsOf(select: Locator): Promise<string[]> {
    return (await select.locator('option').allTextContents()).map((o) => o.trim());
  }
}
