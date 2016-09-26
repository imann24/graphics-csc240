/*
 * Author: Isaiah Mann
 * Description: Code Related to 2D Coordinates
 */

function Point (x, y) {
     this.x = x;
     this.y = y;
};

comparePointX = function (point1, point2) {
     if (point1.x > point2.x) {
          return 1;
     } else if (point1.x < point2.x) {
          return -1;
     } else {
          return 0;
     }
};

comparePointY = function (point1, point2) {
     if (point1.y > point2.y) {
          return 1;
     } else if (point1.y < point2.y) {
          return -1;
     } else {
          return 0;
     }
};

function sortPointList (pointList, byVector) {
     var compareFunction;
     if (byVector == "x") {
          compareFunction = comparePointX;
     } else if (byVector == "y") {
          compareFunction = comparePointY;
     }
     return pointList.sort(compareFunction);
}
