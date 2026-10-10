import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ReservePage } from '../pages/ReservePage';
import { PurchasePage } from '../pages/PurchasePage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { BlazeDemoClient } from '../api/BlazeDemoClient';

type Fixtures = {
  home: HomePage;
  reserve: ReservePage;
  purchase: PurchasePage;
  confirmation: ConfirmationPage;
  api: BlazeDemoClient;
};

/** Custom fixtures inject ready-to-use page objects into every test. */
export const test = base.extend<Fixtures>({
  home: async ({ page }, use) => use(new HomePage(page)),
  reserve: async ({ page }, use) => use(new ReservePage(page)),
  purchase: async ({ page }, use) => use(new PurchasePage(page)),
  confirmation: async ({ page }, use) => use(new ConfirmationPage(page)),
  api: async ({ request }, use) => use(new BlazeDemoClient(request)),
});

export { expect };
