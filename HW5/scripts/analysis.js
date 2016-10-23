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
var quadControlPoints = [new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600)];
var cubicControlPoints = [new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600),
     new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600)];
var label = "label";
var quadMode = "quad";
var cubicMode = "cubic";
var toggleableClass = ".toggeable";
var mode = quadMode;

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
     if (mode === quadMode) {
          drawQuadCurves();
     } else if (mode === cubicMode) {
          drawCubicCurves();
     }
}

function drawQuadCurves () {
     for (var i = 0; i < curveEndPoints.length; i++) {
         pen.bezierQuad(curveEndPoints[i], quadControlPoints[i], curveEndPoints[(i + 1) % curveEndPoints.length]);
     }
}

function drawCubicCurves () {
     for (var i = 0; i < curveEndPoints.length; i++) {
         pen.bezierCubic(curveEndPoints[i],
              cubicControlPoints[i],
              cubicControlPoints[i + curveEndPoints.length],
              curveEndPoints[(i + 1) % curveEndPoints.length]);
     }
}

function toggleCurveMode () {
     if (inQuadMode()) {
          mode = cubicMode;
     } else if (inCubicMode()) {
          mode = quadMode;
     }
     toggleSecondControlPoints();
     draw();
}


function toggleSecondControlPoints () {
     $(".toggleable").toggle("slow");
}

function inQuadMode () {
     return mode === quadMode;
}

function inCubicMode () {
     return mode === cubicMode;
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
          if (inQuadMode()) {
               quadControlPoints[index] = new Point(value, quadControlPoints[index].y);
          } else if (inCubicMode()) {
               cubicControlPoints[index] = new Point(value, cubicControlPoints[index].y);
          }
     } else if (selector.includes("y")){
          if (inQuadMode()) {
               quadControlPoints[index] = new Point(quadControlPoints[index].x, value);
          } else if (inCubicMode()) {
            cubicControlPoints[index] = new Point(value, cubicControlPoints[index].y);
         }
     }
     draw();
}
