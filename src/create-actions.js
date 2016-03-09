'use strict';
const axn = require('axn');

function _createActions(listener, specs) {
  const obj = {};
  listener = listener || axn;
  if (Array.isArray(specs)) {
    specs.forEach(function (name) {
      obj[name] = axn();
    });
  } else {
    Object.keys(specs).forEach(function (name) {
      obj[name] = axn(specs[name]);
    });
  }
  return obj;
}

module.exports = function createActions(specs, listener) {
  return _createActions(listener, specs);
};

module.exports.async = function createAsyncActions(specs, listener) {
  return _createActions(listener || axn.async, specs);
};
