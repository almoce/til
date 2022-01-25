---
tags: [webgl, javascript]
---

# webgl intro
learning the basic of webgl  

### Clear the drawing buff
`gl.clearColor(${red}, ${gree}, ${blue}, ${alpha})` set the rgba color, input arguemtns are floating point 0 - 1  
`gl.clear(gl.COLOR_BUFFER_BIT)` clear the color channel of the drawing buffer  
    
### Vilewport
`gl.drawingBufferWidth` the width of the context  
`gl.drawingBufferHeight` the height of the context  
`gl.viewport(${x}, ${y}, ${width}, ${height})` use viewport to specify the portion of the context before drawing function  
most time drawing with entire screen of context`gl.viewport(0,0 gl.drawingBufferWidth, gl.drawingBufferHeight)`  
  
### Scissor & Capabilities
The Scissor is similar to cropping an image, while set viewport is similar to resize the image  
`gl.enable(${capability})` turn on a specified capability  
`gl.enable(gl.SCISSOR_TEST)` turn on the scissor capability  
`gl.scissor(${x}, ${y}, ${width}, ${height})` set the scissor region, x, y coordinate from the lower left corner  
`gl.disable(gl.SCISSOR_TEST)` turn off the scissor capability  
after enbale the scissor, should disable the scissor after drawing to let drawing buff restore from previous state  

```javascript
const w = gl.drawingBufferWidth
const h = gl.drawingBufferHeight

gl.clearColor(1,1,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.enable(gl.SCISSOR_TEST)
gl.scissor(0,0,w/2,h/2)
gl.clearColor(1,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.disable(gl.SCISSOR_TEST)

```
