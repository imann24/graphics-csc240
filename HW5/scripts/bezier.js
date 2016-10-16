function BezierDraw (graphics) {
     this.graphics = graphics;
}

BezierDraw.prototype.bezierLine = function (point0, point1) {
     this.graphics.beginPath();
     this.graphics.moveTo(point0[0], point0[1]);
     this.graphics.lineTo(point1[0], point1[1]);
     this.graphics.stroke();
}

BezierDraw.prototype.bezierQuad = function (point0, point1, point2) {
     console.log("Drawing a quad");
}

BezierDraw.prototype.bezierCubic = function(point0, point1, point2, point3) {
     console.log("Drawing a cubic");
}
