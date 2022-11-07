import { CurrencyNotFoundError, GetCurrencyExchangeConverted } from "@/application/get-currency-exchange-converted";
import { getCurrencyExchangeRepository } from "@/infra/repositories";
import httpStatus from "http-status";
import { Http } from "./interface";

export class CurrencyExchangeController {
  // TODO: move the getCurrencyExchangeRepository to infrastructure level and receive this in constructor
  async convert(request: Http.Request, response: Http.Response) {
    try {
      const repository = getCurrencyExchangeRepository();
      const useCase = new GetCurrencyExchangeConverted(repository);
      const result = await useCase.execute(request.params.currency, request.params.amount);
  
      return response.status(httpStatus.OK).send(result);
    } catch (error) {
      if (error instanceof CurrencyNotFoundError) {
        return response.status(httpStatus.NOT_FOUND).send(error.message);
      }

      return response.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
};
