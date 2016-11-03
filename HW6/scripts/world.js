/* Author: Isaiah Mann
 * Description: Used to draw 3D shapes in the world
 * Dependencies: THREE.js
 */

function WorldObject () {}

WorldObject.prototype.earlySteup = function (scene, origin, scale, colors) {
     this.geometry = new THREE.Geometry();
     this.scene = scene;
     this.origin = origin;
     this.scale = scale;
     this.colors = colors;
}

WorldObject.prototype.lateSetup = function () {
     this.createMesh();
     this.addToScene();
}

WorldObject.prototype.createMesh = function () {
     this.mesh = new THREE.Mesh(this.geometry, this.material)
}

WorldObject.prototype.addToScene = function () {
     this.scene.add(this.mesh);
}

// Origin and scale should be Vector3 objects. Origin is the center of the base
function Pyramid (scene, origin, scale, colors) {
     this.earlySteup(scene, origin, scale, colors);
     this.createVertices();
     this.createFaces();
     this.createMaterial();
     this.lateSetup();
}

Pyramid.prototype = new WorldObject();

Pyramid.prototype.createVertices = function () {
     var s = this.scale;
     this.geometry.vertices = [
          new THREE.Vector3(s.x, 0, s.z),    // vertex number 0
          new THREE.Vector3(s.x, 0, -s.z),   // vertex number 1
          new THREE.Vector3(-s.x, 0, -s.z),  // vertex number 2
          new THREE.Vector3(-s.x, 0, s.z),   // vertex number 3
          new THREE.Vector3( 0, s.y, 0 )     // vertex number 4
     ];
}

Pyramid.prototype.createFaces = function () {
     this.geometry.faces = [
          new THREE.Face3( 3, 2, 1),  // one half of the bottom face
          new THREE.Face3( 3, 1, 0),  // second half of the bottom face
          new THREE.Face3( 3, 0, 4),  // remaining faces are the four sides
          new THREE.Face3( 0, 1, 4),
          new THREE.Face3( 1, 2, 4),
          new THREE.Face3( 2, 3, 4)
     ];
}

Pyramid.prototype.createMaterial = function () {
     var g = this.geometry;
     g.computeFaceNormals();
     g.faces[0].materialIndex = 0;
     for (var i = 1; i <= 5; i++) {
        g.faces[i].materialIndex = i-1;
     }
     var c = this.colors;
     this.material =  new THREE.MeshFaceMaterial([
        new THREE.MeshLambertMaterial( { color: c[0], shading: THREE.FlatShading } ),
        new THREE.MeshLambertMaterial( { color: c[1], shading: THREE.FlatShading } ),
        new THREE.MeshLambertMaterial( { color: c[2], shading: THREE.FlatShading } ),
        new THREE.MeshLambertMaterial( { color: c[3], shading: THREE.FlatShading } ),
        new THREE.MeshLambertMaterial( { color: c[4], shading: THREE.FlatShading } )
     ]);
}
