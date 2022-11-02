import { CurrencyExchangeDatabaseRepository } from "./database-repository";
import { CurrencyExchangeInMemoryRepository } from "./in-memory-repository";
import { IRepository } from "../interface";
import { CurrencyExchange } from "@/domain/currency-exchange";

export function getCurrencyExchangeRepository(): IRepository<CurrencyExchange> {
  if (process.env.REPOSITORY_TYPE === 'memory') {
    return new CurrencyExchangeInMemoryRepository();
  }

  return new CurrencyExchangeDatabaseRepository();
}