---
tags: [webgl, JavaScript]
---


# webgl2 uniforms

- global variables
- defined in shaders
- set with javascript
- send to and shared to vertex and fragments shader
- cant change during a draw call

##### webgl vs opengl 3.0 es
> webgl
- getAttribLocation() returns a Nubmer
- getUniformLocation() returns an Object
> opengl
- glGetAttribLocation() returns a GL_INT
- glGetUniformLocation() returns a GL_INT

uniform cant change during the draw, so we should only get the location once before set a uniform, and prevent try obtain the location during the draw or repeat call.


### tip for passing attributes and uniform
1. `uniform float uSize;` - `gl.uniform1f(uSize, 1.0)`
2. `uniform float uSize;` - `gl.uniform1fv(uSize, [1.0])`
3. `uniform float uSize[3];` - `gl.uniform1fv(uSize, [1.0, 2.0, 3.0])`

the option 1 is equal as option 2. the last 3 option, which will result passing as array to the shader, defining the uniform as array with 3 item count.





```javascript
const FRAG_SOURCE = `
	#version 300 es
	precision medium float;

	uniform vec4 uColor;
	out vec4 fragColor;
	void main() {
		fragColor = uColor;
	}
`
const uColor = gl.getUniformLocation(program,  'uColor') // get the location
gl.uniform4f(uColor, 1,0,0,1) // set the uniform
// gl.uniform4fv(uColor, [1,0,0,1]) // set the uniform
```



```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
</head>
<body>
	<canvas></canvas>
	<script>
		const canvas = document.querySelector('canvas');
		canvas.width = 500
		canvas.height = 500
		canvas.style.border = '1px solid #ccc'
		const gl = canvas.getContext('webgl2')


		const program = gl.createProgram();
		const shaders = {}
		{ 
			const source = `#version 300 es
			precision mediump float;
			uniform float uPointSize;
			uniform vec2 uPosition;

			void main() {
				gl_PointSize = uPointSize;
				gl_Position = vec4(uPosition, 0.0, 1);
			}
			`
			// create vertex shader
			const shader = gl.createShader(gl.VERTEX_SHADER)
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			gl.attachShader(program, shader)
			shaders['vertex'] = shader
		}

		{ 
			const source = `#version 300 es
			precision mediump float;
			out vec4 fragColor;

			uniform int uIndex;
			uniform vec4 uColor[3];

			void main() {
				fragColor = uColor[uIndex];
			}
			`
			// create fragment shader
			const shader = gl.createShader(gl.FRAGMENT_SHADER)
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			gl.attachShader(program, shader)
			shaders['fragment'] = shader

		}

		gl.linkProgram(program)

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.log(gl.getShaderInfoLog(shaders['vertex']));
			console.log(gl.getShaderInfoLog(shaders['fragment']));
		}


		gl.useProgram(program)




		const uPointSize = gl.getUniformLocation(program, "uPointSize")
		const uPosition = gl.getUniformLocation(program, "uPosition")
		const uIndex = gl.getUniformLocation(program, 'uIndex')
		const uColor = gl.getUniformLocation(program, 'uColor')

/**
 		// setting the color list, and code manually for each point
 		const colorList = [
			1,0,0,1, // red
			0,1,0,1, // Green
			0,0,1,1, // blue
		]
		gl.uniform4fv(uColor, colorList)

		gl.uniform1f(uPointSize, 100)
		gl.uniform2f(uPosition, 0, 0)
		gl.uniform1i(uIndex, 0)
		gl.drawArrays(gl.POINTS, 0, 1)

		gl.uniform1f(uPointSize, 50)
		gl.uniform2f(uPosition, 0.5, 0.5)
		gl.uniform1i(uIndex, 1)
		gl.drawArrays(gl.POINTS, 0, 1)

		gl.uniform1f(uPointSize, 50)
		gl.uniform2f(uPosition, -0.5, 0.5)
		gl.uniform1i(uIndex, 2)
		gl.drawArrays(gl.POINTS, 0, 1)

 */

		const colorList = [
			[1,0,0,1], // red
			[0,1,0,1], // Green
			[0,0,1,1], // blue
		]

		gl.uniform4fv(uColor, colorList.flat())

		const v = () => Math.random() * (Math.random() > 0.5 ? -1 : 1)
		colorList.forEach((i, idx) => {
			gl.uniform1f(uPointSize, (idx+1)* 20)
			gl.uniform2f(uPosition, v(), v())
			gl.uniform1i(uIndex, idx)
			gl.drawArrays(gl.POINTS, 0, 1)
		})

	</script>
</body>
</html>
```