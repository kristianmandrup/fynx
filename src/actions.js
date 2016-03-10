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

export function create(specs, listener) {
  return _createActions(listener, specs);
};

export function createAsync(specs, listener) {
  return _createActions(listener || axn.async, specs);
};
