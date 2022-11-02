export interface IRepository<Type> {
  id?: number | string;
  list: () => Promise<Type[]> | Type[];
  get: (id: number | string) => Promise<Type> | Type;
  search: (filter: Object) => Promise<Type[]> | Type[];
  persist: (entity: Type) => Promise<Type> | Type;
  remove: (id: number | string) => Promise<void> | void;
}