---
tags: [math, javascript, vector, 3d, game]
---

# first person view moving control in 3d

when a object moving in 2d we will have 2 direction, `x` and `y`, in 3d we will have 3 direction, `x`, `y` and `z`  
  
what are the properties we need to define the person moving
- position 
- speed
- direction
- camera view  
  
the object's position is defined by the objects moving direction and moving speed
`position = direction + speed`  
  
if we do not care about the object view/camera view, we can simply modify the object position like in 2d, if the object have the speed 1, we may have `x+1`, `x-1`, or `z+1`, `z-1`  
  
in the first person view, this object may change the view direction, so the forward and backward would defined by the direction  

the direction would be simple detect as the same as the camera view direction`camera.getWorldDirection()`, and the horizontal direction would be detect the the cross product, `direction.cross(camera.up)` witch is the vector perpendicular to the direction vector and the up direction.  

now we have the object view direction, then would simple by adding the speed the to direction, but the speed should be manipulated by the moving direction in interaction, for example, if we press up, it would move to forward and left move to left, so there is a multi direction if we press up and left in the simultaneously, 45deg direction.  
for example, if we have forward direction (0,0,1), and left direction (1,0,0), then the final direction would be (1,0,1).  

so for moving speed of 2 direction, simple add up from to direction, if we move forward and left simultaneously, `direction=forward+left`, and back to right `direction = backward + right` and so on. and the inverse direction, `backward = -forward`, `right = - left`.  

to sum up, we would need a moving speed direction vector, `(0,0,0)`, then get the object view direction to detect the moving direction, moving direction may be forward/backward,or left/right. `final moving direction = sum of multi direction controlled by interaction`, each direction can be defined by the single direction vector.  


```javascript
let position = Vector3(0,0,0)
let direction = Vector3(0,0,0)
let camera = Vector3(1,2,3)
let cameraUp = Vector(0,1,0)

direction = camera.getWorldDirection() // the view's direction
direction.y = 0 // normalize the y axis to 0, prevent the object moving up
direction.normalize() // normalize the scale to 1 of the direction
if (movingLeft || movingRight) {
    direction = viewDirection.cross(camera.up) // get the cross product with up direction
}

let speed = Vector3(0,0,0)
if (forward) {
    direction = direction * 1
}
if (backward) {
    direction = direction * -1
}
if (movingLeft) {
    direction = direction * 1
}
if (movingRight) {
    direction = direction * -1
}
const finalDirection = direction + speed
position = position + finalDirection
```