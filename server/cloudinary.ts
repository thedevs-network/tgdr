import * as cloudinary from 'cloudinary';
import config from './config';

cloudinary.config({
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
  cloud_name: config.cloudinary_cloud_name,
});

export default cloudinary;
