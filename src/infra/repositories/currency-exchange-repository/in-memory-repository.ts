import { CurrencyExchange } from "@/domain/currency-exchange";
import { InMemoryRepository } from "../in-memory-repository";

export class CurrencyExchangeInMemoryRepository extends InMemoryRepository<CurrencyExchange> {}
