---
tags: [webgl, shader, glsl, javascript]
---  

# resume webgl simple triangle drawing
review the steps to draw a triangle in webgl  
- defined the data, or get the data, prepare the data for render
- create dom element, get and define the webgl context from canvas
- create the shader program
    + `gl.createProgram` create a shader program
    + `gl.createShader` create shader from data `gl.shaderSource`, and compile it `gl.compileShader`, attach shader `gl.attachShader` to program, bind the attributes location with `gl.bindAttribLocation`, then link program to webgl `gl.linkProgram`
- create the buffer data
    + `gl.createBuffer` to create buffer, `gl.bindBuffer` bind the buffer to webgl, `gl.bufferData` set the buffer data
    + `gl.enableVertexAttribArray` enable the vertex pointer with location we had bind in shader attributes, in this case we have `position` attribute in vertex shader at indices `0`, `vertexAttribPointer` set the vertex pointer with data range and type
- clear up the screen with `gl.clearColor` and `gl.clear`
- to get uniform with `gl.getUniformLocation`, we must get location after we link the program `gl.linkProgram`
- send command to webgl to use the shader program `gl.useProgram`
- change the uniform value with `gl.uniform3fv`/`gl.uniform3f`, we must set the value after we use program `gl.useProgram`
- drawing the buffer with shader in screen `gl.drawArrays`

```javascript
    const VERT_SRC = `
    precision mediump float;
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0, 1);
    }
    `
    const FRAG_SRC = `
    precision mediump float;
    uniform vec3 color;
    void main() {
        gl_FragColor = vec4(color, 1);
    }
    `

    const BUFFER_DATA = [
        0, 0.5,
        -0.5, -0.5,
        0.5, -0.5 
    ]

    const ATTRIB_LOC = {
        position: 0
    }

    let gl, program

    createDomElement()
    createProgram()
    createBuffer()
    
    draw()

    function draw() {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.clearColor(1,0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        const color = gl.getUniformLocation(program, 'color')
        gl.useProgram(program)
        gl.uniform3fv(color, [Math.random(),Math.random(),Math.random()])
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        requestAnimationFrame(draw)
    }

    function createBuffer() {
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(BUFFER_DATA), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(ATTRIB_LOC['position'])
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    }

    function createProgram() {
        program = gl.createProgram()
        const vertex = createShader(gl.VERTEX_SHADER, VERT_SRC)
        const frag = createShader(gl.FRAGMENT_SHADER, FRAG_SRC)
        gl.attachShader(program, vertex)
        gl.attachShader(program, frag)
        gl.bindAttribLocation(program, ATTRIB_LOC['position'], 'position')
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
            return null;
        }

    }
    function createShader(type, source) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        return shader
    }
    function createDomElement() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        document.body.appendChild(canvas)
        gl = canvas.getContext('webgl')
    }
```