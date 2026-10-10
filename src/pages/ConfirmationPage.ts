import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, '/confirmation.php');
    this.heading = page.getByRole('heading', { level: 1 });
  }

  /** Returns a value from the confirmation table, e.g. value('Status'). */
  async value(label: string): Promise<string> {
    const row = this.page.locator('table tbody tr', { has: this.page.locator('td').filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }) });
    return (await row.locator('td').nth(1).innerText()).trim();
  }
}
