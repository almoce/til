---
tags: [shader, javascript, webgl, glsl]
---
# shader intro(uniform and attribute)

### uniform
uniform is a variable broadcast out to a shader program, we can define a uniform variable in javascript and passing the variable to vertex shader and fragment shader.

```javascript
uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1);
}
```

1. get the uniform location in shader program, `gl.getUniformLocation(${shaderProgram}, ${uniformVaraibleName})`, *shaderProgram* is the program created from shader `gl.createProgram()`, and the *uniformVariableName* is the same name defined in the shader source code string, this step should be use after `gl.linkProgram` and before `gl.useProgram`
2. set the uniform variable with `gl.uniform3f`, to set value this command should called after `gl.useProgram`, so that can set the current location of program.

```javascript
/*
    ......
    const program = gl.createProgram()
*/
let colorLocatoin
function init(gl) {
    // gl.linkProgram(program)
    colorLocatoin = gl.getUnioformLocation(program, 'color')
}
function draw(gl) {
    // gl.useProgram(program)
    gl.uniform3f(colorLocatoin, 1, 0, 0)
    // or
    gl.uniform3fv(colorLocatoin, [1,0,0])
}
```

**gl.uniform[1234][fi]?v(location, value)**
- `gl.uniform1f` - float
- `gl.uniform2f` - vec2
- `gl.uniform3f` - vec3
- `gl.uniform4f` - vec4
- `gl.uniform1i` - int (Or sampler2d/samplerCube -- more on this later)
- `gl.uniform2i` - ivec2
- `gl.uniform3i` - ivec3
- `gl.uniform4i` - ivec4
- `gl.uniformMatrix2fv` - mat2
- `gl.uniformMatrix3fv` - mat3
- `gl.uniformMatrix4fv` - mat4




### attribute
Attributes are processed by the vertex shader and used to generate primitives, which are then rasterized by the GPU.
in javascirpt, store the varialbe as buffer atrribute, and those attributes will pass and process by vertex shader. attribute location are integers and stored in buffer.

1. set an attribute location `gl.bindAttribLocation(${program}, ${locationInterger}, ${attributeName})`, this step should called before we link the program `gl.linkProgram()`

```javascript
gl.bindAttribLocation(program, 0, 'position')
gl.bindAttribLocation(program, 1, 'color')
gl.linkProgram(program)
```