import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  admin_id: number;
  bot_token: string;
  bot_token_2: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  cloudinary_cloud_name:  string;
  db_uri: string;
  is_dev: boolean;
  jwt_secret: string;
  port: number;
  report_chat_id?: number;
}

const config: IConfig = {
  admin_id: Number(process.env.ADMIN_ID),
  bot_token: process.env.BOT_TOKEN,
  bot_token_2: process.env.BOT_TOKEN_2,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  db_uri: process.env.DB_URI,
  is_dev: process.env.NODE_ENV !== 'production',
  jwt_secret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
  report_chat_id: Number(process.env.REPORT_CHAT_ID),
};

export default config;
