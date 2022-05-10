---
tags: [shader, javascript, webgl, glsl]
---

# shader space, uv and position

```javascript
const boxBuffer = new T.BufferGeometry()
const vertices = new Float32Array([
    // Triangle Face
    -1.0, -1.0,  1.0, // 0 - A
     1.0, -1.0,  1.0, // 1 - B
     1.0,  1.0,  1.0, // 2 - C
    
    // Triangle Face
     1.0,  1.0,  1.0, // 3 - C
    -1.0,  1.0,  1.0, // 4 - D
    -1.0, -1.0,  1.0 // 5 - A
])

const uvs = new Float32Array([
    0,1, // 0 - A
    1,1, // 1 - B
    1,0, // 2 - C
    1,0, // 3 - C
    0,0, // 4 - D
    0,1, // 5 - A
    ])
boxBuffer.setAttribute( 'position', new T.BufferAttribute( vertices, 3 ) );
boxBuffer.setAttribute('uv', new T.BufferAttribute(uvs, 2))
```

D-------C
|		|
|		|
A-------B

constructor the mesh with the float array, each point contain 3 vertives, form a triangle face, with 2 triangle face form a quadrilateral.

uvs attributes for uv mapping, uv as 2d space using only x,y coordination. each 2 value corresponding the respect point in local space witch corresponding with shader mapping space.  

