import { Locator, Page, expect } from '@playwright/test';

/** Shared behaviour for every page object. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page, readonly path: string) {}

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.path.replace('.', '\\.')}$`));
  }

  protected cell(row: Locator, index: number): Locator {
    return row.locator('td').nth(index);
  }
}
