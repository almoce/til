---
tags: [webgl, shader, glsl, javascript]
---

# create shader program

1. create a shader, to create a shader use `gl.createShader(${shaderType})`, shader have two type `gl.VERTEX_SHADER` and `gl.FRAGMENT_SHADER`
2. load shader source code, `gl.shaderSource(${shader}, ${source})`, which shader is the shader create from first step from `gl.createShader`, the source is GLSL source code string.
3. compile the shader `gl.compileShader(${shader})`
4. when we have vertex shader and fragment shader, we have to create and compile for each of them
5. create the shader program `gl.createProgram()`
6. attach the shader to program `gl.attachShader(${program}, ${shader})`
7. link the program to webgl context `gl.linkProgram(${program})`
8. finaly use the shader program in drawing loop, `gl.useProgram(${program})`


```javascript
const VERT_SRC = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}

`
const FRAG_SRC = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position,0,1);
}
`

let shaderProgram

function init(gl) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, VERT_SRC)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
}

function draw(gl) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(shaderProgram)

    // draw with buffer
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.getShaderSource(shader, source)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Error compiling shader:", gl.getShaderInfoLog(shader))
    }
    return shader
}


```