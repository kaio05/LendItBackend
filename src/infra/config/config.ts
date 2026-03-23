import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db_username: string;
  db_password: string;
  database: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db_username: process.env.DB_USERNAME || 'postgres',
  db_password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'lendit',
};

export default config;
