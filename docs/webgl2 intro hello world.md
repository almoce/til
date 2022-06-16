---
tags: [webgl, JavaScript]
---


# webgl2 intro hello world

### webgl2 process
- create program
- create shader
	+ compile shader
	+ set shader
	+ attach shader
- link program
- use program
- draw


### webgl1 -> webgl2

- shader source need declara the version, and also need to be the first line,  `#version 300 es`
- fragment shader must define the precison, ex: `precision mediump float;`, does not return `gl_FragColor`, can be defined with `out`, ex: `out vec4 fragColor;`


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
		const gl = canvas.getContext('webgl2')


		const program = gl.createProgram();

		{ 
			const source = `#version 300 es

				void main() {
					gl_Position = vec4(0.0, 0.0, 0.0, 0.0);
					gl_PointSize = 100.0;
				}
			`
			// create vertex shader
			const shader = gl.createShader(gl.VERTEX_SHADER)
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			gl.attachShader(program, shader)
		}

		{ 
			const source = `#version 300 es
			precision mediump float;
			out vec4 fragColor;

			void main() {
				fragColor = vec4(1.0, 0.0, 0.0, 1.0);
			}
			`
			// create fragment shader
			const shader = gl.createShader(gl.FRAGMENT_SHADER)
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			gl.attachShader(program, shader)
		}

		gl.linkProgram(program)

		gl.useProgram(program)

		gl.drawArrays(gl.POINTS, 0, 1)

	</script>
</body>
</html>
```