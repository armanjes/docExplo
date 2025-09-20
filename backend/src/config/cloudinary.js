import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config()
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

console.log(`NAME: ${CLOUDINARY_CLOUD_NAME}`);
console.log(`KEY: ${CLOUDINARY_API_KEY}`);
console.log(`SECRET: ${CLOUDINARY_API_SECRET}`);

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary ;
