import config from '../infra/config/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: config.db_username,
  password: config.db_password,
  database: config.database,
  synchronize: true,
  logging: true,
  //   entities: [Post, Category],
  subscribers: [],
  migrations: [],
});
