/**
@author: Isaiah Mann
@description: Classes meant to represent the solar system in THREE.js
@requires: THREE.js, world.js
*/

function Galaxy () {}

function GalacticBody (scene, origin, radius, colors) {
}

GalacticBody.prototype = new WorldObject();
GalacticBody.prototype.setup (scene, origin, radius, colors) {
     // Creates a uniforma scale of double the radius:
     var scale = Vector3.one();
     scale.scale(radius * 2);
     this.earlySetup(scene, origin, scale, colors);
     this.radius = radius;
}

function Star () {}
Star.prototype = new GalacticBody();

function Planet () {}
Planet.prototype = new GalacticBody();

function Moon () {}
Moon.prototype = new GalacticBody();
