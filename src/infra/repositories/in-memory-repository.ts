import { randomUUID } from "crypto";
import fs from 'fs';
import path from "path";
import { IRepository } from "./interface";

export class InMemoryRepository<Type extends GenericEntity> implements IRepository<Type> {
  private entities: Array<Type> = [];
  private readonly dbFilePath = path.resolve(__dirname, '../../../db.json');
  private readonly fileEncoding = 'utf8';

  list(): Array<Type> {
    this.load();
    return this.entities;
  }

  get(entityId: number | string): Type | undefined {
    this.load();
    return this.entities.find((entity) => {
      return entity.id === entityId;
    });
  }

  search(filter: Object): Array<Type> {
    this.load();
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

    this.commit();

    return entity;
  }

  remove(entityId: number | string): void {
    const index = this.entities.findIndex((entity) => {
      return entity.id === entityId;
    });

    this.commit();

    delete this.entities[index];
  }

  // TODO: persist data apart for each repository
  private commit() {
    try {
      const data = JSON.stringify(this.entities);
      fs.writeFileSync(this.dbFilePath, data, { encoding: this.fileEncoding, flag: 'w' });
    } catch(e) {
      throw e;
    }
  }

  // TODO: persist data apart for each repository and read from there
  private load = () => {
    try {
      const data = fs.readFileSync(this.dbFilePath, { encoding: this.fileEncoding, flag: 'a+' });
      const jsonData = data || '{}';
      this.entities = JSON.parse(jsonData);
    } catch(e) {
      throw e;
    }
  }
}

interface GenericEntity {
  id?: string | number;
}
