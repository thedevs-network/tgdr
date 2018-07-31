import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  bot_token: string;
  db_uri: string;
  is_dev: boolean;
  port: number;
}

const config: IConfig = {
  bot_token: process.env.BOT_TOKEN,
  db_uri: process.env.DB_URI,
  is_dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default config;