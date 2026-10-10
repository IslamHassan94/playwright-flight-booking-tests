import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Passenger } from '../data/passengers';

export class PurchasePage extends BasePage {
  readonly heading: Locator;
  readonly totalCost: Locator;
  readonly purchaseButton: Locator;
  readonly rememberMe: Locator;

  constructor(page: Page) {
    super(page, '/purchase.php');
    this.heading = page.getByRole('heading', { level: 2 });
    this.totalCost = page.locator('p', { hasText: 'Total Cost' }).locator('em');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase Flight' });
    this.rememberMe = page.getByLabel('Remember me');
  }

  async fillPassenger(p: Passenger): Promise<void> {
    await this.page.locator('#inputName').fill(p.name);
    await this.page.locator('#address').fill(p.address);
    await this.page.locator('#city').fill(p.city);
    await this.page.locator('#state').fill(p.state);
    await this.page.locator('#zipCode').fill(p.zipCode);
    await this.page.locator('#cardType').selectOption(p.cardType);
    await this.page.locator('#creditCardNumber').fill(p.cardNumber);
    await this.page.locator('#creditCardMonth').fill(p.cardMonth);
    await this.page.locator('#creditCardYear').fill(p.cardYear);
    await this.page.locator('#nameOnCard').fill(p.nameOnCard);
  }

  async purchase(p: Passenger, rememberMe = false): Promise<void> {
    await this.fillPassenger(p);
    if (rememberMe) await this.rememberMe.check();
    await this.purchaseButton.click();
  }
}
