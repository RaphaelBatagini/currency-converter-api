import faker from '@faker-js/faker';
import { CurrencyNotFoundError, GetCurrencyExchangeConverted } from '../../src/application/get-currency-exchange-converted';
import { getCurrencyExchangeRepository } from '../../src/infra/repositories/currency-exchange-repository';
import { clearDb, createCurrencyExchange } from '../config/seeds';

beforeEach(async () => {
  await clearDb();
});

describe('GetCurrencyExchangeConverted', () => {
  describe('execute', () => {
    const generateSut = () => {
      const repository = getCurrencyExchangeRepository();

      return {
        sut: new GetCurrencyExchangeConverted(repository),
        repository,
      };
    };

    const generateValidParams = () => ({
      currency: faker.lorem.word(3),
      amount: faker.datatype.float(),
    });

    it('should throw CurrencyNotFoundError when currency is not registered', async () => {
      const { sut } = generateSut();
      const { currency, amount } = generateValidParams();

      await expect(() => sut.execute(currency, amount)).rejects.toThrow(CurrencyNotFoundError);
    });

    it('should return currency converted', async () => {
      const { sut } = generateSut();

      const { amount } = generateValidParams();

      const firstCurrency = await createCurrencyExchange('USD', 1);
      const secondCurrency = await createCurrencyExchange('BRL', 0.2);
      
      const result = await sut.execute(firstCurrency.getCurrency(), amount);

      expect(result).toEqual(expect.arrayContaining([
        { currency: secondCurrency.getCurrency(), amount: amount * 5 },
        { currency: firstCurrency.getCurrency(), amount },
      ]));
    });
  });
});