/*
 * Author: Isaiah Mann
 * Description: Functions relating to drawing bezier curves
 * Dependencies: point.js
 */

function BezierDraw (graphics) {
     this.graphics = graphics;
     this.setPointsPerLine(100);
}

BezierDraw.prototype.setPointsPerLine = function (pointsPerLine) {
	this.pointsPerLine = pointsPerLine;
}


BezierDraw.prototype.draw = function (points, coordinateHelper) {
	this.graphics.beginPath();
    var previousPoint = points[0];
    for (var i = 1; i < this.pointsPerLine; i++) {
    	this.graphics.moveTo(previousPoint.x, previousPoint.y);
    	var currentPoint = coordinateHelper(i / (this.pointsPerLine - 1), points, this);
    	this.graphics.lineTo(currentPoint.x, currentPoint.y);
    	previousPoint = currentPoint;
 	}
 	this.graphics.stroke();
}

BezierDraw.prototype.bezierLineHelper = function (time, points) {
	var x = (1 - time) * points[0].x + time * points[1].x;
	var y = (1 - time) * points[0].y + time * points[1].y;
	return new Point(x, y);
}

BezierDraw.prototype.bezierLine = function (point0, point1) {
  	this.draw([point0, point1], this.bezierLineHelper);
}

BezierDraw.prototype.bezierQuad = function (point0, point1, point2) {
    this.draw([point0, point1, point2], this.bezierQuadHelper);
}

BezierDraw.prototype.bezierQuadHelper = function (time, points, draw) {
	var pointA = draw.bezierLineHelper(time, points);
	var pointB = draw.bezierLineHelper(time, points);
	return draw.bezierLineHelper(time, [pointA, pointB]);
}

BezierDraw.prototype.bezierCubic = function (point0, point1, point2, point3) {
     console.log("Drawing a cubic");
}

BezierDraw.prototype.bezierCubicHelper = function (time, point0, point1, point2, point3) {
	
}
