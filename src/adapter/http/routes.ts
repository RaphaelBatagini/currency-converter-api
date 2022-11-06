import { CurrencyExchangeController } from "./currency-exchange-controller";

export const routes: Routes = [
  {
    method: 'GET',
    path: '/api/convert/:currency/:amount',
    handler: CurrencyExchangeController.prototype.convert,
  },
];

export type Routes = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'USE',
  path: string,
  handler: CallableFunction,
}[];
