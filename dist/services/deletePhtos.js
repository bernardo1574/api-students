"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _fs = require('fs');

exports. default = async (path) => {
  _fs.unlink.call(void 0, path, (error) => {
    if (error) {
      return console.log(error);
    }
    return true;
  });
};
