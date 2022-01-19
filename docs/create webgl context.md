---
tagas: [canvas, html, webgl, javascript]
---

# create webgl context

 ```javascript
 const canvas = document.createElement('canvas') // create canvas dom element
 canvas.width = 100 // define width
 canvas.height = 100 // define height
 const gl = canvas.getContext('webgl') // get webgl context from cavnas
 gl.clearColor(0.0, 0.0, 0.0, 1.0) // set buffer clear color with black
 gl.clear(gl.COLOR_BUFFER_BIT) // clear canvas with clear color
 document.body.appendChild(canvas) // append canvas element to html 
 ```
