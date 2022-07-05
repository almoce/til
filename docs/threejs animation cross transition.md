---
tags: [threejs, animation, javascript]
---

# threejs animation cross transition

create 2 or multiplier animation actions, and set the action status to play, adjust the weight of the inactive action. by manipulate the weight value can make the cross fade transition between animations.


```javascript
const animationsObject = new THREE.animationObjectGroup($OBJECTS/$SCENE)
const mixer = new THREE.AnimationMixer(animationsObject)
const actionA = new THREE.AnimationAction()
actionA.play()
actionA.setEffectiveWeight(1)
mixer.clipAction(actionA)

const actionB = new THREE.AnimationAction()
actionB.play()
actionB.setEffectiveWeight(0)
mixer.clipAction(actionB)


{ // corss fade transition
    actionB.enabled = true
    actionB.setEffectiveWeight(1)
    // (method) AnimationAction.crossFadeTo(fadeInAction: THREE.AnimationAction, duration: number, warp: boolean): THREE.AnimationAction
    actionA.crossFadeTo(actionB, 1, true) 
}

function update(delta) {
    render.render(camera, scene) // render
    mixer.update(delta)
    requestAnimationFrame(update)
}

update()

```

