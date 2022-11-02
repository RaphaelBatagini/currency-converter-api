import { CurrencyExchange } from "@/domain/currency-exchange";
import { getCurrencyExchangeRepository } from "@/infra/repositories";

export class GetCurrencyExchangeConverted {
  constructor(private readonly repository = getCurrencyExchangeRepository()) {}

  async execute(currency: string, amount: number)  {
    const existingCurrencyExchanges: Array<CurrencyExchange> = await this.repository.list();
    const selectedCurrencyExchange: Array<CurrencyExchange> = await this.repository.search({
      currency,
    });
  
    const conversionRate = selectedCurrencyExchange[0].conversionRate;
    const baseRate = conversionRate * amount;
  
    return existingCurrencyExchanges.map((currencyExchange) => {
      return { currency: currencyExchange.currency, conversionRate: baseRate / currencyExchange.conversionRate };
    });
  }
}
