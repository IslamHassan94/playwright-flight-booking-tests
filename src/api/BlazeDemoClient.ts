import { APIRequestContext, APIResponse } from '@playwright/test';
import { Passenger } from '../data/passengers';

/** Thin API client for the form endpoints behind the UI. */
export class BlazeDemoClient {
  constructor(private readonly request: APIRequestContext) {}

  searchFlights(from: string, to: string): Promise<APIResponse> {
    return this.request.post('/reserve.php', { form: { fromPort: from, toPort: to } });
  }

  purchase(p: Passenger): Promise<APIResponse> {
    return this.request.post('/confirmation.php', {
      form: {
        inputName: p.name,
        address: p.address,
        city: p.city,
        state: p.state,
        zipCode: p.zipCode,
        cardType: p.cardType,
        creditCardNumber: p.cardNumber,
        creditCardMonth: p.cardMonth,
        creditCardYear: p.cardYear,
        nameOnCard: p.nameOnCard,
      },
    });
  }
}
