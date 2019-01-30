import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { createLogger, format, transports } from 'winston';
import {LOG_LEVEL} from '../config/config';

export class morganLogger{
    logger: any;
    
    constructor(app){
        this.createMorganLogger(app);
    }

    createMorganLogger(app){
        const basedir=path.join(__dirname,"../",process.env.LOG_DIR);        
        app.use(morgan('common', {
           skip: function (req, res) {
               return res.statusCode < 400
           }, stream: fs.createWriteStream(path.join(basedir,'access.log'), { flags: 'a' })
       }));
       
       app.use(morgan('commmon', {
           skip: function (req, res) {
               return res.statusCode >= 400
           }, stream: fs.createWriteStream(path.join(basedir,'error.log'), { flags: 'a' })
       }));

       morganBody(app, {
       prettify:true,
       skip:function(req,res){
       
       },
       stream: fs.createWriteStream(path.join(basedir,'reqres.log'), { flags: 'a' })
       }); 
    }

    logWihWinston(tolog){
        const basedir=path.join(__dirname,"../",process.env.LOG_DIR,'access.log'); 
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
            new transports.File({ filename: basedir })
          ]});
        logger.info(tolog);
    }
    
}