# Compare Builder

A series of Tools to make sorting Arrays easier to work with, particularly when sorting objects. 

Can be used to build compare functions to pass to `Array.sort()`, 
or can extend `Array` directly to include new methods `Array.sortByAsc()`, `Array.sortByDesc()` and `Array.buildSort().asc().desc().sort()`

For example:
```js
const primitiveInput = ["1", "3", "2"]

// using comparators
primitiveInput.sort(byAttributeAsc(i => i)) // ["1", "2", "3"]
primitiveInput.sort(byAttributeDesc(i => i)) // ["3", "2", "1"]

// using Array Extensions
primitiveInput.sortByAsc() // ["1", "2", "3"]
primitiveInput.sortByDesc() // ["3", "2", "1"]

```

## Installation

```shell
npm install --save compare-builder
```


```js

```




