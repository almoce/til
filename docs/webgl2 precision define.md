---
tags: [webgl, JavaScript]
---


# webgl2 precision
precission define can impact the performance and quality or accuracy
> low precision
> - good performance, my cause bug rendering
  
> hight precision
> - bad performance for rendering

pre defined precision can omit the precision define  
##### Vertex shaders
- float
- int
- sampler2D
- samplerCube
  
##### fragment shaders
- ~~float~~
- int
- sampler2D
- samplerCube
  


```
`#version 300 es
precision mediump float;
out vec4 fragColor;

void main() {
	fragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
```

```
`#version 300 es
out mediump vec4 fragColor;

void main() {
	fragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
```


can be defined for each variable or in global for all.