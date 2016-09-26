/*
 * Author: Isaiah Mann
 * Description: Code Related to 2D lines
 */

function colorPixel (x, y, color) {
     graphics.fillStyle = color;
     fillPixel(x, y);
}

function fillPixel (x, y) {
     graphics.fillRect(x, y, 1, 1);
}

// Draws a line between the specified coordinates, weight parameter is optional
function line(x1, y1, x2, y2, color, weight, trackPixels) {
     if (trackPixels == null) {
          trackPixels = false;
     }
     if (weight == null)  {
         weight = 1;
     }

     var pixelList = [];
     var xWeight;
     var yWegith;
     var deltaX = x2 - x1;
     var deltaY = y2 - y1;
     var xStep;
     var yStep;
     var steps;
     graphics.fillStyle.color = color;
     if (Math.abs(deltaX) >= Math.abs(deltaY)) {
         xStep = deltaX > 0 ? 1 : -1;
         yStep = deltaY / deltaX;
         steps = Math.abs(deltaX);
         yWeight = weight;
         xWeight = 1;
     } else {
         yStep = deltaY > 0 ? 1 : -1;
         xStep = -deltaX / deltaY;
         steps = Math.abs(deltaY);
         yWeight = 1;
         xWeight = weight;
     }
     var x = x1;
     var y = y1;
     for (var i = 0; i < steps; i++) {
         for (var pixelX = -xWeight/2; pixelX < xWeight/2; pixelX++) {
               for (var pixelY = -yWeight/2; pixelY < yWeight/2; pixelY++) {
                    pixelList.push(new Point(x, y));
                    fillPixel(x + pixelX, y + pixelY);
               }
         }
         x += xStep;
         y += yStep;
     }
     if (trackPixels) {
          return pixelList;
     }
}
