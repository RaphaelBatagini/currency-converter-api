import faker from "@faker-js/faker";
import {
  CurrencyExchange,
  InvalidConversionRateError,
  InvalidCurrencyError,
} from "../../src/domain/currency-exchange";

describe('CurrencyExchange', () => {
  const generateSut = () => ({
    sut: new CurrencyExchange(),
  });

  describe('setId/getId', () => {
    it('should accept number as id', () => {
      const { sut } = generateSut();
      const id = faker.datatype.number({ min: 1 });
      
      expect(() => sut.setId(id)).not.toThrow(Error);
      expect(sut.getId()).toEqual(id);
    });

    it('should accept string as id', () => {
      const { sut } = generateSut();
      const id = faker.datatype.uuid();
      
      expect(() => sut.setId(id)).not.toThrow(Error);
      expect(sut.getId()).toEqual(id);
    });
  });

  describe('setCurrency/getCurrency', () => {
    it('should throw InvalidCurrencyError when currency is not 3 characters long', () => {
      const { sut } = generateSut();

      expect(() => {
        const currency = faker.lorem.word(
          faker.datatype.number({ min: 1, max: 2 })
        );
        sut.setCurrency(currency);
      }).toThrow(InvalidCurrencyError);

      expect(() => {
        const currency = faker.lorem.word(
          faker.datatype.number({ min: 4, max: 10 })
        );
        sut.setCurrency(currency);
      }).toThrow(InvalidCurrencyError);
    });

    it('should set currency when currency value is valid', () => {
      const { sut } = generateSut();
      const currency = faker.lorem.word(3);

      expect(() => {
        sut.setCurrency(currency);
      }).not.toThrow(InvalidCurrencyError);

      expect(sut.getCurrency()).toEqual(currency);
    });
  });

  describe('setConversionRate/getConversionRate', () => {
    it('should throw InvalidConversionRateError when conversionRate is a negative number', () => {
      const { sut } = generateSut();

      expect(() => {
        const conversionRate = faker.datatype.number({ min: -10, max: -1 });
        sut.setConversionRate(conversionRate);
      }).toThrow(InvalidConversionRateError);
    });

    it('should set conversionRate when conversionRate value is a float', () => {
      const { sut } = generateSut();
      const conversionRate = faker.datatype.float();

      expect(() => {
        sut.setConversionRate(conversionRate);
      }).not.toThrow(InvalidCurrencyError);

      expect(sut.getConversionRate()).toEqual(conversionRate);
    });

    it('should set conversionRate when conversionRate value is an integer', () => {
      const { sut } = generateSut();
      const conversionRate = faker.datatype.number();

      expect(() => {
        sut.setConversionRate(conversionRate);
      }).not.toThrow(InvalidCurrencyError);

      expect(sut.getConversionRate()).toEqual(conversionRate);
    });
  });
});
