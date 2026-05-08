import dotenv from 'dotenv';
dotenv.config();

const requiredVars = ['JWT_SECRET', 'PORT'];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: Missing env variable: ${key}`);
  }
});

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
};
