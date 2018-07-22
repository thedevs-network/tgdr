import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  db_uri: string;
  is_dev: boolean;
  port: number;
}

const config: IConfig = {
  db_uri: process.env.DB_URI || 'mongodb://localhost/tgdr',
  is_dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default config;