import { CurrencyExchange } from "@/domain/currency-exchange";
import { randomUUID } from "crypto";
import { IRepository } from "../interface";

export class CurrencyExchangeInMemoryRepository implements IRepository<CurrencyExchange> {
  private entities: Array<CurrencyExchange>;

  list(): Array<CurrencyExchange> {
    return this.entities;
  }

  get(entityId: number | string): CurrencyExchange | undefined {
    return this.entities.find((entity) => {
      return entity.id === entityId;
    });
  }

  search(filter: Object): Array<CurrencyExchange> {
    return this.entities.filter((entity) => {
      for (const [key, value] of Object.entries(filter)) {
        if (!entity[key] || entity[key] !== value) {
          return false;
        }
      }

      return true;
    });
  }

  persist(entity: CurrencyExchange): CurrencyExchange {
    entity.id = randomUUID();
    this.entities.push(entity);

    return entity;
  }

  remove(entityId: number | string): void {
    const index = this.entities.findIndex((entity) => {
      return entity.id === entityId;
    });

    delete this.entities[index];
  }
}
