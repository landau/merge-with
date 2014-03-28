'use strict';

function exists(val) {
  return val != null;
}

function isFn(fn) {
  return typeof fn === 'function';
}

/**
 * Returns a map that consists of the rest of the maps transformed into
 * the first.  If a key occurs in more than one map, the mapping(s)
 * from the latter (left-to-right) will be combined with the mapping in
 * the result by calling `fn(val-in-result, val-in-latter)`.
 *
 * @param {array} maps - an array of maps
 * @param {function} fn
 *
 * @return {object}
 */
module.exports = function mergeWith(maps, fn) {
  if (!Array.isArray(maps)) throw new TypeError('`maps` must be an Array');
  if (!isFn(fn)) throw new TypeError('`fn` must be of type Function');

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
