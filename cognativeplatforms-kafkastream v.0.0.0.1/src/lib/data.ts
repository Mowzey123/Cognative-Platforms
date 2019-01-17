import fs = require('fs');
import path = require('path');

export class Data{
      public basedir = path.join(__dirname,'/../.data/');//define base data dir
      constructor(){}

      create(dir,file,data){
            //open file for writing
            fs.open(this.basedir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
                  if(!err && fileDescriptor){
                        fs.writeFile(fileDescriptor,JSON.stringify(data),function(err){
                              if(!err){
                                    fs.close(fileDescriptor,function(err){
                                          if(!err){
                                                return false;
                                          }else{
                                                return `Error closing ${file} file`;
                                          }
                                    });
                              }else{
                                  return `Error writng to ${file}`;  
                              }
                        });
                  }else{
                        return `Could not create new ${file}, it may already exist`;
                  }
            });
      }
      
      //read form existing file
      read(dir,file){
            fs.readFile(this.basedir+dir+'/'+file+'.json','utf-8',function(err,data){
                  // callback(err,data);
                  if(!err && data){
                        return  {"status":false,"data":data};
                  }else{
                        return {"status":false,"Error":err};
                  }
            });
      }
            
      delete(dir,file){
            //unlink
            fs.unlink(this.basedir+dir+'/'+file+'.json',function(err){
                  if(!err){
                        return false;
                  }else{
                        return `failed to delete file ${file}`;
                  }
            });
      }
}

const data = new Data();//intialize the iser oruter class
export default data; //export user object property router