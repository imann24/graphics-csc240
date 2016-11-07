/*
 * Author: Isaiah Mann
 * Description: Runs the HW6 3D canvas
 * Dependencies: THREE.js, random.js, world.js, vector.js, player.js
 */

// THREE.js:
var scene, camera, renderer; // Three.js rendering basics.
var canvas; // The canvas on which the image is rendered.

// Util:
var random;

// Tuning:
var numberOfPyramids = 10;
var min = -10;
var max = 10;
var playerSpeed = 1;
var playerLookSpeed = 0.01;
var playerDeceleration = 0.25;

// World:
var pyramids;
var plane;
var player;

// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {

    renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
    scene = new THREE.Scene(); // Create a new scene which we can add objects to.

    // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
    camera = new THREE.PerspectiveCamera(20, canvas.width/canvas.height, 1, 30);
    camera.position.z = 10;

    // create some lights and add them to the scene.
    scene.add( new THREE.DirectionalLight( 0xffffff, 0.4 ) ); // dim light shining from above
    var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );  // a light to shine in the direction the camera faces
    viewpointLight.position.set(0,0,1);  // shines down the z-axis
    scene.add(viewpointLight);
    pyramids = [];

    for (var i = 0; i < numberOfPyramids; i++) {
         pyramids.push(new Pyramid(scene, new Vector3(random.generate(), 0, random.generate()), new Vector3(1, 1, 1),
         [0xffffff, 0x99ffff, 0xff99ff, 0xffff99, 0xffffff]));
    }
    var scale = Math.abs(min) + Math.abs(max);
    plane = new Plane(scene, new Vector2(scale, scale), 0xffff00, Math.PI / 2);
    camera.position.y += 0.5;

    player = new Player(camera, canvas, playerSpeed, playerLookSpeed, playerDeceleration);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame( render );
    player.move();
    player.look();
    renderer.render(scene, camera);
}

//----------------------------------------------------------------------------------

// The init() function is called by the onload event when the document has loaded.
function init() {
    try {
       canvas = document.getElementById("glcanvas");
       renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
       random = new Random(min, max);
    }
    catch (e) {
       document.getElementById("canvas-holder").innerHTML = "<h3><b>WebGL is not available.</b><h3>";
       return;
    }

    // create world and render scene
    createWorld();
    render();
}
