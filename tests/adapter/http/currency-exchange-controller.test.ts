import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { CurrencyExchangeController } from '../../../src/adapter/http/currency-exchange-controller';
import { clearDb, createCurrencyExchange } from '../../config/seeds';
import { MockedHttp } from './http-mock';
import { connect, close } from '../../../src/infra/database/config';

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await close();
});

describe('CurrencyExchangeController', () => {
  const createSut = () => {
    return {
      request: new MockedHttp.Request(),
      response: new MockedHttp.Response(),
      sut: new CurrencyExchangeController(),
    };
  };

  describe('convert', () => {
    it('should return 404 when currency does not exist', async () => {
      const { sut, request, response } = createSut();
      request.params = { currency: faker.lorem.word(3),  amount: faker.datatype.float() };
      const result = await sut.convert(request, response);

      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should return 200 with proper data when currency exists', async () => {
      const { sut, request, response } = createSut();
      const amount = faker.datatype.float();

      const firstCurrency = await createCurrencyExchange('USD', 1);
      const secondCurrency = await createCurrencyExchange('BRL', 0.2);

      request.params = { currency: firstCurrency.getCurrency(),  amount };

      const result = await sut.convert(request, response);

      expect(result.status).toBe(httpStatus.OK);
      expect(result.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          currency: firstCurrency.getCurrency(),
          amount: expect.closeTo(amount, 2),
        }),
        expect.objectContaining({
          currency: secondCurrency.getCurrency(),
          amount: expect.closeTo(amount * 5, 2),
        }),
      ]));
    });
  });
});

