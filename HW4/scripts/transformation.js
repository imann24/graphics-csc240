/*
 * Author: Isaiah Mann
 * Description: Scripts relating to matrix transformations
 * Dependencies: matrix.js, vector.js
 */

var Y_AXIS = "y";
var X_AXIS = "x";

// usually called A
function scaleMatrix(scaleX, scaleY) {
     return new Matrix([scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]]);
}

// usually called R
function rotateMatrix(theta) {
     return new Matrix([Math.cos(theta), -Math.sin(theta), 0], [Math.sin(theta), Math.cos(theta), 0], [0, 0, 1]]);
}

// usually called T
function translateMatrix(translateX, translateY) {
     return new Matrix([1, 0, translateX], [0, 1, translateY], [0, 0, 1]]);
}

// usually called F
function reflectionMatrix(axis) {
     if (axis === X_AXIS) {
          // TODO: Return matrix to rotate over x axis
     } else if (axis === Y_AXIS) {
          // TODO: Return matrix to rotate over y axis
     } else {
          console.log("Incopatible axis name")
          return null;
     }
}

// usually c
function shearMatrix(lambda) {

}
