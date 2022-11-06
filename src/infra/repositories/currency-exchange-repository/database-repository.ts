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
      (type: CurrencyExchange): CurrencyExchangeModel => {
        const model = new CurrencyExchangeModel();
        model.id = Number(type.getId());
        model.currency = type.getCurrency();
        model.conversionRate = type.getConversionRate();
        return model;
      },
    );
  }
}
