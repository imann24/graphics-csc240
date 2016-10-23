/*
 * Author: Isaiah Mann
 * Description: The main display and functionality code for bezier curve analysis
 */

var canvas;    // DOM object corresponding to the canvas
var graphics;  // 2D graphics context for drawing on the canvas
var pen;
var animation;
var levelOfDetail = 500;
var curveEndPoints = [new Point(200, 400), new Point(400, 200), new Point(600, 400), new Point(400, 600)];
var controlPoints = [new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600)];
var label = "label";

function init () {
     canvas = document.getElementById("theCanvas");
     graphics = canvas.getContext("2d");
     pen = new BezierDraw(graphics, levelOfDetail);
     animation = new Animator(graphics, canvas);
     draw();  // draw something on the canvas
}

function update () {
     draw();
}

function draw () {
     animation.drawBackground();
     drawCurves();
     drawGuidingCircle();
}

function drawCurves () {
     graphics.strokeStyle = "black";
     for (var i = 0; i < curveEndPoints.length; i++) {
         pen.bezierQuad(curveEndPoints[i], controlPoints[i], curveEndPoints[(i + 1) % curveEndPoints.length]);
     }
}

function drawGuidingCircle () {
     graphics.strokeStyle = "blue";
     graphics.beginPath();
     graphics.arc(400,400,200,0,2*Math.PI);
     graphics.stroke();
}

function updateCurve(index, selector, value) {
     document.querySelector('#' + selector + label).value = selector[0] + ": " + value;
     if (selector.includes("x")) {
         controlPoints[index] = new Point(value, controlPoints[index].y);
     } else if (selector.includes("y")){
         controlPoints[index] = new Point(controlPoints[index].x, value);
     }
     draw();
}
