import faker from "@faker-js/faker";
import { CurrencyExchange } from "../../src/domain/currency-exchange";
import { getCurrencyExchangeRepository } from "../../src/infra/repositories/currency-exchange-repository";


export async function createCurrencyExchange(currency?: string, conversionRate?: number): Promise<CurrencyExchange> {
  const repository = getCurrencyExchangeRepository();
  const currencyExchange = new CurrencyExchange();
  currencyExchange.setCurrency(currency || faker.lorem.word(3));
  currencyExchange.setConversionRate(conversionRate || faker.datatype.float());
  
  await repository.persist(currencyExchange);

  return currencyExchange;
};

export async function clearDb(): Promise<void> {
  const repository = getCurrencyExchangeRepository();
  const currencyExchanges = await repository.list();
  
  for (let i = 0; i < currencyExchanges.length; i++) {
    await repository.remove(currencyExchanges[i].getId());
  }
}