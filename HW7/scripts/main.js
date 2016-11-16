/**
 * @author: Isaiah Mann, Sara Mathieson (THREE.js Template)
 * @desc: Runs the H7 3D canvas (creating the galaxy)
 * @requires: KeyboardState.js, THREE.js, random.js, world.js, vector.js, player.js, galaxy.js, tuning.js
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
var mercury;
var venus;
var earth;
var mars;
var jupiter;
var saturn;
var uranus;
var neptune;
var pluto;
var moon;
var sun;
var planets;


// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {
    renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
    scene = new THREE.Scene(); // Create a new scene which we can add objects to.

    // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
    camera = new THREE.PerspectiveCamera(20, canvas.width / canvas.height, 1, 100000);
    camera.position.z = 25000;
    camera.position.x = 7500;
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
     sun = new Star(scene, Vector3.zero(), sunRadius, sunColor);
     worldObjects.push(sun);
}

function createPlanets () {
     mercury = new Planet(scene, new Vector3(mercuryDistanceFromSun, 0, 0), mercuryRadius, mercuryColor, mercuryOrbitSpeed);

     venus = new Planet(scene, new Vector3(venusDistanceFromSun, 0, 0), venusRadius, venusColor, venusOrbitSpeed);

     earth = new Planet(scene, new Vector3(earthDistanceFromSun, 0, 0), earthRadius, earthColor, earthOrbitSpeed);

     mars = new Planet(scene, new Vector3(marsDistanceFromSun, 0, 0), marsRadius, marsColor, earthOrbitSpeed);

     jupiter = new Planet(scene, new Vector3(jupiterDistanceFromSun, 0, 0), jupiterRadius, jupiterColor, jupiterOrbitSpeed);

     saturn = new Planet(scene, new Vector3(saturnDistanceFromSun, 0, 0), saturnRadius, saturnColor, saturnOrbitSpeed);

     uranus = new Planet(scene, new Vector3(uranusDistanceFromSun, 0, 0), uranusRadius, uranusColor, uranusOrbitSpeed);

     neptune = new Planet(scene, new Vector3(neptuneDistanceFromSun, 0, 0), neptuneRadius, neptuneColor, neptuneOrbitSpeed);

     pluto = new Planet(scene, new Vector3(plutoDistanceFromSun, 0, 0), plutoRadius, plutoColor, plutoOrbitSpeed);

     planets = [mercury, venus, earth, mars,
          jupiter, saturn, uranus, neptune, pluto];
     for (var i = 0; i < planets.length; i++) {
          planets[i].setOrbit(sun);
          worldObjects.push(planets[i]);
     }
}

function createMoons () {
     moon = new Moon(scene, new Vector3(earthDistanceFromSun + moonDistanceFromEarth, 0, 0), moonRadius, moonColor, moonOrbitSpeed);
     moon.setOrbit(earth);
     worldObjects.push(moon);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame(render);
    player.move();
    for (var i = 0; i < planets.length; i++) {
         planets[i].orbit();
    }
    moon.orbit();
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
