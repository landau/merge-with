[![Build Status](https://travis-ci.org/landau/merge-with.svg)](https://travis-ci.org/landau/merge-with)

A port of clojure's `merge-with`.

Returns a map that consists of the rest of the maps transformed into
the first.  If a key occurs in more than one map, the mapping(s)
from the latter (left-to-right) will be combined with the mapping in
the result by calling `fn(val-in-result, val-in-latter)`.

## Install

`npm i -S merge-with`

## Usage

```js
var map = { a: 1 };
var map2 = { a: 2, b: 5 };
var map3 = { b: 3 };
var map4 = { c: 0, a: 1 };

function add(a, b) {
  return a + b;
}

var m = mergeWith(add, [map, map2, map3, map4]);
assert.equal(m.a, 4);
assert.equal(m.b, 8);
assert.equal(m.c, 0);
```
