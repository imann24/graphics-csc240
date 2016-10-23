/*
 * Author: Isaiah Mann
 * Description: The main display and functionality code for bezier curve analysis
 */

var canvas;    // DOM object corresponding to the canvas
var graphics;  // 2D graphics context for drawing on the canvas
var pen;
var animation;
var levelOfDetail = 500;
var center = new Point(400, 400);
var radius = 200;
var unitCircleSteps = 100;
var curveEndPoints = [new Point(200, 400), new Point(400, 200), new Point(600, 400), new Point(400, 600)];
var quadControlPoints = [new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600)];
var cubicControlPoints = [new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600),
     new Point(200, 200), new Point(600, 200), new Point (600, 600), new Point(200, 600)];
var quadrantKeys = ["NorthEast", "NorthWest", "SouthEast", "SouthWest"];
var colors = ["blue", "orange", "green", "red"];
var label = "label";
var quadMode = "quad";
var cubicMode = "cubic";
var toggleableClass = ".toggeable";
var percenMatchId = "#percentMatch";
var mode = quadMode;
var pointsOnUnitCircle = [];
// Stores points hashed using the Point class's valueOf function
var pointsOnUnitCirlceHash = {};

function init () {
     canvas = document.getElementById("theCanvas");
     graphics = canvas.getContext("2d");
     pen = new BezierDraw(graphics, levelOfDetail);
     animation = new Animator(graphics, canvas);
     pointsOnUnitCircle = getUnitCirclePoints(center, radius, unitCircleSteps);
     pointsOnUnitCirlceHash = createPointsHash(pointsOnUnitCircle);
     graphics.strokeWeight = 2;
     draw();  // draw something on the canvas
}

function update () {
     draw();
}

function getEmptyQuadrants () {
     var emptyQudrantArrays = {};
     for (var i = 0; i < quadrantKeys.length; i++) {
          emptyQudrantArrays[quadrantKeys[i]] = [];
     }
     return emptyQudrantArrays;
}

function getUnitCirclePoints (center, radius, steps) {
     var anglePerStep = 2 * Math.PI / steps;
     var currentAngle = 2 * Math.PI;
     var points = getEmptyQuadrants();
     var quadrantSteps = steps / 4;
     var quadrantLimit = quadrantSteps - 1;
     var quadrantIndex = 0;
     for (var i = 0; i < steps; i++) {
          var currentPoint = new Point(
               radius * -Math.cos(currentAngle) + center.x,
               radius * Math.sin(currentAngle) + center.y);
          points[quadrantKeys[quadrantIndex]].push(currentPoint);
          currentAngle -= anglePerStep;
          if (i >= quadrantLimit) {
               quadrantLimit += quadrantSteps;
               quadrantIndex++;
          }
     }
     return points;
}

function createPointsHash (points) {
     pointHash = {};
     for (var j = 0; j < quadrantKeys.length; j++) {
          var key = quadrantKeys[j];
          pointHash[key] = {};
          for (var i = 0; i < points[key].length; i++) {
               pointHash[key][points[key][i].valueOf()] = points[key][i];
          }
     }
     return pointHash;
}

function draw () {
     animation.drawBackground();
     var points = drawCurves();
     var percentMatched = drawPointsOnUnitCircle(pointsOnUnitCircle,
           pointsOnUnitCirlceHash,
           points);
     setPercentMatch(percentMatched);
}

function drawPointsOnUnitCircle (circlePoints, circlePointsHash, curvePoints) {
     var numberOfPointsMatched = 0;
     var numberOfPointsOnUnitCircle = 0;
     for (var j = 0; j < quadrantKeys.length; j++) {
          numberOfPointsOnUnitCircle += circlePoints[quadrantKeys[j]].length;
     }

     for (var j = 0; j < quadrantKeys.length; j++) {
          graphics.fillStyle = colors[j];
          var key = quadrantKeys[j];
          var matchedPointCount = 0;
          var matchedPointHashes = [];
          for (var i = 0; i < curvePoints[key].length; i++) {
               var curvePointHash = curvePoints[key][i].valueOf();
               var matchingPoint = circlePointsHash[key][curvePointHash];
               if (matchingPoint) {
                    drawPoint(matchingPoint, 7.5);
                    if (!matchedPointHashes.includes(curvePointHash)) {
                         matchedPointHashes.push(matchingPoint.valueOf());
                    }
               }
          }
          numberOfPointsMatched += matchedPointHashes.length;
          for (var i = 0; i < circlePoints[key].length; i++) {
               if (!matchedPointHashes.includes(circlePoints[key][i].valueOf())) {
                    drawPoint(circlePoints[key][i], 5);
               }
          }
     }
     return Math.round(numberOfPointsMatched / numberOfPointsOnUnitCircle * 100);
}

function drawPoint (point, size) {
     graphics.fillRect(point.x, point.y, size, size);
}

function drawCurves () {
     graphics.strokeStyle = "black";
     if (mode === quadMode) {
          return drawQuadCurves();
     } else if (mode === cubicMode) {
          return drawCubicCurves();
     }
}

function drawQuadCurves () {
     points = {};
     for (var i = 0; i < curveEndPoints.length; i++) {
          graphics.strokeStyle = colors[i];
         points[quadrantKeys[i]] = pen.bezierQuad(curveEndPoints[i],
              quadControlPoints[i],
              curveEndPoints[(i + 1) % curveEndPoints.length]);
     }
     return points;
}

function drawCubicCurves () {
     points = {};
     for (var i = 0; i < curveEndPoints.length; i++) {
          graphics.strokeStyle = colors[i];
         points[quadrantKeys[i]] = pen.bezierCubic(curveEndPoints[i],
              cubicControlPoints[i],
              cubicControlPoints[i + curveEndPoints.length],
              curveEndPoints[(i + 1) % curveEndPoints.length]);
     }
     return points;
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

function setPercentMatch (perecent) {
     document.querySelector(percenMatchId).innerHTML = perecent + "%";
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
