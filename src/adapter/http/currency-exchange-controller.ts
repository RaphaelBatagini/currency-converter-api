import { GetCurrencyExchangeConverted } from "@/application/get-currency-exchange-converted";
import { getCurrencyExchangeRepository } from "@/infra/repositories";
import httpStatus from "http-status";
import { Http } from "./interface";

export class CurrencyExchangeController {
  // TODO: move the getCurrencyExchangeRepository to infrastructure level and receive this in constructor
  async convert(request: Http.Request, response: Http.Response) {
    const repository = getCurrencyExchangeRepository();
    const useCase = new GetCurrencyExchangeConverted(repository);
    const result = await useCase.execute(request.params.currency, request.params.amount);

    return response.status(httpStatus.OK).send(result);
  }
};
