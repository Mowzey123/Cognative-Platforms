import * as dotenv from "dotenv";
const fs = require('fs');
const path =require('path');
import dataobj from '../lib/data';

dotenv.config();
let workingpath: string;

switch (process.env.NODE_ENV) {
  case "test":
    workingpath = `${__dirname}../../env.test`;
    break;
  case "production":
  workingpath = `${__dirname}../../env.production`;
    break;
  default:
  workingpath = `${__dirname}../../env.development`;
}

dotenv.config({ path: workingpath });
 // ensure log directory exists
 var logDirectory = path.join(__dirname,'../', process.env.LOG_DIR);
 fs.existsSync(logDirectory) || dataobj.makeDir(logDirectory);



export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const ZOOKEEPER_PORT = process.env.ZOOKEEPER_PORT;
export const KAFKA_PORT = process.env.KAFKA_PORT;
export const LOG_DIR = process.env.LOG_DIR;
