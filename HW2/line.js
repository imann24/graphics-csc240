/*
 * Author: Isaiah Mann
 * Description: Code Related to 2D lines
 */

function colorPixel (x, y, color) {
     graphics.fillStyle = color;
     fillPixel(x, y);
}

function fillPixel (x, y) {
     graphics.fillRect(Math.round(x), Math.round(y), 1, 1);
}

function schedulePixel(x, y, delay) {
     setTimeout(fillPixel, delay, x, y);
}

// Draws a line between the specified coordinates, weight parameter is optional
// Adapated from Lecture 5 Notes:
function line(x1, y1, x2, y2, color, trackPixels, drawAsync) {
     if (trackPixels == null) {
          trackPixels = false;
     }
     if (drawAsync == null) {
          drawAsync = false;
     } else {
          var drawTime = 0;
          var timeStep = 1;
     }
     if (color != null) {
          graphics.fillStyle = color;
     }
     var pixelList = [];
     if (Math.abs(x2 - x1) >= Math.abs(y2 - y1)) {
          var slope = (y2 - y1) / (x2 - x1);
          var startX = Math.min(x2, x1);
          var endX = Math.max(x2, x1);
          var y;
          if (x1 > x2) {
               y = y2;
          } else {
               y = y1;
          }
          for (var x = startX; x <= endX; x++) {
               if (drawAsync) {
                    schedulePixel(x, y, drawTime);
                    drawTime += timeStep;
               } else {
                    fillPixel(x, y);
               }
               y += slope;
               if (trackPixels && !isNaN(x) && !isNaN(y)) {
                    pixelList.push(new Point(x, y));
               }
          }
     } else {
          var inverseSlope =  (x2 - x1) / (y2 - y1);
          var startY = Math.min(y2, y1);
          var endY = Math.max(y2, y1);
          var x;
          if (y1 > y2) {
               x = x2;
          } else {
               x = x1;
          }
          for (var y = startY; y <= endY; y++) {
               if (drawAsync) {
                    schedulePixel(x, y, drawTime);
                    drawTime += timeStep;
               } else {
                    fillPixel(x, y);
               }
               x += inverseSlope;
               if (trackPixels && !isNaN(x) && !isNaN(y)) {
                    pixelList.push(new Point(x, y));
               }
          }
     }
     if (trackPixels) {
          return pixelList;
     }
}
