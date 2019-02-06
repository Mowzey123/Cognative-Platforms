"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require("fs");

var path = require("path");

var mkdirp = require("mkdirp");

var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);

    this.basedir = path.join(__dirname, '../data/'); //define base data dir
  }

  _createClass(Data, [{
    key: "create",
    value: function create(dir, file, data) {
      //open file for writing
      try {
        fs.open(this.basedir + dir + '/' + file, 'wx', function (err, fileDescriptor) {
          if (!err && fileDescriptor) {
            fs.writeFile(fileDescriptor, JSON.stringify(data), function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    return false;
                  } else {
                    console.log("Error closing ".concat(file, " file"));
                    return "Error closing ".concat(file, " file");
                  }
                });
              } else {
                console.log("Error writng to ".concat(file));
                return "Error writng to ".concat(file);
              }
            });
          }
        });
      } catch (error) {
        this.update(dir, file, data);
      }
    } //read form existing file

  }, {
    key: "read",
    value: function read(dir, file) {
      fs.readFile(this.basedir + dir + '/' + file + '.json', 'utf-8', function (err, data) {
        // callback(err,data);
        if (!err && data) {
          return {
            "status": false,
            "data": data
          };
        } else {
          return {
            "status": false,
            "Error": err
          };
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete(dir, file) {
      //unlink
      fs.unlink(this.basedir + dir + '/' + file + '.json', function (err) {
        if (!err) {
          return false;
        } else {
          return "failed to delete file ".concat(file);
        }
      });
    }
  }, {
    key: "update",
    value: function update(dir, file, data) {
      try {
        fs.appendFile(this.basedir + dir + '/' + file + '.json', "," + JSON.stringify(data), function (err) {
          if (err) {
            console.log(err);
            return "Could not update ".concat(file);
          } else {
            console.log('Updated!');
            return "updated";
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "makeDir",
    value: function makeDir(dir) {
      mkdirp(dir, function (err) {
        if (err) console.error(err);else console.log('pow!');
      });
    }
  }]);

  return Data;
}();

exports.Data = Data;
var dataobj = new Data();
exports.default = dataobj;
//# sourceMappingURL=data.js.map
