---
tags: [canvas, html, webgl, javascript]
---

# create webgl context

> Once we have the canvas, we try to get a WebGLRenderingContext for it by calling getContext() and passing it the string "webgl". If the browser does not support WebGL, getContext() will return null in which case we display a message to the user and exit.


 ```javascript
 const canvas = document.createElement('canvas') // create canvas dom element
 canvas.width = 100 // define width
 canvas.height = 100 // define height
 const gl = canvas.getContext('webgl') // get webgl context from cavnas
 gl.clearColor(0.0, 0.0, 0.0, 1.0) // set buffer clear color with black
 gl.clear(gl.COLOR_BUFFER_BIT) // clear canvas with clear color
 document.body.appendChild(canvas) // append canvas element to html 
 ```

for morden browser we can choose from '2d' and 'webgl' context, and they can not use in the same context, which mean if we use one can not use another in the same canvas context, the next context would return null.  
