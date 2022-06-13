---
tags: [javascript]
---

# Map and WeakMap

### Map
key-value pairs and with insertion order of the keys, key and value can be objects or primitive values
map has iterability
- map key can be any value(funciton, object, primitive), vs Object of keys must be String or a Symbol
- the entrie is ordered by insertion, vs Object is not ordered by origin (ex, number keys)
- Map.size() can retrieved from size, Object has be determined manually (ex, Object.keys)
- is iterable, vs Object has no iteration protocal, but my get from(ex: for...of, for...in, Object.keys, Object.entries)



### WeakMap
collection of key/value pair, and the `keys` must be object(Symbol and primitive are not allowed), `values` can be any javascript type
weakmap has no iterability 
entrie are garbage collected dependented, which means if the object has been cleared by garbage collected, it would removed from weakmap automatically 

instnace methods
- delete(key)
- get(key)
- has(key)
- set(key, value)


```javascript
let a = new WeakMap()
(() => {
    let b = {b: 1}
    a.set(b, 1)
})()
// a = WeakMap{}
```
