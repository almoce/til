---
tags: [math, javascript]
---
# screen coordination to device coordination

in 2d space, in canvas space coordination, start top left with x,y = 0,0
in 3d space, in canvas device coordination, start center with x,y = 0,0

to maping the screen space to device space with mouse
```javascript
window.addEventListener('mousemove', (e) => {
    const x = (e.x / window.innerWidth) * 2 - 1
    const y = (e.y / window.innerHeight) * 2 - 1
    return {x, y}
})
```

the mouse postion divide by window, we will get result from range [0, 1] by the top left to the bottom right according with x and y.
to maping the center space, multiply the result to 2 and minus 1.