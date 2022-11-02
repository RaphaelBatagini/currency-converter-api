import { CurrencyExchange } from "@/domain/currency-exchange";
import { IRepository } from "@/infra/repositories/interface";

export class GetCurrencyExchangeConverted {
  constructor(private repository: IRepository<CurrencyExchange>) {}

  async execute(currency: string, amount: number)  {
    const existingCurrencyExchanges: Array<CurrencyExchange> = await this.repository.list();
    const selectedCurrencyExchange: Array<CurrencyExchange> = await this.repository.search({
      currency,
    });
  
    const conversionRate = selectedCurrencyExchange[0]?.conversionRate;
    const baseRate = conversionRate * amount;
  
    const calculatedCurrencyExchanges = existingCurrencyExchanges.map((currencyExchange) => {
      return { currency: currencyExchange.currency, conversionRate: baseRate / currencyExchange.conversionRate };
    });

    return calculatedCurrencyExchanges;
  }
}
