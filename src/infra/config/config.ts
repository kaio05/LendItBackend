import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  frontendPort: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  frontendPort: Number(process.env.FRONTEND_PORT) || 5173,
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;