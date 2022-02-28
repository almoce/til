---
tags: [javascript, threejs]
---

# threejs buffergeometry and skeleton clone

for skinning we have set the 'skinIndex' and 'skinWeight' attribute for geometry [^skinnedMesh]

`normal` attribute for lighting
`position` attribute for position
`skinIndex` indexs of bone position
`skinWeight` weight of bone

if the geometry is indexed geometry, when we have clone the geometry we have to set index
```javascript
const indexed = new BufferAttribute() // index buffer attribute
const geometry = new THREE.BufferGeometry()
geometry.setIndex(indexed)

geometry.setAttribute('position', attributefuffer) // fake code for setting attribute
geometry.setAttribute('skinIndex', attributefuffer) // fake code for setting attribute
geometry.setAttribute('skinWeight', attributefuffer) // fake code for setting attribute
geometry.setAttribute('normal', attributefuffer) // fake code for setting attribute
```

to create and bind skeleton
```javascript
const bones = [bone, bone] // list of bones
const skeleton = new THREE.Skeleton(bones)
const skinmesh = new THREE.SkinnedMesh( geometry, material);
skinmesh.add(bones[0]) // add root bone to scene or add to parent
skinmesh.bind(skeleton)
```
skinmesh bind with default as 'attch' mode,  would bind the mesh's worldmatrix, which result the mesh will stick to the skeleton position


---
[^skinnedMesh]: [SkinnedMesh](https://threejs.org/docs/index.html?q=skin#api/en/objects/SkinnedMesh)