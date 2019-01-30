import path from 'path';
import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import {LOG_LEVEL} from '../config/config';

class winstonLogger{
    logDirectory = '';
    currDateTime : Date;
    constructor(){
        this.logDirectory = path.join(__dirname,'../', process.env.LOG_DIR);
        fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);
    }


    logWithWinston(tolog){
        fs.createWriteStream(path.join(this.logDirectory,'configuredlogs.log'), { flags: 'a' });

        const logger=createLogger({
            level: LOG_LEVEL === 'development' ? 'debug' : 'info',
            format: format.combine(
                format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
                format.json()
              ),
            transports: [
            new transports.Console(),
            new transports.File({ filename: path.join(this.logDirectory,'configuredlogs.log') })
          ]});
        
        logger.info(tolog);
    }
}

const logger = new winstonLogger();
export default logger;