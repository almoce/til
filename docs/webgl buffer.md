---
tags: [webgl, javascript]
---

# webgl buffer
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
---
[^bindBuffer]: [MDN - WebGLRenderingContext.bindBuffer()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer)
[^bufferData]: [MDN - WebGLRenderingContext.bufferData()](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData)