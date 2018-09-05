import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  bot_token: string;
  db_uri: string;
  is_dev: boolean;
  jwt_secret: string;
  port: number;
}

const config: IConfig = {
  bot_token: process.env.BOT_TOKEN,
  db_uri: process.env.DB_URI,
  is_dev: process.env.NODE_ENV !== 'production',
  jwt_secret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default config;
