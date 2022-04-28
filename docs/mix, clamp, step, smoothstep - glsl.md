---
tags: [javascript, glsl, shader]
---


# mix, clamp, step, smoothstep - glsl

### mix
> return the linear interpolation value from range
`mix(x, y, n)`
- mix(x, y, 0.0) = x
- mix(x, y, 1.0) = y

### clamp
> return value by defined min and max range
`clamp(n, min, max)`

### step
> return value 0 or 1 by the defined edge value
`step(edge, n)`
- n < edge = 0.0
- n >= edge = 1.0

### smoothstep
> return linear interpolation value from defined range, the out range would return 0 or 1
`smoothstep(a, b, n)`
- n < a = 0.0
- n > b = 1.0