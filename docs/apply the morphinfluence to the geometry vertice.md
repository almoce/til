---
tags: [javascript, threejs]
---

# apply the morphTargetInfluences to the geometry vertice for animation scenery

if the geometry shape have the `morphAttributes` with the influence attribution to modify dynamically the shape. but in some case, we have the animation frames, which also apply the influence to the geometry, if we want to keep the change before apply the animation, we have to modify the vertice.

```javascript

// const mesh = Three.Mesh
// const influences = [1,2,3,4,5,6] // modified influences

const position = mesh.geometry.attributes.position // get the position buffer from geometry

for (let i = 0 ; i< position.count; i++) {
    const base = new T.Vector3()
    base.fromBufferAttribute(position, i) // Sets this vector's x, y and z values from the attribute.
    base.applyMatrix4(mesh.matrixWorld) // multiplies to worldMatrix and divide by perspective
    Object.entries(influences).forEach(([key, value]) => {
        const index = mesh.morphTargetDictionary[key] // get the index from the target dictionary
        base.x += mesh.geometry.morphAttributes.position[index].getX(i) * value; // multiply the x axies to influence
        base.y += mesh.geometry.morphAttributes.position[index].getY(i) * value; // multiply the y axies to influence
        base.z += mesh.geometry.morphAttributes.position[index].getZ(i) * value; // multiply the z axies to influence
    })
    mesh.geometry.attributes.position.setXYZ(i, base.x , base.y , base.z) // set the result transformation to position buffer attribute
}
mesh.geometry.attributes.position.needsUpdate = true; // notify the gpu to update in render

```  