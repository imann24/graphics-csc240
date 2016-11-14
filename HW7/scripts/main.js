/**
 * @author: Isaiah Mann
 * @desc: Runs the H7 3D canvas (creating the galaxy)
 * @requires: KeyboardState.js, THREE.js, random.js, world.js, vector.js, player.js, galaxy.js
 */

// THREE.js:
var scene, camera, renderer; // Three.js rendering basics.
var canvas; // The canvas on which the image is rendered.

// Util:
var keyboard;

// World:
var worldObjects;
var plane;
var player;
var earth;
var moon;
var sun;


// Tuning:
var playerSpeed = 1;
var playerStrafeSpeed = 0.5;
var playerLookSpeed = 0.01;
var worldObjectScale = 1;
// Sun Tuning:
var sunRadius = 10;
var sunOrbitSpeed = 0.01;
// Earth Tuning:
var earthRadius = 5;
var earthDistanceFromSun = 30;
var earthOrbitSpeed = 0.02;
// Moon Tuning:
var moonRadius = 2;
var moonDistanceFromEarth = 20;

// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {
    renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
    scene = new THREE.Scene(); // Create a new scene which we can add objects to.

    // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
    camera = new THREE.PerspectiveCamera(20, canvas.width / canvas.height, 1, 1000);
    camera.position.z = 250;

    // create some lights and add them to the scene.
    scene.add( new THREE.DirectionalLight( 0xffffff, 0.4 ) ); // dim light shining from above
    var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );  // a light to shine in the direction the camera faces
    viewpointLight.position.set(0,0,1);  // shines down the z-axis
    scene.add(viewpointLight);
    worldObjects = [];
    player = new Player(scene, camera, canvas, playerSpeed, playerStrafeSpeed, playerLookSpeed);
    createStars();
    createPlanets();
    createMoons();
}

function createStars () {
     sun = new Star(scene, Vector3.zero(), sunRadius, "yellow");
     worldObjects.push(sun);
}

function createPlanets () {
     earth = new Planet(scene, new Vector3(earthDistanceFromSun, 0, 0), earthRadius, "blue");
     earth.setOrbit(sun);
     worldObjects.push(earth);
}

function createMoons () {
     moon = new Moon(scene, new Vector3(earthDistanceFromSun - moonDistanceFromEarth, 0, 0), moonRadius, "grey");
     moon.setOrbit(earth);
     worldObjects.push(moon);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame(render);
    player.move();
    earth.mesh.rotation.x += 0.1;
    earth.updateOrbitAngle(earthOrbitSpeed);
    sun.updateOrbitAngle(sunOrbitSpeed);
    renderer.render(scene, camera);
}

//----------------------------------------------------------------------------------

// The init() function is called by the onload event when the document has loaded.
function init() {
    try {
       canvas = document.getElementById("glcanvas");
       renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true} );
       // Make sure none of the objects are halfway off the plane:
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
