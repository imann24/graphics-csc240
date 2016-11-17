/**
 * @author: Isaiah Mann, Sara Mathieson (THREE.js Template)
 * @desc: Runs the HW8 3D canvas (texutre mapping)
 * @requires: THREE.js, random.js, world.js, vector.js, tuning.js, player.js
 */

// THREE.js:
var scene, camera, renderer; // Three.js rendering basics.
var canvas; // The canvas on which the image is rendered.
var player;
var keyboard;

// World:
var worldObjects;
var octahedron;
var floor;
var leftWall;
var backWall;
var rightWall;
var frontWall;
var ceiling;

// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {
         renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
         scene = new THREE.Scene(); // Create a new scene which we can add objects to.

         // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
         camera = new THREE.PerspectiveCamera(20, canvas.width / canvas.height, 1, 1000);
         camera.position.y = cameraY;
         camera.position.z = cameraZ;
          var light = new THREE.AmbientLight( 0x404040, 5.0); // soft white light
          scene.add(light);
         worldObjects = [];
         octahedron = new Octahedron(scene,
              new Vector3(0, octahedronHeight, 0),
              Vector3.scalar(octahedronScale),
             uvCoordinates,
             checkerBoardTexturePath,
             topPyramidUVSets,
             bottomPyramidUVSets);
         floor = new Plane(scene,
               new Vector3(wallWidth, wallWidth, wallWidth),
               woodTexturePath,
               new Vector3(3 * Math.PI / 2, 0, 0),
               textureYRepeat,
               textureYRepeat);
          ceiling = new Plane(scene,
                new Vector3(wallWidth, wallWidth, wallWidth),
                ceilingTexturePath,
                new Vector3(3 * Math.PI / 2, 0, 0),
                textureYRepeat,
                textureYRepeat);
          ceiling.position.y += wallHeight;
          leftWall = new Plane(scene,
                    new Vector3(wallWidth, wallHeight, wallWidth),
                    wallpaperTexturePath,
                    new Vector3(0, Math.PI / 2, 0),
                    textureXRepeat,
                    textureYRepeat);
          leftWall.position.x -= wallWidth / 2;
          leftWall.position.y += wallHeight / 2;
          rightWall = new Plane(scene,
                    new Vector3(wallWidth, wallHeight, wallWidth),
                    wallpaperTexturePath,
                    new Vector3(0, 3 * Math.PI / 2, 0),
                    textureXRepeat,
                    textureYRepeat);
          rightWall.position.x += wallWidth / 2;
          rightWall.position.y += wallHeight / 2;
          backWall = new Plane(scene,
                    new Vector3(wallWidth, wallHeight, wallWidth),
                    wallpaperTexturePath,
                    new Vector3(0, 0, 0),
                    textureXRepeat,
                    textureYRepeat);
          backWall.position.y += wallHeight / 2;
          backWall.position.z -= wallWidth / 2;
          frontWall = new Plane(scene,
                    new Vector3(wallWidth, wallHeight, wallWidth),
                    wallpaperTexturePath,
                    new Vector3(0, 0, 0),
                    textureXRepeat,
                    textureYRepeat);
          frontWall.position.y += wallHeight / 2;
          frontWall.position.z += wallWidth / 2;
          keyboard = new KeyboardState();
          player = new Player(scene, camera, canvas, playerSpeed, playerStrafeSpeed, playerLookSpeed);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame(render);
    octahedron.rotation.y += rotateSpeed;
    player.move();
    renderer.render(scene, camera);
}

//----------------------------------------------------------------------------------

// The init() function is called by the onload event when the document has loaded.
function init() {
    try {
       canvas = document.getElementById("glcanvas");
       renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
    }
    catch (e) {
       document.getElementById("canvas-holder").innerHTML = "<h3><b>WebGL is not available.</b><h3>";
       return;
    }
    // create world and render scene
    createWorld();
    render();
}
