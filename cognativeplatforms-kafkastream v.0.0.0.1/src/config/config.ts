import * as dotenv from "dotenv";

dotenv.config();
let path: string;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}../../env.test`;
    break;
  case "production":
    path = `${__dirname}../../env.production`;
    break;
  default:
    path = `${__dirname}../../env.development`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const ZOOKEEPER_PORT = process.env.ZOOKEEPER_PORT;
export const KAFKA_PORT = process.env.KAFKA_PORT;

