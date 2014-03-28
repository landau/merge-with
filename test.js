'use strict';

var is = require('is-predicate');
var assert = require('assert');
var mergeWith = require('./');

var map = { a: 1 };
var map2 = { a: 2, b: 5 };
var map3 = { b: 3 };
var map4 = { c: 0, a: 1 };

function add(a, b) {
  return a + b;
}

describe('mergeWith', function() {
  it('should throw an error if no maps array is provided', function() {
    var err = null;
    try {
      mergeWith();
    } catch(e) {
      err = e;
    }

    assert(is.instance(TypeError, err));
  });

  it('should throw an error if no function is provided', function() {
    var err = null;
    try {
      mergeWith([]);
    } catch(e) {
      err = e;
    }

    assert(is.instance(TypeError, err));
  });

  it('should return an empty object if no maps are provided', function() {
    var m = mergeWith([], add);
    assert.equal(Object.keys(m).length, 0);
  });

  it('should return a copy of a single given map', function() {
    var m = mergeWith([map], add);
    assert(is.not.equal(m, map));
    assert.equal(m.a, map.a);
  });

  it('should merge 2 objects with a fn call', function() {
    var m = mergeWith([map, map2], add);
    assert.equal(m.a, 3);
  });

  it('should merge n objects with a fn call', function() {
    var m = mergeWith([map, map2, map3, map4], add);
    assert.equal(m.a, 4);
    assert.equal(m.b, 8);
    assert.equal(m.c, 0);
  });
});
