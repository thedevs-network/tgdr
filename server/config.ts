import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  dbUri: string;
  isDev: boolean;
  port: number;
}

const config: IConfig = {
  dbUri: process.env.DB_URI || 'mongodb://localhost/tgdr',
  isDev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default config;