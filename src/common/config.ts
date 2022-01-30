import * as dotenv from 'dotenv';

const envFound = dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
});

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export const PORT = parseInt(process.env.PORT) || 5000;

export const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
export const KAKAO_CALLBACK = process.env.KAKAO_CALLBACK;

export const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
export const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
export const NAVER_CALLBACK = process.env.NAVER_CALLBACK;

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
