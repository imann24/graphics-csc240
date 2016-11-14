/**
@author: Isaiah Mann
@description: Classes meant to represent the solar system in THREE.js
@requires: THREE.js, world.js
*/

var FULL_ROTATION = 2 * Math.PI;
// Tuning vals for roundness of spheres
var SEGMENTS = 100;
var RINGS = 100;

function Galaxy () {}

function GalacticBody (scene, origin, radius, colors) {}

GalacticBody.prototype = new WorldObject();

GalacticBody.prototype.setup = function (scene, origin, radius, colors) {
     // Creates a uniforma scale of double the radius:
     var scale = Vector3.one();
     scale.scale(radius * 2);
     this.earlySetup(scene, origin, scale, colors);
     this.offset = origin.x;
     this.radius = radius;
     this.orbitAngle = 0;
     this.geometry = new THREE.SphereGeometry(this.radius, SEGMENTS, RINGS);
     this.material = new THREE.MeshLambertMaterial({ color: this.colors});
     this.lateSetup();
}

// Sets the target for the orbit:
GalacticBody.prototype.setOrbit = function (parent) {
     this.setParent(parent);
}

/**
@param deltaAngle, should be in radians
*/
GalacticBody.prototype.updateOrbitAngle = function (deltaAngle) {
     this.setOrbitAngle(this.orbitAngle + deltaAngle);
}

/**
@param absoluteAngle, should be in radians
*/
GalacticBody.prototype.setOrbitAngle = function (absoluteAngle) {
     this.orbitAngle = absoluteAngle;
     // Wrap the rotation:
     this.orbitAngle %= FULL_ROTATION;
     var parentPosition = this.parent.getWorldPosition();
     this.position.x = parentPosition.x + this.offset * Math.cos(this.orbitAngle);
     this.position.z = parentPosition.z + this.offset * Math.sin(this.orbitAngle);
     // this.setRotation(new Vector3(0, this.orbitAngle, 0));
}

function Star (scene, origin, radius, colors) {
     this.setup(scene, origin, radius, colors);
}
Star.prototype = new GalacticBody();

function Planet (scene, origin, radius, colors) {
     this.setup(scene, origin, radius, colors);
}
Planet.prototype = new GalacticBody();

function Moon (scene, origin, radius, colors) {
     this.setup(scene, origin, radius, colors);
}
Moon.prototype = new GalacticBody();
