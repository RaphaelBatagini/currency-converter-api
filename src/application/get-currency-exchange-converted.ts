import { CurrencyExchange } from "@/domain/currency-exchange";
import { IRepository } from "@/infra/repositories/interface";

export class GetCurrencyExchangeConverted {
  constructor(private repository: IRepository<CurrencyExchange>) {}

  async execute(currency: string, amount: number)  {
    const existingCurrencyExchanges: Array<CurrencyExchange> = await this.repository.list();
    const selectedCurrencyExchange: CurrencyExchange = (await this.repository.search({
      currency,
    }))?.shift();

    if (!selectedCurrencyExchange) {
      throw new CurrencyNotFoundError(currency);
    }
  
    const conversionRate = selectedCurrencyExchange.getConversionRate();
    const baseRate = conversionRate * amount;
  
    const calculatedCurrencyExchanges = existingCurrencyExchanges.map((currencyExchange) => {
      return { currency: currencyExchange.getCurrency(), amount: baseRate / currencyExchange.getConversionRate() };
    });

    return calculatedCurrencyExchanges;
  }
}

export class CurrencyNotFoundError extends Error {
  constructor(currency?: string) {
    super(`Currency ${currency} not found`);
    this.name = 'CurrencyNotFoundError';
  }
}
