# wegbl draw (drawArray, drawElements)

### basic drawing array
  
**`gl.drawArray(${mode}, ${offset}, ${count})**
- `mode` of primitive (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLE_FAN, gl.TRIANGLE_STRIP)
- `offset` starting vertex
- `count` of number of vertices to draw

```javascript
gl.drawArray(gl.TRIANGLES, 0, 3)
gl.drawArray(gl.LINES, 3, 2)
```

### indexed drawing element
> for the indexed element, to set the buffer data must be `Uint16Array`[^Uint16Array]     

**`gl.drawElements(${mode}, ${count}, ${type}, ${offset})`[^drawElements]**  
arguments are almost the same as drawArray, the extra argument data type:  
- `type`,  specify the type of the value of elements, (gl.UNSIGNED_SHORT, gl.UNSIGNED_SHORT)

```javascript
gl.drawElements(gl.POINTS, 8, gl.UNSIGNED_BYTE, 0);
gl.drawElements(gl.TRIANGLES, 9, gl.UNSIGNED_SHORT, 0)
```

when we have indexed element array buffer, ex:
```javascript
const VERTICES_SRC = [
    0.18,
    0.12,
    0.23,
    0.02,
    0.37,
    0.40,
    0.16
]
const INDICES_SRC = [
    0, 1, 2, // first triangle indices
    3, 4, 5, // second triangle indices
    0, 2, 4 // third triangle indices
]

// bind vertices buffer
const verticesBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES_SRC), gl.STATIC_DRAW)


// bind the indices buffer
const indicesBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(INDICES_SRC), gl.STATIC_DRAW)


// darw eleemnts
gl.drawElements(gl.TRIANGLES, VERTICES_SRC.length, gl.UNSIGNED_SHORT, 0)
```

---
[^drawElements]: [MDN - WebGLRenderingContext.drawElements()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements)
[^Uint16Array]: [MDN - Uint16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)