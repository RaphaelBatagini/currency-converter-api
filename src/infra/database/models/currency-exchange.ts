import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  Repository,
} from 'typeorm';

@Entity('currency_exchanges')
export class CurrencyExchangeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  currency: string;

  @Column()
  conversion_rate: number;
}

export const getCurrencyExchangeRepository = (): Repository<CurrencyExchange> => getRepository(CurrencyExchange);
