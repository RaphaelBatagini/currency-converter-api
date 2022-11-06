import { CurrencyExchange } from "@/domain/currency-exchange";
import { InMemoryRepository } from "../in-memory-repository";

export class CurrencyExchangeInMemoryRepository extends InMemoryRepository<CurrencyExchange> {
  constructor() {
    super((entity: { id?: string, currency?: string, conversionRate?: number }) => {
      const currencyExchange = new CurrencyExchange();
      currencyExchange.setId(entity.id);
      currencyExchange.setCurrency(entity.currency);
      currencyExchange.setConversionRate(entity.conversionRate);
      return currencyExchange;
    });
  }
}
