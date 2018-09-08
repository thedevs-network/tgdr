import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  bot_token: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  cloudinary_cloud_name:  string;
  db_uri: string;
  is_dev: boolean;
  jwt_secret: string;
  port: number;
}

const config: IConfig = {
  bot_token: process.env.BOT_TOKEN,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  db_uri: process.env.DB_URI,
  is_dev: process.env.NODE_ENV !== 'production',
  jwt_secret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
};

export default config;
