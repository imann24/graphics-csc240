/*
 * Author: Isaiah Mann
 * Description: Distance equations
 */

function Distance (){}

Distance.calculate = function (start, end) {
     if (!end) {
          end = new Vector2(0, 0);
     }
     return Math.sqrt(Math.pow(end.x - end.x, 2) + Math.pow(end.y - start.y, 2));
}
