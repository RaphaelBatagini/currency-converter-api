import { randomUUID } from "crypto";
import { IRepository } from "./interface";

export class DatabaseRepository<Type extends GenericEntity> implements IRepository<Type> {
  private entities: Array<Type> = [];

  list(): Array<Type> {
    return this.entities;
  }

  get(entityId: number | string): Type | undefined {
    return this.entities.find((entity) => {
      return entity.id === entityId;
    });
  }

  search(filter: Object): Array<Type> {
    return this.entities.filter((entity) => {
      for (const [key, value] of Object.entries(filter)) {
        if (!entity[key] || entity[key] !== value) {
          return false;
        }
      }

      return true;
    });
  }

  persist(entity: Type): Type {
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

interface GenericEntity {
  id?: string | number;
}
