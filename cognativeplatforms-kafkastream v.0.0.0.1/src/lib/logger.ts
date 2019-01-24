import fs from 'fs';
import path from 'path';
import morganBody from 'morgan-body';
import morgan from 'morgan';

export class Logger{
    bodyconfig: { noColors: boolean; maxBodyLength: number; prettify: boolean; logReqDateTime: boolean; dateTimeFormat: string; stream: any; };
    basedir:string;

    constructor(app){
        this.basedir=path.join(__dirname,"../",process.env.LOG_DIR);
        this.bodyconfig =
            {
                noColors:false,  
                maxBodyLength:1000,
                prettify:true,
                logReqDateTime: true,
                dateTimeFormat:'utc',     
                stream: fs.createWriteStream(path.join(this.basedir, 'reqres.log'), { flags: 'a' })
            };
            this.config(app);
    }

    config(app){
         //logging with morgan
         morganBody(app, {
            prettify:true,
            skip:function(req,res){},
            stream: fs.createWriteStream(path.join(this.basedir,'reqres.log'), { flags: 'a' })
          });
  
          app.use(morgan('common', {
              skip: function (req, res) {
                  return res.statusCode < 400
              }, stream: fs.createWriteStream(path.join(this.basedir,'access.log'), { flags: 'a' })
          }));
          
          app.use(morgan('commmon', {
              skip: function (req, res) {
                  return res.statusCode >= 400
              }, stream: fs.createWriteStream(path.join(this.basedir,'error.log'), { flags: 'a' })
          })); 
          //morgan
    }
    
}