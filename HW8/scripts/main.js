/**
 * @author: Isaiah Mann, Sara Mathieson (THREE.js Template)
 * @desc: Runs the HW8 3D canvas (texutre mapping)
 * @requires: THREE.js, random.js, world.js, vector.js, tuning.js
 */

// THREE.js:
var scene, camera, renderer; // Three.js rendering basics.
var canvas; // The canvas on which the image is rendered.

// World:
var worldObjects;

// Create the scene. This function is called once, as soon as the page loads.
// The renderer has already been created before this function is called.
function createWorld() {
         renderer.setClearColor(0); // Set background color (0, or 0x000000, is black).
         scene = new THREE.Scene(); // Create a new scene which we can add objects to.

         // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
         camera = new THREE.PerspectiveCamera(20, canvas.width / canvas.height, 1, 200);
         camera.position.z = 10;

         // create some lights and add them to the scene.
         scene.add( new THREE.DirectionalLight( 0xffffff, 0.4 ) ); // dim light shining from above
         var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );  // a light to shine in the direction the camera faces
         viewpointLight.position.set(0,0,1);  // shines down the z-axis
         scene.add(viewpointLight);
         worldObjects = [];
         octahedron = new Octahedron(scene,
              new Vector3(0, 0, 0),
              Vector3.scalar(octahedronScale),
             uvCoordinates,
             checkerBoardTexturePath);
}

// Render the scene. This is called for each frame of the animation.
function render() {
    requestAnimationFrame(render);
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
