/*
 * Author: Isaiah Mann
 * Description: Vector operations
 */

function dotProduct (vector1, vector2) {
     if (vector1.length === vector2.length) {
          var total = 0;
          for (var i = 0; i < vector1.length; i++) {
               total += vector1[i] * vector2[i];
          }
          return total;
     } else {
          console.log("ERROR: Vectors are incopatible lengths. Returning -1");
          return -1;
     }
}
