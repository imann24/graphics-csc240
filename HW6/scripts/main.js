/**
 * @author: Isaiah Mann
 * @desc: Runs the HW6 3D canvas
 * @requires: KeyboardState.js, THREE.js, random.js, world.js, vector.js, player.js
 */

// THREE.js:
var scene, camera, renderer; // Three.js rendering basics.
var canvas; // The canvas on which the image is rendered.

// Util:
var random;
var keyboard;

// Tuning:
var numberOfPyramids = 30;
var numberOfCubes = 20;
var min = -20;
var max = 20;
var playerSpeed = 1;
var playerStrafeSpeed = 0.5;
var playerLookSpeed = 0.01;
var maxCubeHeight = 10;
var worldObjectScale = 1;

// World:
var worldObjects;
var plane;
var player;

// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {

    renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
    scene = new THREE.Scene(); // Create a new scene which we can add objects to.

    // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
    camera = new THREE.PerspectiveCamera(20, canvas.width/canvas.height, 1, 200);
    camera.position.z = 10;

    // create some lights and add them to the scene.
    scene.add( new THREE.DirectionalLight( 0xffffff, 0.4 ) ); // dim light shining from above
    var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );  // a light to shine in the direction the camera faces
    viewpointLight.position.set(0,0,1);  // shines down the z-axis
    scene.add(viewpointLight);
    worldObjects = [];
    var pyramidScale = Vector3.one();
    pyramidScale.scale(worldObjectScale);
    for (var i = 0; i < numberOfPyramids; i++) {
         worldObjects.push(new Pyramid(scene, new Vector3(random.generate(), 0, random.generate()),
         pyramidScale,
         [0xffffff, 0x99ffff, 0xff99ff, 0xffff99, 0xffffff]));
    }
    var randomCubeHeight = new Random(0, maxCubeHeight);
    for (var i = 0; i < numberOfCubes; i++) {
         var height = randomCubeHeight.generate();
         worldObjects.push(new Cube(scene, new Vector3(random.generate(), height / 2, random.generate()),
         new Vector3(worldObjectScale, height, worldObjectScale),0xff990f));
    }
    var scale = Math.abs(min) + Math.abs(max);
    plane = new Plane(scene, new Vector2(scale, scale), 0xffff00, Math.PI / 2);
    camera.position.y += 0.5;
    player = new Player(scene, camera, canvas, playerSpeed, playerStrafeSpeed, playerLookSpeed);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame( render );
    player.move();
    renderer.render(scene, camera);
}

//----------------------------------------------------------------------------------

// The init() function is called by the onload event when the document has loaded.
function init() {
    try {
       canvas = document.getElementById("glcanvas");
       renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
       // Make sure none of the objects are halfway off the plane:
       random = new Random(min + worldObjectScale / 2, max - worldObjectScale / 2);
       keyboard = new KeyboardState();
    }
    catch (e) {
       document.getElementById("canvas-holder").innerHTML = "<h3><b>WebGL is not available.</b><h3>";
       return;
    }

    // create world and render scene
    createWorld();
    render();
}
