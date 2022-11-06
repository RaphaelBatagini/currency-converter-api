export class CurrencyExchange {
  private id: number | string;
  private currency: string;
  private conversionRate: number;

  constructor(id?: number | string, currency?: string, conversionRate?: number) {
    this.id = id;
    this.currency = currency;
    this.conversionRate = conversionRate;
  }

  getId(): number | string {
    return this.id;
  }

  getCurrency(): string {
    return this.currency;
  }

  getConversionRate(): number {
    return this.conversionRate;
  }

  setId(id: number | string): void {
    this.id = id;
  }

  setCurrency(currency: string): void {
    this.assertCurrencyIsValid(currency);
    this.currency = currency;
  }

  setConversionRate(conversionRate: number): void {
    this.assertConversionRateIsValid(conversionRate);
    this.conversionRate = conversionRate;
  }

  private assertCurrencyIsValid(currency: string): void {
    if (currency.length !== 3) {
      throw new InvalidCurrencyError(currency);
    }
  }

  private assertConversionRateIsValid(conversionRate: number): void {
    if (conversionRate < 0) {
      throw new InvalidConversionRateError(conversionRate);
    }
  }
}

export class InvalidCurrencyError extends Error {
  constructor(currency?: string) {
    super(`Invalid currency name ${currency}. Currency should be a 3 characters long string`);
    this.name = 'InvalidCurrencyError';
  }
}

export class InvalidConversionRateError extends Error {
  constructor(conversionRate?: number) {
    super(`Invalid conversion rate ${conversionRate}. Conversion Rate should be a positive number`);
    this.name = 'InvalidConversionRateError';
  }
}