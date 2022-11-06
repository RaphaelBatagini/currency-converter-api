import faker from "@faker-js/faker";
import {
  CurrencyExchange,
  InvalidCurrencyError,
} from "../../src/domain/currency-exchange";

describe("CurrencyExchange", () => {
  const generateSut = () => ({
    sut: new CurrencyExchange(),
  });

  describe("setCurrency", () => {
    it("should throw InvalidCurrencyError when currency is not 3 characters long", () => {
      const { sut } = generateSut();

      expect(() => {
        const currency = faker.lorem.word(
          faker.datatype.number({ min: 1, max: 2 })
        );
        sut.setCurrency(currency);
      }).toThrow(InvalidCurrencyError);
      
      expect(() => {
        const currency = faker.lorem.word(
          faker.datatype.number({ min: 4, max: 100 })
        );
        sut.setCurrency(currency);
      }).toThrow(InvalidCurrencyError);
    });
  });
});
