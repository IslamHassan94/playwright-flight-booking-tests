# ✈️ Playwright Flight Booking Tests

[![Playwright Tests](https://github.com/IslamHassan94/playwright-flight-booking-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/IslamHassan94/playwright-flight-booking-tests/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.64-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white)

End-to-end **UI and API test automation** for a flight booking web application ([BlazeDemo](https://blazedemo.com)), built with **Playwright** and **TypeScript**.

The suite covers the full booking journey (search → choose flight → pay → confirmation), runs across **Chromium, Firefox, WebKit and a mobile viewport**, and validates the same flows at **API level**. Bugs found during exploratory testing are captured as executable **known-defect tests**.

---

## 🧰 Tech stack

| Area | Tools |
|---|---|
| Test runner | Playwright Test |
| Language | TypeScript (strict mode) |
| Design | Page Object Model, custom fixtures, test data builders |
| API testing | Playwright `APIRequestContext` |
| Reporting | HTML report, JUnit XML, traces, screenshots and videos on failure |
| CI/CD | GitHub Actions (matrix per browser, nightly schedule, report artifacts) |

## 📁 Project structure

```
├── .github/workflows/playwright.yml   # CI pipeline
├── playwright.config.ts               # projects, retries, reporters, tracing
├── src
│   ├── api/BlazeDemoClient.ts         # API client for the booking endpoints
│   ├── data/                          # routes and passenger test data builder
│   ├── fixtures/test.ts               # custom fixtures that inject page objects
│   └── pages/                         # Page Objects (Home, Reserve, Purchase, Confirmation)
└── tests
    ├── api/booking.api.spec.ts        # API-level tests
    └── ui/                            # UI tests: home, search, booking, known defects
```

## ✅ What is tested

| Suite | Coverage |
|---|---|
| **Home** | Search form, full list of departure and destination cities, no city on both lists, navigation link |
| **Search** | Data-driven searches over several routes, result table data (flight number, airline, time format, price), column headers |
| **Booking (E2E)** | Book the cheapest flight, confirmation status and IDs, card number masking, every card type, total cost |
| **API** | Search and purchase endpoints, masked card in the response, response time budget |
| **Known defects** | Bugs found while exploring the app, kept as `test.fail()` tests (see below) |

Tests are tagged so subsets can run on their own: `@smoke`, `@regression`, `@defect`.

## 🐞 Known defects found

| ID | Expected | Actual |
|---|---|---|
| BUG-01 | Purchase page shows the selected route | Always shows a hard-coded TLV → SFO flight |
| BUG-02 | Purchase page shows the chosen airline | Airline is hard-coded |
| BUG-03 | Confirmation shows the entered card expiry | Expiry ignores the user's input |

Each defect test describes the **expected** behaviour and is marked `test.fail()`. The suite stays green while the bug exists, and Playwright flags the test as "unexpectedly passed" as soon as the bug is fixed, so the marker can be removed.

## 🚀 Getting started

```bash
git clone https://github.com/IslamHassan94/playwright-flight-booking-tests.git
cd playwright-flight-booking-tests
npm ci
npx playwright install --with-deps
```

## ▶️ Running tests

```bash
npm test                 # everything: API + all browsers
npm run test:ui          # UI tests on Chromium, Firefox and WebKit
npm run test:api         # API tests only
npm run test:smoke       # @smoke tests only
npm run test:headed      # watch the tests run in Chromium
npm run report           # open the last HTML report
```

Run against another environment with `BASE_URL`:

```bash
BASE_URL=https://staging.example.com npm test
```

## 🧠 Design decisions

- **Page Objects + fixtures:** tests receive ready-made page objects (`home`, `reserve`, `purchase`, `confirmation`, `api`) so specs read like user journeys.
- **Data, not markup:** `ReservePage.flights()` turns the results table into typed objects, so assertions check business data (prices, times) rather than HTML.
- **User-facing locators:** `getByRole` and `getByLabel` first, CSS only where the app has no accessible name.
- **Test data builder:** `buildPassenger()` gives valid defaults and lets each test override only what it cares about.
- **Reliable by default:** web-first assertions with auto-waiting, no hard sleeps, retries and traces only in CI.

## 👤 Author

**Islam Hassan**, Senior SDET · [LinkedIn](https://www.linkedin.com/in/islam-hassan-5366b9180/) · [GitHub](https://github.com/IslamHassan94)
