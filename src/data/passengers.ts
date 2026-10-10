export interface Passenger {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardType: 'visa' | 'amex' | 'dinersclub';
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  nameOnCard: string;
}

/** Test data builder: sensible defaults, override only what a test cares about. */
export function buildPassenger(overrides: Partial<Passenger> = {}): Passenger {
  const suffix = Date.now().toString().slice(-5);
  return {
    name: `Test Passenger ${suffix}`,
    address: '1 Test Street',
    city: 'Wetzlar',
    state: 'Hesse',
    zipCode: '35578',
    cardType: 'visa',
    cardNumber: '4111111111111111', // public Visa test number
    cardMonth: '12',
    cardYear: String(new Date().getFullYear() + 2),
    nameOnCard: `Test Passenger ${suffix}`,
    ...overrides,
  };
}
