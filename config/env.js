import dotenv from 'dotenv';

dotenv.config();
export const { PORT = 3000, JWT_SECRET, MONGO_URL } = process.env;