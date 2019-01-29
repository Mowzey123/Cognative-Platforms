"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Data {
    constructor() {
        this.basedir = path.join(__dirname, '../data/'); //define base data dir
    }
    create(dir, file, data, ext) {
        //open file for writing
        try {
            fs.open(this.basedir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
                if (!err && fileDescriptor) {
                    fs.writeFile(fileDescriptor, JSON.stringify(data), function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    return false;
                                }
                                else {
                                    console.log(`Error closing ${file} file`);
                                    return `Error closing ${file} file`;
                                }
                            });
                        }
                        else {
                            console.log(`Error writng to ${file}`);
                            return `Error writng to ${file}`;
                        }
                    });
                }
            });
        }
        catch (error) {
            this.update(dir, file, data);
        }
    }
    //read form existing file
    read(dir, file) {
        fs.readFile(this.basedir + dir + '/' + file + '.json', 'utf-8', function (err, data) {
            // callback(err,data);
            if (!err && data) {
                return { "status": false, "data": data };
            }
            else {
                return { "status": false, "Error": err };
            }
        });
    }
    delete(dir, file) {
        //unlink
        fs.unlink(this.basedir + dir + '/' + file + '.json', function (err) {
            if (!err) {
                return false;
            }
            else {
                return `failed to delete file ${file}`;
            }
        });
    }
    update(dir, file, data) {
        try {
            fs.appendFile(this.basedir + dir + '/' + file + '.json', "," + JSON.stringify(data), function (err) {
                if (err) {
                    console.log(err);
                    return `Could not update ${file}`;
                }
                else {
                    console.log('Updated!');
                    return `updated`;
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.Data = Data;
