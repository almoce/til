---
tags: [webgl, javascript]
---
  
# webgl buffer and attribute pointer

### buffer
Vertex attributes are read from arrays of binary data called buffers. 
1. `gl.createBuffer()` To create a buffer
2. `gl.bindBuffer(gl.ARRAY_BUFFER, buffer)` bind and define the buffer target type
3. `gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.DYNAMIC_DRAW)` set the buffer data  

```javascript
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.DYNAMIC_DRAW)
```

**gl.bindBuffer(target: GLenum, buffer: WebGLBuffer)[^bindBuffer]**  
> target: GLenum
- `gl.ARRAY_BUFFER`: Buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data.
- `gl.ELEMENT_ARRAY_BUFFER`: Buffer used for element indices.
- When using a WebGL 2 context, the following values are available additionally:
    + `gl.COPY_READ_BUFFER`: Buffer for copying from one buffer object to another.
    + `gl.COPY_WRITE_BUFFER`: Buffer for copying from one buffer object to another.
    + `gl.TRANSFORM_FEEDBACK_BUFFER`: Buffer for transform feedback operations.
    + `gl.UNIFORM_BUFFER`: Buffer used for storing uniform blocks.
    + `gl.PIXEL_PACK_BUFFER`: Buffer used for pixel transfer operations.
    + `gl.PIXEL_UNPACK_BUFFER`: Buffer used for pixel transfer operations.
  
> buffer: WebGLBuffer  

**gl.bufferData(target: GLenum, data: [], usageHint:)[^bufferData]**
> target: GLenum  
> data: is either a number representing the size of the buffer to reserve, or a typed array representing data to allocate.  
> usageHint is a flag which has no semantic effect, but can be one of the following values, used for performance hints.  
+ `gl.DYNAMIC_DRAW`: buffers that are updated frequently
+ `gl.STREAM_DRAW`: buffers that won't chang
+ `gl.STATIC_DRAW`:  buffers that are created once and used once.  
  
```javascript
// WebGL1:
void gl.bufferData(target, size, usage);
void gl.bufferData(target, ArrayBuffer? srcData, usage);
void gl.bufferData(target, ArrayBufferView srcData, usage);

// WebGL2:
void gl.bufferData(target, ArrayBufferView srcData, usage, srcOffset, length);
```

### attribute pointers
vertex attribute pointers are pointers to the buffer data, to define the range of data from buffer.   
- first we need enable the vertex attribute, `gl.enableVertexAttribArray(${attributeLocation})`, attributeLocation is the step when we create a shader, and when we already defined the location index of attribute with the command `gl.bindAttribLocation`
- then tell webgl to use an attribute pointer from the location with defined range and type `gl.vertexAttribPointer(${attributeLocation}, ${size}, ${type}, ${normalized}, ${stride}, ${offset})`
    + `attributeLocation`, an index to the attribute location
    + `size`, the data type or size of the attribute (1 = float, 2 = vec2, 3 = vec3, 4 = vec4)
    + `type` is the type fot the data in the buffer, (gl.FLOAT, gl.BYTE, gl.SHORT, gl.INT, gl.UNSIGNED_BYTE, gl.UNSIGNED_SHORT, gl.UNSIGNED_INT, gl.FIXED)
    + `normalized`, a flag which checks if set for BYTE, SHORT or INT types rescales them to the range +/- 1. This can be useful for encoding values like normals or texture coordinates compactly.
    + `stride`, is the distance between successive attributes in bytes. If set to 0, then it assumes that the attributes are tightly packed.
    + `offset`, is a pointer (in bytes) to the start of the first attribute in the array.
  

```javascript
const VERT_SRC = `
    attribute vec2 position;
    voind main() {
        vec2 pos = position
        gl_Position = vec4(pos, 0, 1)
    }
`
const BUFFER_DATA = [
    x0, y0,
    x1, y1,
    x2, y2
]
let program
// program = createShaderProgram()

const positionLocation = 0 // defined the location of the attribute

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(BUFFER_DATA), gl.DYNAMIC_DRAW)

gl.bindAttribLocation(program, positionLocation, 'position')
gl.enableVertexAttribArray(positionLocation)
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
```
---
[^bindBuffer]: [MDN - WebGLRenderingContext.bindBuffer()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
[^bufferData]: [MDN - WebGLRenderingContext.bufferData()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)
