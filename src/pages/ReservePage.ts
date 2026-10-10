import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface FlightRow {
  flightNumber: string;
  airline: string;
  departs: string;
  arrives: string;
  price: number;
}

export class ReservePage extends BasePage {
  readonly heading: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    super(page, '/reserve.php');
    this.heading = page.getByRole('heading', { level: 3 });
    this.rows = page.locator('table.table tbody tr');
  }

  /** Reads the results table into typed objects so tests can assert on data, not markup. */
  async flights(): Promise<FlightRow[]> {
    const result: FlightRow[] = [];
    for (const row of await this.rows.all()) {
      const text = async (i: number) => (await this.cell(row, i).innerText()).trim();
      result.push({
        flightNumber: await text(1),
        airline: await text(2),
        departs: await text(3),
        arrives: await text(4),
        price: Number((await text(5)).replace(/[$,]/g, '')),
      });
    }
    return result;
  }

  async chooseFlight(index: number): Promise<void> {
    await this.rows.nth(index).getByRole('button', { name: 'Choose This Flight' }).click();
  }

  async chooseCheapestFlight(): Promise<FlightRow> {
    const flights = await this.flights();
    const cheapest = flights.reduce((min, f, i, all) => (f.price < all[min].price ? i : min), 0);
    await this.chooseFlight(cheapest);
    return flights[cheapest];
  }
}
