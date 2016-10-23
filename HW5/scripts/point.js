/*
 * Author: Isaiah Mann
 * Description: Code Related to 2D Coordinates
 */

var yKey = "y";
var xKey = "x";

function Point (x, y) {
     this.x = isNaN(x) ? 0 : x;
     this.y = isNaN(y) ? 0 : y;
};

Point.prototype.translate = function (x, y) {
     return new Point(this.x + x, this.y + y);
}

Point.prototype.add = function (otherPoint) {
     return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
}

Point.prototype.valueOf = function () {
     return "x" + Math.round(this.x / 2) * 2+ "y" + Math.round(this.y / 2) * 2;
}

function comparePointX (point1, point2) {
     if (point1.x > point2.x) {
          return 1;
     } else if (point1.x < point2.x) {
          return -1;
     } else {
          return 0;
     }
};

function comparePointY (point1, point2) {
     if (point1.y > point2.y) {
          return 1;
     } else if (point1.y < point2.y) {
          return -1;
     } else {
          return 0;
     }
};

function getXDifference (point1, point2) {
     return point1.x - point2.x;
}

function getYDifference (point1, point2) {
     return point1.y - point2.y;
}

function getCompareFunction (byVector) {
     if (byVector == xKey) {
          return comparePointX;
     } else if (byVector == yKey) {
          return comparePointY;
     }
}

function getDifferenceFunction (byVector) {
     if (byVector == xKey) {
          return getXDifference;
     } else if (byVector == yKey) {
          return getYDifference;
     }
}

function sortPointList (pointList, byVector) {
     var compareFunction = getCompareFunction(byVector);
     return pointList.sort(compareFunction);
}

function getMatchingPoints (point, pointList, byVector) {
     var compareFunction = getCompareFunction(byVector);
     var matchingPoints = [];
     for (var i = 0; i < pointList.length; i++) {
          if (compareFunction(point, pointList[i]) == 0) {
               matchingPoints.push(pointList[i]);
          }
     }
     return matchingPoints;
}

function getSimilarPoints (point, pointList, byVector, tolerance) {
     var differenceFunction = getDifferenceFunction(byVector);
     var similarPoints = [];
     for (var i = 0; i < pointList.length; i++) {
          if (differenceFunction(point, pointList[i]) <= tolerance) {
               similarPoints.push(pointList[i]);
          }
     }
     return similarPoints;
}

function getMaxPoint (pointList, byVector) {
     return sortPointList(pointList, byVector)[pointList.length - 1];
}

function getMinPoint (pointList, byVector) {
     return sortPointList(pointList, byVector)[0];
}
