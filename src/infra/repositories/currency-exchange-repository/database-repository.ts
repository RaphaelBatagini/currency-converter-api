import { CurrencyExchange } from "@/domain/currency-exchange";
import { CurrencyExchangeModel, getCurrencyExchangeRepository } from "@/infra/database/models/currency-exchange";
import { DatabaseRepository } from "../database-repository";

export class CurrencyExchangeDatabaseRepository extends DatabaseRepository<CurrencyExchange, CurrencyExchangeModel> {
  constructor() {
    super(
      getCurrencyExchangeRepository(),
      (model: CurrencyExchangeModel): CurrencyExchange => {
        return new CurrencyExchange(model.id, model.currency, model.conversionRate);
      },
      (type: CurrencyExchange & { id?: number }): CurrencyExchangeModel => {
        const model = new CurrencyExchangeModel();
        model.id = type.id;
        model.currency = type.currency;
        model.conversionRate = type.conversionRate;
        return model;
      },
    );
  }
}
