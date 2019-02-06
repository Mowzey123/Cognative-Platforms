"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mongoose = require("mongoose");

var MONGO_URI = 'mongodb://localhost/restapits';
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
//# sourceMappingURL=mongodb.connect.js.map
