export class CurrencyExchange {
  public id: number | string;
  public currency: string;
  public conversionRate: number;

  constructor(id?: number | string, currency?: string, conversionRate?: number) {
    this.id = id;
    this.currency = currency;
    this.conversionRate = conversionRate;
  }

  setCurrency(currency: string) {
    this.assertCurrencyIsValid(currency);
    this.currency = currency;
  }

  setConversionRate(conversionRate: number) {
    this.assertConversionRateIsValid(conversionRate);
    this.conversionRate = conversionRate;
  }

  private assertCurrencyIsValid(currency: string): void {
    if (currency.length !== 3) {
      throw new InvalidCurrencyError(currency);
    }
  }

  private assertConversionRateIsValid(conversionRate: number): void {
    if (conversionRate > 0) {
      throw new InvalidConversionRateError(conversionRate);
    }
  }
}

class InvalidCurrencyError extends Error {
  constructor(currency?: string) {
    super(`Invalid currency name ${currency}. Currency should be a 3 characters long string`);
    this.name = 'InvalidCurrencyError';
  }
}

class InvalidConversionRateError extends Error {
  constructor(conversionRate?: number) {
    super(`Invalid conversion rate ${conversionRate}. Conversion Rate should be a positive number`);
    this.name = 'InvalidConversionRateError';
  }
}