'use strict';

function exists(val) {
  return val != null;
}

function isFn(fn) {
  return typeof fn === 'function';
}

module.exports = function mergeWith(fn, maps) {
  if (!isFn(fn)) throw new TypeError('`fn` must be of type Function');
  if (!Array.isArray(maps)) throw new TypeError('`maps` must be an Array');

  function setKey(obj, val, key) {
    obj[key] = exists(obj[key]) ? fn(obj[key], val) : val;
    return obj;
  }

  function merge(obj, obj2) {
    return Object.keys(obj2).reduce(function(acc, key) {
      return setKey(acc, obj2[key], key);
    }, obj || {});
  }

  return maps.reduce(merge, {});
};
